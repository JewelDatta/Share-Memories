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
      if (error.msg.message)
        toast.error(`Message: ${error.msg.message.join()}`);
      if (error.msg.detail) toast.error(`Message: ${error.msg.detail}`);
    }

    if (message !== prevProps.message) {
      if (message.success) toast.success(message.success);
      if (message.fail) toast.error(message.success);
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
