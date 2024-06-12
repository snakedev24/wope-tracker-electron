import { actionType } from "../actionType";

const initialState = {
  error: null,
  logindata: null,
  loading: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {

    //login api
    case actionType.GET_USER_LOGIN_PENDING:
      return {
        ...state,
        loading: action.payload,
      }
    case actionType.GET_USER_LOGIN_SUCCESS:
      return {
        ...state,
        logindata: action.payload,
      }
    case actionType.GET_USER_LOGIN_FAILURE:
      return {
        ...state,
        loginerror: action.payload
      }
    default:
      return state;
  }
};