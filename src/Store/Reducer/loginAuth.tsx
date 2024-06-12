import { actionType } from "../actionType";

const initialState = {
  loading: false,
  loginAuthdata: null,
  loginAutherror: null,
};

export const loginAuthReducer = (state = initialState, action) => {
  switch (action.type) {

    //login authentification
    case actionType.LOGIN_AUTHENTIFICATION_PENDING:
      return {
        ...state,
        loading: action.payload
      }
    case actionType.LOGIN_AUTHENTIFICATION_SUCCESS:
      return {
        ...state,
        loginAuthdata: action.payload,
      }
    case actionType.LOGIN_AUTHENTIFICATION_FAILURE:
      return {
        ...state,
        loginAutherror: action.payload
      }

    default:
      return state;
  }
};