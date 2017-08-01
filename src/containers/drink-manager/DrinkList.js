import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Table from "reactstrap/lib/Table";

const DrinkListContainer = styled.div`
    
`;

const DrinkItem = ({ name, index, onDelete }) => (
  <tr>
    <td>{index}</td>
    <td>{name}</td>
    <td>
      <a onClick={onDelete} href="#">Xóa</a>
    </td>
  </tr>
);

export default class DrinkList extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    onDeleteItem: PropTypes.func
  };
  render() {
    return (
      <DrinkListContainer>
        <Table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên thức uống</th>
              <th>Hành dộng</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((drink, index) => (
              <DrinkItem
                key={drink.id}
                {...drink}
                index={index + 1}
                onDelete={e => this.props.onDeleteItem(e, drink)}
              />
            ))}
          </tbody>
        </Table>
      </DrinkListContainer>
    );
  }
}
