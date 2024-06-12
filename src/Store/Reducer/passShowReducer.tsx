import { actionType } from "../actionType";

const initialState = {
  password: "password",
  backbutton: false,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    //password
    case actionType.SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };

    case actionType.SET_BACK_BUTTON:
      return {
        ...state,
        backbutton: state.backbutton,
      };

    default:
      return state;
  }
};