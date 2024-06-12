import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { allApiAction } from "../Services/allApiActions";

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allApiAction, dispatch);
};
