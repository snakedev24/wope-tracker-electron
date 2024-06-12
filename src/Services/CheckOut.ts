import { allActions } from "../Store/Actions/allActions"
import { projectCheckOut } from "./History"

export const checkOut = ({ data }) => async dispatch => {
    try {
        const response = await projectCheckOut(data)
        const result = await response.json()

        if (response.status === 200) {
            dispatch(allActions?.ProjectCheckoutAction(result))
        }
        else {
            dispatch(allActions?.ProjectCheckoutError(result))
        }
    }
    catch (error) {
        console.log("Something went wrong: ", error)
        // dispatch(allActions?.ProjectCheckoutError(result))
    }
}