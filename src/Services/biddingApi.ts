import { allActions } from "../Store/Actions/allActions";
import { bidding } from "./History";

//bidding api integration
export const fetchData = (navigate: any, setprojectloader: any) => async dispatch => {
  dispatch(allActions.getUserBiddingPending(true));
  try {
    const response = await bidding();
    const result = await response.json();
    let finalResult = result;
    if (!result) {
      navigate('/login');
      localStorage.clear();
    }
    dispatch(allActions.getUserBiddingSuccess(finalResult));
    // setApiData();
    setprojectloader(false);
  } catch (error) {
    dispatch(allActions.getUserBiddingFailure(error))
  }
}