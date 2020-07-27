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
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../store/reducers/auth";
import { createMessage } from "../../store/reducers/messages";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password1, password2 } = this.state;
    if (password1 !== password2) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else {
      const newUser = {
        username,
        password1,
        password2,
        email,
      };
      this.props.register(newUser);
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
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
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    bsSize="lg"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    bsSize="lg"
                    type="password"
                    name="password1"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    bsSize="lg"
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    onChange={this.onChange}
                  />
                </FormGroup>

                <Button
                  className="mt-4"
                  color="primary"
                  size="lg"
                  block
                  type="submit"
                  onClick={this.onSubmit}
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
});

export default connect(mapStateToProps, { register, createMessage })(Register);
