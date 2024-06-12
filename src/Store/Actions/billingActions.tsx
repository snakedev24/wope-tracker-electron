import { actionType } from "../actionType/index"

export const getUserBillingPending = (loading) => {
  return {
    type: actionType.GET_USER_BILLING_PENDING,
    payload: {
      loading
    }
  }
}

// to get the list of users - success
export const getUserBillingSuccess = billingdata => {
  return {
    type: actionType.GET_USER_BILLING_SUCCESS,
    payload: {
      billingdata
    }
  }
}

// to get the list of users - failure
export const getUserBillingFailure = billingerror => {
  return {
    type: actionType.GET_USER_BILLING_FAILURE,
    payload: {
      billingerror
    }
  }
}

export const projectCheckInAction = (result) => {
  return {
    type: actionType.USER_CHECKIN_STATUS,
    payload: result
  }
};

export const projectTimerUpdate = (result) => {
  return {
    type: actionType.PROJECT_TIMER_UPDATE,
    payload: result
  }
};