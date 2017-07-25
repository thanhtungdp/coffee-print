import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { autobind } from "core-decorators";
import { connectAutoBindAction } from "utils/redux";
import theme from "themes/imageEditorLayout";
import GalleryList from "components/gallery-list";
import TabFilter from "./TabFilter";
import {
  setCurrentImage,
  getImageList
} from "redux/actions/imageAction";
import tabFilter from "constants/imageType";

const GalleryContainer = styled.div`
  width: 350px;
  background: ${theme.GALLERY};
  flex-direction: column;
  display: flex;
`;

const TABS = [
  {
    value: tabFilter.ALL,
    name: "Tất cả"
  },
  {
    value: tabFilter.NEWS,
    name: "Mới nhất"
  },
  {
    value: tabFilter.PRINTED,
    name: "Đã in"
  }
];

@connectAutoBindAction(
  state => ({
    images: state.image.list.data
  }),
  { setCurrentImage, getImageList }
)
@autobind
export default class Gallery extends PureComponent {
  static propTypes = {
    images: GalleryList.propTypes.images,
    setCurrentImage: PropTypes.func,
    getImageList: PropTypes.func
  };

  state = {
    currentTab: TABS[0]
  };

  getImages() {
    this.props.getImageList({ type: this.state.currentTab.value });
  }

  handleChangeTab(tab) {
    this.setState({ currentTab: tab }, () => {
      this.getImages();
    });
  }

  handleChooseImage(e, image) {
    e.preventDefault();
    this.props.setCurrentImage(image);
  }

  getDataFilter() {
    if (this.state.currentTab.value === tabFilter.ALL) {
      return this.props.images;
    } else {
      return this.props.images.filter(
        image => image.type === this.state.currentTab.value
      );
    }
  }

  componentDidMount() {
    this.getImages();
  }

  render() {
    return (
      <GalleryContainer>
        <GalleryList
          images={this.getDataFilter()}
          onChooseImage={this.handleChooseImage}
        />
        <TabFilter
          tabs={TABS}
          currentTab={this.state.currentTab}
          onChange={this.handleChangeTab}
        />
      </GalleryContainer>
    );
  }
}
