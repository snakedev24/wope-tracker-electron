import { allActions } from "../Store/Actions/allActions";
import { loginAuth } from "./History";



 //login Authentication
 export const authenticate = (navigate) => async (dispatch)=> {
    dispatch(allActions.loginAuthenticatePending(true));
    try {
      // const response = await loginAuth()
      // const result = await response.json();

      // dispatch(allActions.loginAuthenticateSuccess(result));
      // if(result.mes="user found"){
      navigate("/")
    // }
    } catch (error) {
      dispatch(allActions.loginAuthenticateFailure(error));
    }
  };