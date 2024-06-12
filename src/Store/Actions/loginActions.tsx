import { actionType } from "../actionType/index"

// to get the list of users - started
export const getUserLoginPending = (loading) => {
  return {
    type: actionType.GET_USER_LOGIN_PENDING,
    payload: {
      loading
    }
  }
}

// to get the list of users - success
export const getUserLoginSuccess = logindata => {
  return {
    type: actionType.GET_USER_LOGIN_SUCCESS,
    payload: {
      logindata
    }
  }
}

// to get the list of users - failure
export const getUserLoginFailure = error => {
  return {
    type: actionType.GET_USER_LOGIN_FAILURE,
    payload: {
      error
    }
  }
}