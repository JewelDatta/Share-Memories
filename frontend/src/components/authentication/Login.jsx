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
  FormText,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Joi from "joi-browser";
import { login } from "../../store/reducers/auth";

export class Login extends Component {
  state = {
    data: {
      username: "",
      password: "",
    },
    error: {},
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  componentDidUpdate(prevProps) {
    if (this.props.error.msg !== prevProps.error.msg) {
      this.setState({ error: this.props.error.msg });
    }
  }

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
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

    const { username, password } = this.state.data;

    this.props.login(username, password);
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
            <CardHeader tag="h2">Login</CardHeader>

            <CardBody>
              <Form>
                <FormGroup>
                  <Input
                    bsSize="lg"
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                    invalid={error.username ? true : false}
                  />
                  <FormFeedback>{error.username}</FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Input
                    bsSize="lg"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    invalid={error.password ? true : false}
                  />
                  <FormFeedback>{error.password}</FormFeedback>
                </FormGroup>

                <FormText color="danger">
                  <p style={{ fontWeight: "bold" }}>
                    {error.non_field_errors && error.non_field_errors.join()}
                  </p>
                </FormText>

                <Button
                  className="mt-4"
                  color="primary"
                  size="lg"
                  block
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Login
                </Button>
              </Form>
            </CardBody>
            <CardFooter>
              Don't have an account?
              <Link to="/register">
                <Button outline color="primary" className="float-right">
                  Sign Up
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

export default connect(mapStateToProps, { login })(Login);
