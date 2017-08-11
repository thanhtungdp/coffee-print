import update from "react-addons-update";
import {
  GET_STORES,
  CREATE_STORE,
  DELETE_STORE,
  GET_CLIENT_IP,
  SET_CURRENT_STORE
} from "../actions/storeAction";

const initialState = {
  list: {
    data: [],
    pagination: {}
  },
  clientIp: "",
  storeId: ""
};

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORES:
      return getStores(state, action);
    case CREATE_STORE:
      return createStore(state, action);
    case DELETE_STORE:
      return deleteStore(state, action);
    case GET_CLIENT_IP:
      return getClientIp(state, action);
    case SET_CURRENT_STORE:
      return {
        ...state,
        storeId: action.storeId
      };
    default:
      return state;
  }
}

export function getStores(state, action) {
  return update(state, {
    list: {
      data: {
        $set: action.payload.getStores
      }
    }
  });
}

export function createStore(state, action) {
  return update(state, {
    list: {
      data: {
        $apply: oldData => [action.payload.createStore, ...oldData]
      }
    }
  });
}

export function deleteStore(state, { id }) {
  const storeIndex = state.list.data.findIndex(store => store._id === id);
  if (storeIndex < 0) return state;
  return update(state, {
    list: {
      data: {
        $splice: [[storeIndex, 1]]
      }
    }
  });
}

export function getClientIp(state, action) {
  return update(state, {
    clientIp: {
      $set: action.payload.getClientIp.ip
    }
  });
}
