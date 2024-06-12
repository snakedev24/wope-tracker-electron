import { allActions } from "../Store/Actions/allActions"
import { attendanceStatus } from "./History"

export const attendance = ({ data }) => async dispatch => {
    try {
        const response = await attendanceStatus(data)
        const result = await response.json()
        console.log(result, "resulttt")
        if (response.status === 200) {
            dispatch(allActions?.AttendanceAction(result))
        }
        else {
            dispatch(allActions?.AttendanceError(result))
        }
    }
    catch (error) {
        console.log(error, "error")
        // dispatch(allActions?.AttendanceError(error))
    }
}