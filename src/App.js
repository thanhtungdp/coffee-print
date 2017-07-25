import React, { Component } from "react";
import { Provider } from "react-redux";

import configureStore from "redux/configureStore";
import { Router, browserHistory } from "react-router";
import AppRoutes from "./routes";

const store = configureStore(
  {},
  {
    routerHistory: browserHistory
  }
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {AppRoutes()}
        </Router>
      </Provider>
    );
  }
}
