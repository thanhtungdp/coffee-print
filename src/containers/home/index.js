import React, { Component } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import { SHAPE } from "constants/color";

const HomeContainer = styled.div`
 width: 500px;
 margin-left: auto;
 margin-right: auto;
 display: flex;
 flex-wrap: wrap;
 margin-top: 50px;
 justify-content: space-between;
 @media(max-width: 500px){
   width: 98%;
 }
`;

const ItemContainer = styled(Link)`
  display: block;
  width: ${props => (props.block ? "100%" : "48%")};
  height: 150px;
  background-color: ${props => props.color};
  color: #ffffff;
  text-align: center;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  &:hover{
    text-decoration: none;
  }
`;
const Icon = styled.i`
  font-size: 20px;
  color: #ffffff;
`;

const TextSpan = styled.span`
  font-size: 18px;
  margin-top: 10px;
  color: #ffffff;
`;

export default class Home extends Component {
  static propTypes = {};
  renderItem(color, icon, name, path, block = false) {
    return (
      <ItemContainer to={path} color={color} block={block}>
        <Icon className={icon} />
        <TextSpan>{name}</TextSpan>
      </ItemContainer>
    );
  }
  render() {
    return (
      <HomeContainer>
        {this.renderItem(
          SHAPE.GREEN,
          "icon-picture",
          "Quản lý ảnh",
          "/gallery-manager"
        )}
        {this.renderItem(
          SHAPE.ORANGE,
          "icon-chemistry",
          "Đồ uống",
          "/drink-manager"
        )}
        {this.renderItem(
          SHAPE.PINK,
          "icon-cloud-upload",
          "Upload ảnh",
          "/image-upload",
          true
        )}
      </HomeContainer>
    );
  }
}
