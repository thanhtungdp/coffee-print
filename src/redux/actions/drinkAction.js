import Api from "api/Api";
import { AWAIT_MARKER } from "redux-await";

export const GET_DRINKS = "DRINK/get-drinks";
export const CREATE_DRINK = "DRINK/create-drink";
export const DELETE_DRINK = "DRINK/delete-drink";

export function getDrinks() {
  return {
    type: GET_DRINKS,
    payload: {
      getDrinks: Api.getDrinks()
    },
    AWAIT_MARKER
  };
}

export function createDrink({ name }) {
  return {
    type: CREATE_DRINK,
    AWAIT_MARKER,
    payload: {
      createDrink: Api.createDrink({ name })
    }
  };
}

export function deleteDrink(id) {
  Api.deleteDrink(id);
  return {
    type: DELETE_DRINK,
    id
  };
}

export default {
	getDrinks,
	createDrink,
	deleteDrink
}