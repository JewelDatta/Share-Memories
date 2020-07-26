import React, { Component } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  CardFooter,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../store/reducers/auth";

export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.props.login(this.state.username, this.state.password);
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
            <CardHeader tag="h2">Login</CardHeader>

            <CardBody>
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
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                />
              </FormGroup>

              <Button
                className="mt-4"
                color="primary"
                size="lg"
                block
                onClick={this.onSubmit}
              >
                Login
              </Button>
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
});

export default connect(mapStateToProps, { login })(Login);
