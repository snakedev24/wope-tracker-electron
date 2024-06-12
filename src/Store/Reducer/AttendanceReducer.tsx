import { actionType } from "../actionType";

const initialState = {
    attendanceData: null,
    attendanceError: null,
};

export const AttendanceReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case actionType.ATTENDANCE:
            return {
                ...state,
                attendanceData: action.payload
            }

        case actionType.ATTENDANCEERROR:
            return {
                ...state,
                attendanceError: action.payload
            }

        default:
            return state;
    }
}