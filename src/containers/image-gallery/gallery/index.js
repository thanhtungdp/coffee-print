import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { autobind } from "core-decorators";
import { connectAutoBindAction } from "utils/redux";
import theme from "themes/imageEditorLayout";
import GalleryList from "components/gallery-list";
import TabFilter from "./TabFilter";
import { setCurrentImage } from "redux/actions/imageAction";

const GalleryContainer = styled.div`
  width: 350px;
  background: ${theme.GALLERY};
  flex-direction: column;
  display: flex;
`;

@connectAutoBindAction(
  state => ({
    images: state.image.list.data
  }),
  { setCurrentImage }
)
@autobind
export default class Gallery extends PureComponent {
  static propTypes = {
    images: GalleryList.propTypes,
    setCurrentImage: PropTypes.func
  };

  handleChooseImage(e, image) {
    e.preventDefault();
    this.props.setCurrentImage(image);
  }

  render() {
    return (
      <GalleryContainer>
        <GalleryList
          images={this.props.images}
          onChooseImage={this.handleChooseImage}
        />
        <TabFilter />
      </GalleryContainer>
    );
  }
}
