import  {actionType}  from "../actionType/index"

export const loginAuthenticatePending = (loading) => {
    return {
      type: actionType.LOGIN_AUTHENTIFICATION_PENDING,
      payload: {
      loading}
    }
  }
  
  // to get the list of users - success
  export const loginAuthenticateSuccess = billingdata => {
    return {
      type: actionType.LOGIN_AUTHENTIFICATION_SUCCESS,
      payload: {
        billingdata
      }
    }
  }
   
  // to get the list of users - failure
   export const loginAuthenticateFailure = billingerror => {
    return {
      type: actionType.LOGIN_AUTHENTIFICATION_FAILURE,
      payload: {
        billingerror
      }
    }
  }