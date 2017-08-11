import Api from "api/Api";
import { AWAIT_MARKER } from "redux-await";

export const GET_STORES = "STORE/get-users";
export const GET_CLIENT_IP = "STORE/get-client-ip";
export const CREATE_STORE = "STORE/create-store";
export const DELETE_STORE = "STORE/delete-store";
export const SET_CURRENT_STORE = "STORE/set-current-store";

export function setCurrentStore(storeId) {
  return {
    type: SET_CURRENT_STORE,
	  storeId
  }
}

export function getStores() {
  return {
    type: GET_STORES,
    payload: {
      getStores: Api.getStores()
    },
    AWAIT_MARKER
  };
}

export function createStore(data) {
  return {
    type: CREATE_STORE,
    AWAIT_MARKER,
    payload: {
      createStore: Api.createStore(data)
    }
  };
}

export function getClientIp() {
  return {
    type: GET_CLIENT_IP,
    AWAIT_MARKER,
    payload: {
	    getClientIp: Api.getClientIp()
    }
  };
}

export function deleteStore(id) {
  Api.deleteStore(id);
  return {
    type: DELETE_STORE,
    id
  };
}

export function updateStore(id, data) {
  return dispatch => {
    Api.updateStore(id, data).then(() => {
      dispatch(getStores());
    });
  };
}


export default {
  getStores,
  createStore,
  deleteStore,
  updateStore,
  getClientIp
};
