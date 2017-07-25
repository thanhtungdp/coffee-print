import { SET_CURRENT_IMAGE } from "../actions/imageAction";
import update from "react-addons-update";
import imagesData from "fake-data/images";

const initialState = {
  list: {
    data: imagesData,
    pagination: []
  },
  currentImage: {}
};

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_IMAGE:
      return setCurrrentImage(state, action);
    default:
      return state;
  }
}

function getImageList(state, { payload }) {
  return update(state, {
    list: {
      data: {
        $set: payload.getImageList
      }
    }
  });
}

function setCurrrentImage(state, { image }) {
  return update(state, {
    currentImage: {
      $set: image
    }
  });
}

function clearCurrentImage(state) {
  return update(state, {
    currentImage: {
      $set: {}
    }
  });
}
