import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Table from "reactstrap/lib/Table";

const UserListContainer = styled.div``;

const UserItem = ({ username, isAdmin, index, onDelete, onEdit }) => (
  <tr>
    <td>{index}</td>
    <td>{username}</td>
    <td>{isAdmin ? 'Admin' : 'Member'}</td>
    <td>
      <a onClick={onEdit} href="#">Chỉnh sửa</a>
      &nbsp;&nbsp;
      <a onClick={onDelete} href="#">Xóa</a>
    </td>
  </tr>
);

export default class UserList extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func
  };
  render() {
    return (
      <UserListContainer>
        <Table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Username</th>
              <th>Quyền</th>
              <th>Hành dộng</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((user, index) => (
              <UserItem
                key={user.id}
                {...user}
                index={index + 1}
                onDelete={e => this.props.onDeleteItem(e, user)}
                onEdit={e => this.props.onEditItem(e, user)}
              />
            ))}
          </tbody>
        </Table>
      </UserListContainer>
    );
  }
}
