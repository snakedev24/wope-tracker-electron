import { toast } from "react-toastify";
import { loginValid } from "./History";
import { allActions } from "../Store/Actions/allActions";
const { ipcRenderer } = window.require("electron");

//login api && validation for user have or not....
export const login = ({ backbtn, data, authenticate, setbackbtn }) => async dispatch => {
  console.log(data, "validatedata")
  // if (!navigator.onLine) {
  //   toast("No Internet");
  //   return;
  // }
  dispatch(allActions.getUserLoginPending(true));
  try {
    const response = await loginValid(data)
    const result = await response.json();
    console.log(result, "meggggassaba::")
    if (response.status === 200) {
      console.log(result, "hell")
      dispatch(allActions.getUserLoginSuccess(result));
      localStorage.setItem("token", result.authorization.token);
      authenticate();
      if (navigator.onLine && localStorage.getItem("token")) {
        ipcRenderer.send("fetch", {});
      }
    } else if (result.msg === "No user found") {
      toast("Email is not registered");
    } else if (result.msg === "password incorrect") {
      if (!backbtn) {
        document.getElementById("passbox").classList.add('in')
        document.getElementById("emailbox").classList.add('out')
        setbackbtn(true)
      } else {
        toast("Incorrect Password");
      }
    }
  } catch (err: any) {
    dispatch(allActions.getUserLoginFailure(err.message))
  }
};  