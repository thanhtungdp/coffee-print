import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { autobind } from "core-decorators";
import { connectAutoBindAction } from "utils/redux";
import theme from "themes/imageEditorLayout";
import GalleryList from "components/gallery-list";
import { checkLoadMore } from "utils/pagination";
import TabFilter from "./TabFilter";
import {
  setCurrentImage,
  getImageList,
  loadMoreImageList,
  deleteImage,
  deleteAllImage,
  restoreAllImage
} from "redux/actions/imageAction";
import tabFilter from "constants/imageType";
import { SHAPE } from "constants/color";

const GalleryContainer = styled.div`
  width: 40%;
  background: ${theme.GALLERY};
  flex-direction: column;
  display: flex;
`;

const FlexTool = styled.div`
  display: flex;
`;

const Remove = styled.a`
  display: block;
  text-align: center;
  background-color: ${props => (props.color ? props.color : SHAPE.RED)};
  padding: 2px;
  color: #ffffff !important;
  font-size: 14px;
  flex: 1;
  &:hover{
    color: #ffffff !important;
    cursor: pointer;
  }
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
    images: state.image.list.data,
    pagination: state.image.list.pagination,
    storeId: state.store.storeId,
  }),
  {
    setCurrentImage,
    getImageList,
    loadMoreImageList,
    deleteImage,
    deleteAllImage,
    restoreAllImage
  }
)
@autobind
export default class Gallery extends PureComponent {
  static propTypes = {
    images: GalleryList.propTypes.images,
    setCurrentImage: PropTypes.func,
    getImageList: PropTypes.func,
    loadMoreImageList: PropTypes.func,
    deleteImage: PropTypes.func,
    deleteAllImage: PropTypes.func,
    restoreAllImage: PropTypes.func
  };

  state = {
    currentTab: TABS[0]
  };

  getImages(page = 1) {
    this.props.getImageList({
      type: this.state.currentTab.value,
      page: page,
      itemPerPage: 20,
      storeId: this.props.storeId
    });
  }

  handleLoadmore(e) {
    e.preventDefault();
    this.props.loadMoreImageList({
      type: this.state.currentTab.value,
      page: this.props.pagination.page + 1,
      itemPerPage: this.props.pagination.itemPerPage,
	    storeId: this.props.storeId
    });
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

  handleDeleteImage(e, image) {
    e.preventDefault();
    let sConfrim = confirm("Bạn có chắc chắc muốn xóa không");
    if (sConfrim) {
      this.props.deleteImage(image.id);
    }
  }

  handleDeleteAll(e) {
    e.preventDefault();
    let sConfrim = confirm(
      "Điều này sẽ xóa tất cả các ảnh hiện tại, bạn có chắc chắn muốn xóa không"
    );
    if (sConfrim) {
      this.props.deleteAllImage();
    }
  }

  handleRestoreAll(e) {
    e.preventDefault();
    let sConfrim = confirm("Bạn có muốn khôi phục không");
    if (sConfrim) {
      this.props.restoreAllImage();
      setTimeout(() => {
        this.getImages();
      }, 500);
    }
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
          onDeleteImage={this.handleDeleteImage}
          onLoadmore={this.handleLoadmore}
          isLoadmore={checkLoadMore(this.props.pagination)}
        />
        <TabFilter
          tabs={TABS}
          currentTab={this.state.currentTab}
          onChange={this.handleChangeTab}
        />
        <FlexTool>
          <Remove onClick={this.handleDeleteAll}>
            <i className="icon-trash" /> Xóa tất cả
          </Remove>
          <Remove color={SHAPE.GREEN} onClick={this.handleRestoreAll}>
            <i className="icon-refresh" /> Khôi phục
          </Remove>
        </FlexTool>
      </GalleryContainer>
    );
  }
}
