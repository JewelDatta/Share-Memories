import React, { Component } from "react";
import "./App.css";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import { getCurrentUser } from "./store/reducers/auth";
import HomePage from "./components/HomePage";
import Alerts from "./components/Alerts";
import PrivateRoute from "./components/common/PrivateRoute";

const store = configureStore();

class App extends Component {
  componentDidMount() {
    store.dispatch(getCurrentUser());
  }

  render() {
    return (
      <Provider store={store}>
        <ToastContainer></ToastContainer>
        <Alerts></Alerts>
        <Router>
          <React.Fragment>
            <div className="container">
              <Switch>
                <PrivateRoute
                  exact
                  path="/"
                  component={HomePage}
                ></PrivateRoute>

                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/login" component={Login}></Route>
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
