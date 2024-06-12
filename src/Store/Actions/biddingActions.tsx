import { actionType } from "../actionType/index"

export const getUserBiddingPending = loading => {
  return {
    type: actionType.GET_USER_BIDDING_PENDING,
    payload: {
      loading
    }
  }
}

// to get the list of users - success
export const getUserBiddingSuccess = biddingdata => {
  return {
    type: actionType.GET_USER_BIDDING_SUCCESS,
    payload: {
      biddingdata
    }
  }
}

// to get the list of users - failure
export const getUserBiddingFailure = biddingerror => {
  return {
    type: actionType.GET_USER_BIDDING_FAILURE,
    payload: {
      biddingerror
    }
  }
}