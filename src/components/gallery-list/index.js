import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ImageItem from "./ImageItem";

const GalleryListContainer = styled.div`
  flex: 1;
  overflow: scroll;
`;

const ImageItemContainer = styled.div`
  width: 116.67px;
  height: 116.67px;
  padding: 8px;
  float: left;
`;

export default class GalleryList extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape(ImageItem.propTypes)),
    onChooseImage: PropTypes.func
  };

  render() {
    return (
      <GalleryListContainer>
        {this.props.images.map(image => (
          <ImageItemContainer key={image.id}>
            <ImageItem
              {...image}
              onClick={e => this.props.onChooseImage(e, image)}
            />
          </ImageItemContainer>
        ))}
      </GalleryListContainer>
    );
  }
}
