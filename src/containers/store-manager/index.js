import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "reactstrap/lib/Container";
import Col from "reactstrap/lib/Col";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import { connectAutoBindAction } from "utils/redux";
import {
  getStores,
  deleteStore,
  createStore,
  updateStore
} from "redux/actions/storeAction";
import { autobind } from "core-decorators";
import styled from "styled-components";
import swal from "sweetalert2";

import StoreList from "./StoreList";
import CreateStoreForm from "./CreateStoreForm";

const StoreManagerContainer = styled.div`
  margin-top: 24px;
`;

@connectAutoBindAction(
  state => ({
    stores: state.store.list.data,
    clientIp: state.store.clientIp
  }),
  { getStores, deleteStore, createStore, updateStore }
)
@autobind
export default class StoreManager extends Component {
  static propTypes = {
    data: PropTypes.array,
    updateStore: PropTypes.func
  };

  state = {
    isOpenEdit: false,
    storeEdit: {}
  };

  toggleHideEdit() {
    this.setState({
      isOpenEdit: false
    });
  }

  handleEditItem(e, storeEdit) {
    e.preventDefault();
    this.setState({
      isOpenEdit: true,
      storeEdit
    });
  }

  componentDidMount() {
    this.props.getStores();
  }

  handleDeleteItem(e, item) {
    e.preventDefault();
    let sConfrim = confirm("Bạn có muốn xóa không");
    if (!sConfrim) return;
    this.props.deleteStore(item.id);
    swal({
      type: "error",
      title: "Đã xóa"
    });
  }

  handleCreateStore(store) {
    this.props.createStore(store);
    swal({
      type: "success",
      title: "Tạo store thành công"
    });
  }

  handleUpdateStore(store) {
    this.props.updateStore(this.state.storeEdit._id, store);
    swal({
      type: "success",
      title: "Cập nhật thành công"
    });
    this.toggleHideEdit();
  }

  render() {
    return (
      <Container>
        <Col md={{ size: 8, offset: 2 }}>
          <StoreManagerContainer>
            <h5>Stores (Current IP {this.props.clientIp})</h5>
            <CreateStoreForm onSubmit={this.handleCreateStore} />
            <StoreList
              data={this.props.stores}
              onDeleteItem={this.handleDeleteItem}
              onEditItem={this.handleEditItem}
            />
          </StoreManagerContainer>
        </Col>
        {this.state.isOpenEdit &&
          <Modal
            isOpen={this.state.isOpenEdit}
            modalClassName={this.state.isOpenEdit ? "show" : ""}
            toggle={this.toggleHideEdit}
            backdrop
            size="lg"
          >
            <ModalHeader toggle={this.toggleHideEdit}>Chỉnh sửa</ModalHeader>
            <ModalBody>
              <CreateStoreForm
                {...this.state.storeEdit}
                isEdit
                onSubmit={this.handleUpdateStore}
              />
            </ModalBody>
          </Modal>}
      </Container>
    );
  }
}
