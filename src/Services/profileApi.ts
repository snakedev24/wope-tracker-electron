import { allActions } from "../Store/Actions/allActions";
import { userProfile } from "./History";

// get user detail in project
export const getUserProfile = (navigate) => async dispatch => {
  dispatch(allActions.getUserProfilePending(true));
  try {
    const response = await userProfile()
    const result = await response.json();
    console.log(result, "result:::")
    if (!result.data) {
      navigate("/login");
      localStorage.clear();
    }
    let developer = result.data[0].first_name;
    dispatch(allActions.getUserProfileSuccess(developer));
    // setdev(developer);
  } catch (err: any) {
    dispatch(allActions.getUserProfileFailure(err.message))
  }
}








