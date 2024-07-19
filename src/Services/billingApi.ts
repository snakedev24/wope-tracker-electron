import { allActions } from "../Store/Actions/allActions";
import { billing, projectCheckIn, projectTimer } from "./History";

// Define the types for the parameters
type DashboardProps = {
  getmonth: (monthData: any) => void;
  gettoday: (todayData: any) => void;
  getweek: (weekData: any) => void;
  getyes: (yesterdayData: any) => void;
  high: (totalData: any) => number;
};

// Define the types for the response data
interface BillingResponse {
  data: {
    total: number[];
    today: any;
    yesterday: any;
    week: any;
    month: any;
  }[];
}

interface CheckInResponse {
  success: boolean;
  [key: string]: any;
}

interface TimerResponse {
  success: boolean;
  [key: string]: any;
}

// Project billing
export const updatedashboard = (
  proid: string,
  { getmonth, gettoday, getweek, getyes, high }: DashboardProps
) => async (dispatch: any) => {
  dispatch(allActions.getUserBillingPending(true));
  try {
    if (navigator.onLine) {
      const response = await billing(proid);
      const result: BillingResponse = await response.json();
      dispatch(allActions.getUserBillingSuccess(result));
      (document.getElementById("projectid") as HTMLInputElement).value = proid;
      (document.getElementById("seconds") as HTMLInputElement).value = "0";
      (document.getElementById("initialsec") as HTMLInputElement).value = "0";
      const highestValue = high(result.data[0].total);
      gettoday(result.data[0].today); 
      getyes(result.data[0].yesterday); 
      getweek(result.data[0].week); 
      getmonth(result.data[0].month); 
      (document.getElementById("seconds") as HTMLInputElement).value = highestValue.toString();
      document.getElementById("watch")?.classList.remove("hide");
      document.getElementById("loader")?.classList.add("hide");
    }
  } catch (error) {
    dispatch(allActions.getUserBillingFailure((error as Error).message));
  }
};

export const checkInUser = async (
  product_id: string,
  dispatch: any,
  toast: any
) => {
  try {
    const response = await projectCheckIn({ project_id: product_id });
    const result: CheckInResponse = await response.json()
    if (result.success) {
      dispatch(allActions.projectCheckInAction(result));
    } else {
      console.log("Some Problem With data.");
    }
  } catch (err) {
    console.log(err, "err");
  }
};

export const checkProjectTime = async (dispatch: any) => {
  try {
    const response = await projectTimer();
    const result: TimerResponse = await response.json();
    if (result.success) {
      dispatch(allActions.projectTimerUpdate(result));
    } else {
      console.log("Something Went Wrong.");
    }
  } catch (err) {
    console.log(err, "err");
  }
};
