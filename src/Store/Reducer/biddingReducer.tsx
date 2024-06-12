import { actionType } from "../actionType";

const initialState = {
  biddingdata: [],
  biddingerror: null,
  loading: false,
};

export const biddingReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionType.GET_USER_BIDDING_PENDING:
      return {
        ...state,
        loading: action.payload,
      }
    case actionType.GET_USER_BIDDING_SUCCESS:
      return {
        ...state,
        biddingdata: action.payload,
      }
    case actionType.GET_USER_BIDDING_FAILURE:
      return {
        ...state,
        biddingerror: action.payload
      }
    default:
      return state;
  }
};