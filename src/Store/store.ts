import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./Reducer";

const store = legacy_createStore(reducers,applyMiddleware(thunk));

export default store;