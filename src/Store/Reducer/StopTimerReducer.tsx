import { actionType } from "../actionType";

const initialState = {
    stopTimerData: null,
    stopTimerError: null
}

export const StopTimeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionType.STOPTIMER:
            return {
                ...state,
                stopTimerData: action.payload
            }

        case actionType.STOPTIMERERROR:
            return {
                ...state,
                stopTimerError: action.payload
            }

        default:
            return state
    }
}