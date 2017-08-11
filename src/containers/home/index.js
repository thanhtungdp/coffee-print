import React, { Component } from "react";
import { Link } from "react-router";
import { autobind } from "core-decorators";
import { push } from "react-router-redux";
import styled from "styled-components";
import Button from "reactstrap/lib/Button";
import { SHAPE } from "constants/color";
import Logo from "components/logo";
import { connectAutoBindAction } from "utils/redux";
import { authLogout } from "redux/actions/userAction";

const HomeContainer = styled.div`
 width: 500px;
 margin-left: auto;
 margin-right: auto;
 padding-top: 20px
`;
const Grid = styled.div`
 display: flex;
 flex-wrap: wrap;
 margin-top: 50px;
 justify-content: space-between;
 margin-top: 20px;
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

@connectAutoBindAction(
  state => ({
    isAdmin: state.user.me.isAdmin
  }),
  { authLogout, push }
)
@autobind
export default class Home extends Component {
  static propTypes = {};
  renderItem(color, icon, name, path, block = false, onClick = () => {}) {
    return (
      <ItemContainer to={path} color={color} onClick={onClick} block={block}>
        <Icon className={icon} />
        <TextSpan>{name}</TextSpan>
      </ItemContainer>
    );
  }

	handleClickGalleryManager(){

  }

  renderForAdmin() {
    return (
      <Grid>
        {this.renderItem(
          SHAPE.GREEN,
          "icon-picture",
          "Quản lý in ảnh",
          "/select-store",
          false,
          this.handleClickGalleryManager
        )}
        {this.renderItem(
          SHAPE.ORANGE,
          "icon-chemistry",
          "Danh mục thức uống",
          "/drink-manager"
        )}
        {this.renderItem(
          SHAPE.PINK,
          "icon-cloud-upload",
          "Upload ảnh",
          "/image-upload"
        )}
        {this.renderItem(
          SHAPE.PRIMARY,
          "icon-people",
          "Quản lý tài khoản",
          "/user-manager"
        )}
	      {this.renderItem(
		      SHAPE.ORANGE,
		      "icon-bag",
		      "Quản lý IP cửa hàng",
		      "/store-manager",
          true
	      )}
      </Grid>
    );
  }

  renderForMember() {
    return (
      <Grid>
        {this.renderItem(
          SHAPE.GREEN,
          "icon-picture",
          "Quản lý in ảnh",
          "/gallery-manager"
        )}
        {this.renderItem(
          SHAPE.PINK,
          "icon-cloud-upload",
          "Upload ảnh",
          "/image-upload"
        )}
      </Grid>
    );
  }

  handleLogout() {
    this.props.authLogout();
    this.props.push("/login");
  }

  render() {
    return (
      <HomeContainer>
        <Logo isCenter />
        {this.props.isAdmin ? this.renderForAdmin() : this.renderForMember()}
        <Button color="danger" style={{marginTop: '10px'}} block onClick={this.handleLogout}>Đăng xuất</Button>
      </HomeContainer>
    );
  }
}
