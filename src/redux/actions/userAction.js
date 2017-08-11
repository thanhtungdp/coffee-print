import Api from "api/Api";
import { AWAIT_MARKER } from "redux-await";
import { removeAuthToken } from "utils/auth";
import { getPageSizeDefault } from "utils/page";

export const GET_USERS = "USER/get-users";
export const GET_AUTH_ME = "USER/get-auth-me";
export const AUTH_LOGOUT = "USER/auth-logout-me";
export const CREATE_USER = "USER/create-user";
export const DELETE_USER = "USER/delete-user";
export const UPDATE_PAPER_SIZE = "USER/update-paper-size";

export function getUsers() {
  return {
    type: GET_USERS,
    payload: {
      getUsers: Api.getUsers()
    },
    AWAIT_MARKER
  };
}

export function createUser(data) {
  return {
    type: CREATE_USER,
    AWAIT_MARKER,
    payload: {
      createUser: Api.createUser(data)
    }
  };
}

export function getAuthMe() {
  return {
    type: GET_AUTH_ME,
    AWAIT_MARKER,
    payload: {
      getAuthMe: Api.authMe()
    }
  };
}

export function deleteUser(id) {
  Api.deleteUser(id);
  return {
    type: DELETE_USER,
    id
  };
}

export function updateUser(data) {
  return dispatch => {
    Api.updateUser(data).then(() => {
      dispatch(getUsers());
    });
  };
}

export function authLogout() {
  removeAuthToken();
  return {
    type: AUTH_LOGOUT
  };
}

export function updatePaperSize(data, isSync = true) {
  if(isSync){
	  Api.updatePaperSize(data);
  }
  return {
    type: UPDATE_PAPER_SIZE,
    data
  };
}

export function resetPaperSize() {
  return updatePaperSize(getPageSizeDefault());
}

export default {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getAuthMe,
  authLogout,
  updatePaperSize,
  resetPaperSize
};
