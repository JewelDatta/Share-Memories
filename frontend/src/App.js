import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import { getCurrentUser } from "./store/reducers/auth";
import HomePage from "./components/HomePage";
import Alerts from "./components/Alerts";
import PrivateRoute from "./components/common/PrivateRoute";
import Profile from "./components/profile/Profile";
import SearchPage from "./components/others/SearchPage";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <Alerts></Alerts>
        <Router forceRefresh>
          <React.Fragment>
            <div className="container">
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>

              <PrivateRoute
                exact
                path="/profile/:username"
                component={Profile}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/search"
                component={SearchPage}
              ></PrivateRoute>

              <PrivateRoute exact path="/" component={HomePage}></PrivateRoute>
            </div>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentUser })(App);
