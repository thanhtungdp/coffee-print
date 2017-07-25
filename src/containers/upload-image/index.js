import React, { Component } from "react";
import Col from "reactstrap/lib/Col";
import styled from "styled-components";
import ImageForm from "./ImageForm";

const ImageContainer = styled.div`
   min-height: 100vh;
   background-image: url(assets/images/background.png);
   background-size: cover;
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

export default class Image extends Component {
  static propTypes = {};
  render() {
    return (
      <ImageContainer>
        <Container>
          <ImageForm />
        </Container>
      </ImageContainer>
    );
  }
}
