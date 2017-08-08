import update from "react-addons-update";
import {
  GET_USERS,
  CREATE_USER,
  DELETE_USER,
  GET_AUTH_ME,
  AUTH_LOGOUT,
  UPDATE_PAPER_SIZE
} from "../actions/userAction";
import { getPageSizeDefault } from "utils/page";

const initialState = {
  list: {
    data: [],
    pagination: {}
  },
  me: {
    isAdmin: false,
    isLogined: false,
    isChecked: false,
    paperSize: {}
  }
};

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return getUsers(state, action);
    case CREATE_USER:
      return createUser(state, action);
    case DELETE_USER:
      return deleteUser(state, action);
    case GET_AUTH_ME:
      return updateAuthMe(state, action);
    case UPDATE_PAPER_SIZE:
      return updatePaperSize(state, action);
    case AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export function getUsers(state, action) {
  return update(state, {
    list: {
      data: {
        $set: action.payload.getUsers
      }
    }
  });
}

export function createUser(state, action) {
  return update(state, {
    list: {
      data: {
        $apply: oldData => [action.payload.createUser, ...oldData]
      }
    }
  });
}

export function deleteUser(state, { id }) {
  const userIndex = state.list.data.findIndex(user => user._id === id);
  if (userIndex < 0) return state;
  return update(state, {
    list: {
      data: {
        $splice: [[userIndex, 1]]
      }
    }
  });
}

export function updatePaperSize(state, { data }) {
  return update(state, {
    me: {
      paperSize: {
        $set: data
      }
    }
  });
}

export function updateAuthMe(state, { payload: { getAuthMe } }) {
  if (getAuthMe.success === false) {
    return update(state, {
      me: {
        isChecked: {
          $set: true
        }
      }
    });
  }
  return update(state, {
    me: {
      isAdmin: {
        $set: getAuthMe.isAdmin
      },
      isLogined: {
        $set: true
      },
      isChecked: {
        $set: true
      },
      paperSize: {
        $set: getAuthMe.paperSize.width
          ? getAuthMe.paperSize
          : getPageSizeDefault()
      }
    }
  });
}
