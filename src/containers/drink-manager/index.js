import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "reactstrap/lib/Container";
import Col from "reactstrap/lib/Col";
import { connectAutoBindAction } from "utils/redux";
import { getDrinks, deleteDrink } from "redux/actions/drinkAction";
import { autobind } from "core-decorators";
import styled from "styled-components";

import DrinkList from "./DrinkList";
import CreateDrinkForm from "./CreateDrinkForm";

const DrinkManagerContainer = styled.div`
  margin-top: 24px;
`;

@connectAutoBindAction(
  state => ({
    drinks: state.drink.list.data
  }),
  { getDrinks, deleteDrink }
)
@autobind
export default class DrinkManager extends Component {
  static propTypes = {
    data: PropTypes.array
  };

  componentDidMount() {
    this.props.getDrinks();
  }

  handleDeleteItem(e, item) {
    e.preventDefault();
    this.props.deleteDrink(item.id);
  }

  render() {
    return (
      <Container>
        <Col md={{ size: 8, offset: 2 }}>
          <DrinkManagerContainer>
            <h1>Quản lý thức uống</h1>
            <CreateDrinkForm />
            <DrinkList
              data={this.props.drinks}
              onDeleteItem={this.handleDeleteItem}
            />
          </DrinkManagerContainer>
        </Col>
      </Container>
    );
  }
}
