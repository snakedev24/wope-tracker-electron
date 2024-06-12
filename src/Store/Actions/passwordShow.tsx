import  {actionType} from "../actionType/index"

const setpassword = (value) => {
  return {
    type: actionType.SET_PASSWORD,
    payload: value
  };
};

const backbtn = () => {
  return {
    type: actionType.SET_BACK_BUTTON,
  };
};

// to get the list of users - started

export {
  setpassword,
  backbtn,
};