import React from "react";
import { getAuthToken } from "utils/auth";
import { push } from "react-router-redux";
import { connectAutoBindAction } from "utils/redux";

export default function checkIsAdmin(Component) {
  @connectAutoBindAction(() => ({}), { push })
  class ComponentIsAdmin extends React.Component {
    componentWillMount() {
      if (!getAuthToken()) {
        this.props.push("/login");
      }
    }
    render() {
      return <Component {...this.props} />;
    }
  }
  return ComponentIsAdmin;
}
