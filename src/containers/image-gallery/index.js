import React, { Component } from "react";
import styled from "styled-components";
import Gallery from "./gallery";
import Editor from "./editor";

const ImageGalleryContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export default class ImageGallery extends Component {
  render() {
    return (
      <ImageGalleryContainer>
        <Gallery />
        <Editor />
      </ImageGalleryContainer>
    );
  }
}
