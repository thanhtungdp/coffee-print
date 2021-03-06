import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ImageItem from "./ImageItem";

const GalleryListContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

const ImageItemContainer = styled.div`
  width: 33.33%;
  height: 175px;
  padding: 8px;
  float: left;
`;

const Loadmore = styled.a`
  display: block;
  color: #ffffff !important;
  padding: 8px 16px;
  font-size: 14px;
  background-color: rgba(0,0,0,.4);
  text-align: center;
  &:hover{
    text-decoration: none;
    cursor: pointer;
  }
`;

export default class GalleryList extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape(ImageItem.propTypes)),
    onChooseImage: PropTypes.func,
    onDeleteImage: PropTypes.func,
    onLoadmore: PropTypes.func,
    isLoadmore: PropTypes.bool
  };

  render() {
    return (
      <GalleryListContainer>
        <div className="clearfix">
          {this.props.images.map(image => (
            <ImageItemContainer key={image.id}>
              <ImageItem
                {...image}
                onClick={e => this.props.onChooseImage(e, image)}
                onDelete={e => this.props.onDeleteImage(e, image)}
              />
            </ImageItemContainer>
          ))}
        </div>
        {this.props.isLoadmore &&
          <Loadmore onClick={this.props.onLoadmore}>Tải thêm</Loadmore>}
      </GalleryListContainer>
    );
  }
}
