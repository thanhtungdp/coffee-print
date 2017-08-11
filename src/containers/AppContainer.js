import React, { Component } from "react";
import { connectAutoBindAction } from "utils/redux";
import { getClientIp, getStores } from "redux/actions/storeAction";

@connectAutoBindAction(() => ({}), { getClientIp,  getStores})
export default class AppContainer extends Component {
  static propTypes = {};

  componentDidMount() {
    this.props.getClientIp();
    this.props.getStores();
  }

  render() {
    return this.props.children;
  }
}
