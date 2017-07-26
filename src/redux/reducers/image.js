import {
  SET_CURRENT_IMAGE,
  GET_IMAGE_LIST,
  LOAD_MORE_IMAGE_LIST,
  CLEAR_CURRENT_IMAGE,
  PRINT_IMAGE
} from "../actions/imageAction";
import update from "react-addons-update";
import { UPLOADS_FOLDER_NAME, UPLOADS_THUMBNAIL_FOLDER_NAME } from "config";
import imageType from "constants/imageType";

const initialState = {
  list: {
    data: [],
    pagination: {}
  },
  currentImage: {}
};

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_IMAGE:
      return setCurrrentImage(state, action);
    case GET_IMAGE_LIST:
      return getImageList(state, action);
    case LOAD_MORE_IMAGE_LIST:
      return loadMoreImageList(state, action);
    case CLEAR_CURRENT_IMAGE:
      return clearCurrentImage(state);
    case PRINT_IMAGE:
      return printImage(state, action);
    default:
      return state;
  }
}

function cleanDataImageList(data) {
  return data.map(item => ({
    ...item,
    image:  UPLOADS_FOLDER_NAME + "/" + item.fileName,
    imageThumbnail:
      UPLOADS_FOLDER_NAME +
      "/" +
      UPLOADS_THUMBNAIL_FOLDER_NAME +
      "/" +
      item.fileName
  }));
}

function getImageList(state, { payload }) {
  return update(state, {
    list: {
      data: {
        $set: cleanDataImageList(payload.getImageList.data)
      },
      pagination: {
        $set: payload.getImageList.pagination
      }
    }
  });
}

function loadMoreImageList(state, { payload }) {
  return update(state, {
    list: {
      data: {
        $apply: oldData => [
          ...oldData,
          ...cleanDataImageList(payload.loadMoreImageList.data)
        ]
      },
      pagination: {
        $set: payload.loadMoreImageList.pagination
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

function printImage(state, { imageId }) {
  let imageIndex = state.list.data.findIndex(item => item.id === imageId);
  if (imageIndex < 0) return state;
  return update(state, {
    list: {
      data: {
        [imageIndex]: {
          type: {
            $set: imageType.PRINTED
          }
        }
      }
    }
  });
}
