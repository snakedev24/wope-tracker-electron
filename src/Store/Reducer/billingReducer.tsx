import { actionType } from "../actionType";

const initialState = {
  billingdata: null,
  billingerror: null,
  loading: false,
  userCheckResult: null,
  projectTimerResult: null,
};

export const projectbillingReducer = (state = initialState, action) => {
  switch (action.type) {

    //projectbilling
    case actionType.GET_USER_BILLING_PENDING:
      return {
        ...state,
        loading: action.payload,
      }
    case actionType.GET_USER_BILLING_SUCCESS:
      return {
        ...state,
        billingdata: action.payload.billingdata,
      }
    case actionType.GET_USER_BILLING_FAILURE:
      return {
        ...state,
        billingerror: action.payload,
      }
    case actionType.USER_CHECKIN_STATUS:
      return {
        ...state,
        userCheckResult: action.payload
      }

    case actionType.PROJECT_TIMER_UPDATE:
      return {
        ...state,
        projectTimerResult: action.payload
      }

    default:
      return state;
  }
};