import React, { Component } from "react";
import { Provider } from "react-redux";

import configureStore from "redux/configureStore";
import { Router } from "react-router";

import AppRoutes from "./routes";
import { createCustomHistory } from "utils/router";

var browserHistory = createCustomHistory();

const getStoreDefault = () => {
  if (typeof window !== "undefined")
    return window.__REDUX_STORE__ ? window.__REDUX_STORE__ : {};
  return {};
};

const store = configureStore(getStoreDefault(), {
  routerHistory: browserHistory
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {AppRoutes}
        </Router>
      </Provider>
    );
  }
}
