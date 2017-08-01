import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "reactstrap/lib/Container";
import Col from "reactstrap/lib/Col";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import { connectAutoBindAction } from "utils/redux";
import {
  getUsers,
  deleteUser,
  createUser,
  updateUser
} from "redux/actions/userAction";
import { autobind } from "core-decorators";
import styled from "styled-components";
import swal from "sweetalert2";

import UserList from "./UserList";
import CreateUserForm from "./CreateUserForm";

const UserManagerContainer = styled.div`
  margin-top: 24px;
`;

@connectAutoBindAction(
  state => ({
    users: state.user.list.data
  }),
  { getUsers, deleteUser, createUser, updateUser }
)
@autobind
export default class UserManager extends Component {
  static propTypes = {
    data: PropTypes.array,
    updateUser: PropTypes.func
  };

  state = {
    isOpenEdit: false,
    userEdit: {}
  };

  toggleHideEdit() {
    this.setState({
      isOpenEdit: false
    });
  }

  handleEditItem(e, userEdit) {
    e.preventDefault();
    this.setState({
      isOpenEdit: true,
      userEdit
    });
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleDeleteItem(e, item) {
    e.preventDefault();
    let sConfrim = confirm("Bạn có muốn xóa không");
    if (!sConfrim) return;
    this.props.deleteUser(item.id);
    swal({
      type: "error",
      title: "Đã xóa"
    });
  }

  handleCreateUser(user) {
    this.props.createUser(user);
    swal({
      type: "success",
      title: "Tạo user thành công"
    });
  }

  handleUpdateUser(user) {
    this.props.updateUser(user);
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
          <UserManagerContainer>
            <h1>Quản lý thành viên</h1>
            <CreateUserForm onSubmit={this.handleCreateUser} />
            <UserList
              data={this.props.users}
              onDeleteItem={this.handleDeleteItem}
              onEditItem={this.handleEditItem}
            />
          </UserManagerContainer>
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
              <CreateUserForm
                {...this.state.userEdit}
                isEdit
                onSubmit={this.handleUpdateUser}
              />
            </ModalBody>
          </Modal>}
      </Container>
    );
  }
}
