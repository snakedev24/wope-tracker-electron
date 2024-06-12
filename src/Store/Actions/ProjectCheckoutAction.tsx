import { actionType } from "../actionType/index"

export const ProjectCheckoutAction = (checkout) => {
    return {
        type: actionType?.PROJECTCHECKOUT,
        payload: { checkout }
    }
}

export const ProjectCheckoutError = (checkoutError) => {
    return {
        type: actionType?.PROJECTCHECKOUTERROR,
        payload: { checkoutError }
    }
}