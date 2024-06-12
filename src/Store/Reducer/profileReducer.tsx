import { actionType } from "../actionType";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {

    //profile api
    case actionType.GET_USER_PROFILE_PENDING:
      return {
        ...state,
        loading: action.payload,
      }
    case actionType.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }
    case actionType.GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state;
  }
};