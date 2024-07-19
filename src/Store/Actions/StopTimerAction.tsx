import { actionType } from "../actionType";

export const StopTimerAction = (data) => {
    return {
        type: actionType.STOPTIMER,
        payload: { data }
    }
}

export const StopTimerErrorAction = (data) => {
    return {
        type: actionType.STOPTIMERERROR,
        payload: { data }
    }
}