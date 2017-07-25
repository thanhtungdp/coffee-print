export const GET_IMAGE_LIST = "IMAGE/get-image-list";
export const SET_CURRENT_IMAGE = "IMAGE/set-current-image";
export const CLEAR_CURRENT_IMAGE = "IMAGE/clear-current-image";

export function getImageList() {
  return {
    type: GET_IMAGE_LIST
  };
}

export function setCurrentImage(image) {
  return {
    type: SET_CURRENT_IMAGE,
    image
  };
}

export function clearCurrentImage() {
  return {
    type: CLEAR_CURRENT_IMAGE
  };
}

export default {
  getImageList,
  setCurrentImage,
  clearCurrentImage
};
