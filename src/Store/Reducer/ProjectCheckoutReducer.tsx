import { actionType } from "../actionType";

const initialState = {
    checkOutData: null,
    attendanceError: null
}

export const ProjectCheckoutReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionType.PROJECTCHECKOUT:
            return {
                ...state,
                attendance: action.payload
            }

        case actionType.ATTENDANCEERROR:
            return {
                ...state,
                atteandanceError: action.payload
            }

        default: return state;
    }
}