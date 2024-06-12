import { actionType } from "../actionType/index"

export const getUserProfilePending = (loading) => {
  return {
    type: actionType.GET_USER_PROFILE_PENDING,
    payload: {
      loading
    }
  }
}

// to get the list of users - success
export const getUserProfileSuccess = data => {
  return {
    type: actionType.GET_USER_PROFILE_SUCCESS,
    payload: {
      data
    }
  }
}

// to get the list of users - failure
export const getUserProfileFailure = error => {
  return {
    type: actionType.GET_USER_PROFILE_FAILURE,
    payload: {
      error
    }
  }
}