import React, { Component } from "react";
import { Container, Col, Input, Button } from "reactstrap";
import { connectAutoBindAction } from "utils/redux";
import { push } from "react-router-redux";
import { autobind } from "core-decorators";
import Clearfix from "components/elements/clearfix";
import { getStores, setCurrentStore } from "redux/actions/storeAction";

@connectAutoBindAction(
  state => ({
    stores: state.store.list.data,
    storeId: state.store.storeId
  }),
  { getStores, setCurrentStore, push }
)
@autobind
export default class SelectStore extends Component {
  static propTypes = {};

  componentDidMount() {
    if (this.props.stores.length === 0) {
      this.props.getStores();
    }
  }

  handleChangeStoreId(e) {
    this.props.setCurrentStore(e.target.value);
  }

  renderSelect() {
    return (
      <Input
        type="select"
        value={this.props.storeId}
        onChange={this.handleChangeStoreId}
      >
        {this.props.stores.map(store => (
          <option value={store._id} key={store._id}>
            {store.name}
          </option>
        ))}
      </Input>
    );
  }

  handleContinue() {
    if (!this.props.storeId) {
      if (this.props.stores.length > 0) {
        this.props.setCurrentStore(this.props.stores[0]._id);
      }
    }

    setTimeout(() => {
      this.props.push("/gallery-manager");
    }, 100);
  }

  render() {
    return (
      <Container>
        <Clearfix height={80} />
        <Col md={{ size: 8, offset: 2 }}>
          <h4>Chọn cửa hàng</h4>
          <Clearfix height={16} />
          {this.props.stores.length > 0 ? this.renderSelect() : null}
          <Clearfix height={16} />
          <Button onClick={this.handleContinue} block color="primary">
            Tiếp tục
          </Button>
        </Col>
      </Container>
    );
  }
}
