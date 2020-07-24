import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <h1>Hello</h1>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
