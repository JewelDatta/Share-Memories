import React, { Component } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  CardFooter,
  Form,
  FormFeedback,
} from "reactstrap";
import Joi from "joi-browser";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../store/reducers/auth";
import { createMessage } from "../../store/reducers/messages";

export class Register extends Component {
  state = {
    data: {
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
    error: {},
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  componentDidUpdate(prevProps) {
    if (this.props.error.msg !== prevProps.error.msg) {
      this.setState({ error: this.props.error.msg });
    }
  }

  schema = {
    username: Joi.string().required().min(3).max(20).label("Username"),
    email: Joi.string().email().required().label("Email"),
    password1: Joi.string().min(8).required().label("Password"),
    password2: Joi.any()
      .required()
      .valid(Joi.ref("password1"))
      .options({ language: { any: { allowOnly: "must match Password" } } })
      .label("Confirm Password"),
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

    const { username, email, password1, password2 } = this.state.data;
    const newUser = {
      username,
      password1,
      password2,
      email,
    };
    this.props.register(newUser);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { error } = this.state;

    return (
      <div className="container">
        <div className="col-sm-12 col-md-6 offset-md-3 pt-4">
          <Card className="p-3">
            <CardHeader tag="h2">Sign Up</CardHeader>

            <CardBody>
              <Form>
                <FormGroup>
                  <Input
                    bsSize="lg"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                    invalid={error.username ? true : false}
                  />
                  <FormFeedback>{error.username}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Input
                    bsSize="lg"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    invalid={error.email ? true : false}
                  />
                  <FormFeedback>{error.email}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Input
                    bsSize="lg"
                    type="password"
                    name="password1"
                    placeholder="Password"
                    onChange={this.handleChange}
                    invalid={error.password1 ? true : false}
                  />
                  <FormFeedback>{error.password1}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Input
                    bsSize="lg"
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                    invalid={error.password2 ? true : false}
                  />
                  <FormFeedback>{error.password2}</FormFeedback>
                </FormGroup>

                <Button
                  className="mt-4"
                  color="primary"
                  size="lg"
                  block
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Sign Up
                </Button>
              </Form>
            </CardBody>
            <CardFooter>
              Already have an account?
              <Link to="/login">
                <Button outline color="primary" className="float-right">
                  Login
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
