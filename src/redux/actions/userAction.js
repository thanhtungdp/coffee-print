import Api from "api/Api";
import { AWAIT_MARKER } from "redux-await";
import {removeAuthToken} from "utils/auth";

export const GET_USERS = "DRINK/get-users";
export const GET_AUTH_ME = "DRINK/get-auth-me";
export const AUTH_LOGOUT = "DRINK/auth-logout-me";
export const CREATE_USER = "DRINK/create-drink";
export const DELETE_USER = "DRINK/delete-drink";

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

export function authLogout(){
	removeAuthToken();
  return {
    type: AUTH_LOGOUT
  }
}

export default {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
	getAuthMe,
	authLogout
};
