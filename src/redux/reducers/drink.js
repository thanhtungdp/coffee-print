import update from "react-addons-update";
import { GET_DRINKS, CREATE_DRINK, DELETE_DRINK } from "../actions/drinkAction";

const initialState = {
  list: {
    data: [],
    pagination: {}
  }
};

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRINKS:
      return getDrinks(state, action);
    case CREATE_DRINK:
      return createDrink(state, action);
    case DELETE_DRINK:
      return deleteDrink(state, action);
    default:
      return state;
  }
}

export function getDrinks(state, action) {
  return update(state, {
    list: {
      data: {
        $set: action.payload.getDrinks
      }
    }
  });
}

export function createDrink(state, action) {
  return update(state, {
    list: {
      data: {
        $apply: oldData => [action.payload.createDrink, ...oldData]
      }
    }
  });
}

export function deleteDrink(state, { id }) {
  const drinkIndex = state.list.data.findIndex(drink => drink._id === id);
  if (drinkIndex < 0) return state;
  return update(state, {
    list: {
      data: {
        $splice: [[drinkIndex, 1]]
      }
    }
  });
}
