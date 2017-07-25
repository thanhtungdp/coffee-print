import DefaultApi from "api/Api";
import { AWAIT_MARKER } from "redux-await";
export const GET_IMAGE_LIST = "IMAGE/get-image-list";
export const LOAD_MORE_IMAGE_LIST = "IMAGE/load-more-image-list";
export const SET_CURRENT_IMAGE = "IMAGE/set-current-image";
export const CLEAR_CURRENT_IMAGE = "IMAGE/clear-current-image";
export const PRINT_IMAGE = "IMAGE/print-image";

export function getImageList({ type, page, itemPerPage }) {
  return {
    type: GET_IMAGE_LIST,
    AWAIT_MARKER,
    payload: {
      getImageList: DefaultApi.getImageList({ type, page, itemPerPage })
    }
  };
}

export function loadMoreImageList({ type, page, itemPerPage }) {
  return {
    type: LOAD_MORE_IMAGE_LIST,
    AWAIT_MARKER,
    payload: {
      loadMoreImageList: DefaultApi.getImageList({ type, page, itemPerPage })
    }
  };
}

export function setCurrentImage(image) {
  return {
    type: SET_CURRENT_IMAGE,
    image
  };
}

export function printImage(imageId) {
  DefaultApi.printImage(imageId);
  return {
    type: PRINT_IMAGE,
    imageId
  };
}

export function clearCurrentImage() {
  return {
    type: CLEAR_CURRENT_IMAGE
  };
}

export default {
  getImageList,
  loadMoreImageList,
  setCurrentImage,
  clearCurrentImage,
  printImage
};
