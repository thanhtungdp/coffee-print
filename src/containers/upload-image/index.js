import React, { Component } from "react";
import styled from "styled-components";
import ImageForm from "./ImageForm";
import { connectAutoBindAction } from "utils/redux";

const ImageContainer = styled.div`
   min-height: 100vh;
   background-image: url(assets/images/background.png);
   background-size: cover;
   background-position: center center;
`;

const Container = styled.div`
   width: 600px;
   margin-left: auto;
   margin-right: auto;
   padding-top: 60px;
   @media(max-width: 600px){
     width: 98%;
    padding-top: 20px;
   }
`;

@connectAutoBindAction(state => ({
  clientIp: state.store.clientIp,
  stores: state.store.list.data,
  isLogined: state.user.me.isLogined
}))
export default class UploadImageContainer extends Component {
  static propTypes = {};
  checkStoreHaveIp() {
    let check = false;
    if (this.props.stores.length > 0) {
      this.props.stores.forEach(store => {
        if (store.ip.indexOf(this.props.clientIp) > -1) {
          check = true;
        }
      });
    }
    return check;
  }

  checkIpVerify() {
    if (this.props.isLogined) {
      return true;
    }
    return this.checkStoreHaveIp();
  }

  render() {
    if (!this.checkIpVerify()) return null;
    return (
      <ImageContainer>
        <Container>
          <ImageForm />
        </Container>
      </ImageContainer>
    );
  }
}
