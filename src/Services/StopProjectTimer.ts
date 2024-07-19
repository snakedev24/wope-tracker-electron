import { allActions } from "../Store/Actions/allActions";
import { stopTimer } from "./History";

export const StopProjectTimer = () => async dispatch => {
    try {
        const response = await stopTimer()
        const result = await response.json()
        console.log(result, "stop timer result")
        dispatch(allActions.StopTimerAction(result))
    }
    catch (error) {
        console.log("Something went wrong", error)
        dispatch(allActions.StopTimerErrorAction(error))
    }
}