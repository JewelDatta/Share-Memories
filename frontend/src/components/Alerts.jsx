import React, { Component } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, message } = this.props;

    if (error !== prevProps.error) {
      if (error.msg.username)
        toast.error(`Username: ${error.msg.username.join()}`);
      if (error.msg.email) toast.error(`Email: ${error.msg.email.join()}`);
      if (error.msg.password)
        toast.error(`Password: ${error.msg.password.join()}`);
      if (error.msg.password1)
        toast.error(`Password: ${error.msg.password1.join()}`);
      if (error.msg.message)
        toast.error(`Message: ${error.msg.message.join()}`);
      if (error.msg.detail) toast.error(`Message: ${error.msg.detail}`);
      if (error.msg.non_field_errors)
        toast.error(error.msg.non_field_errors.join());
    }

    if (message !== prevProps.message) {
      if (message.passwordNotMatch) toast.error(message.passwordNotMatch);
      if (message.successfulRegistration)
        toast.success(message.successfulRegistration);
    }
  }

  render() {
    return <React.Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages.data,
});

export default connect(mapStateToProps, null)(Alerts);
