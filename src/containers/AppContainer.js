import { Component } from "react";
import { connectAutoBindAction } from "utils/redux";
import { getClientIp, getStores } from "redux/actions/storeAction";

@connectAutoBindAction(
  state => ({
    clientIp: state.store.clientIp
  }),
  { getClientIp, getStores }
)
export default class AppContainer extends Component {
  static propTypes = {};

  componentDidMount() {
    this.props.getClientIp();
    this.props.getStores();
  }

  render() {
    if (this.props.clientIp) return this.props.children;
    return null;
  }
}
