import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Table from "reactstrap/lib/Table";

const StoreListContainer = styled.div``;

const StoreItem = ({ name, ip, index, onDelete, onEdit }) => (
  <tr>
    <td>{index}</td>
    <td>{name}</td>
    <td>{ip}</td>
    <td>
      <a onClick={onEdit} href="#">Chỉnh sửa</a>
      &nbsp;&nbsp;
      <a onClick={onDelete} href="#">Xóa</a>
    </td>
  </tr>
);

export default class StoreList extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func
  };
  render() {
    return (
      <StoreListContainer>
        <Table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Storename</th>
              <th>IP</th>
              <th>Hành dộng</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((store, index) => (
              <StoreItem
                key={store.id}
                {...store}
                index={index + 1}
                onDelete={e => this.props.onDeleteItem(e, store)}
                onEdit={e => this.props.onEditItem(e, store)}
              />
            ))}
          </tbody>
        </Table>
      </StoreListContainer>
    );
  }
}
