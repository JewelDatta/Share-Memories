import { Component } from "react";
import Joi from "joi-browser";

export class ValidateForm extends Component {
  state = {
    data: {},
    error: {},
  };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validateOnChange = (input) => {
    const error = { ...this.state.error };

    if (input.name === "password2") {
      delete error[input.name];
      this.setState({ error });
      return;
    }

    const errorMessage = this.validateProperty(input);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];

    this.setState({ error });
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;

    // Validate after state is updated
    this.setState({ data }, () => this.validateOnChange(input));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ error: errors || {} });
    if (errors) return;

    this.doSubmit();
  };
}

export default ValidateForm;
