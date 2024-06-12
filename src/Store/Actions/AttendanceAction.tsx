import { actionType } from "../actionType/index"

export const AttendanceAction = (attendance) => {
    return {
        type: actionType?.ATTENDANCE,
        payload: { attendance }
    }
}

export const AttendanceError = (attendanceError) => {
    return {
        type: actionType?.ATTENDANCEERROR,
        payload: { attendanceError }
    }
}