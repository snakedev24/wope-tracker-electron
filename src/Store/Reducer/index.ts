import { combineReducers } from 'redux';
import { biddingReducer } from './biddingReducer';
import { projectbillingReducer } from './billingReducer';
import { loginAuthReducer } from './loginAuth';
import { loginReducer } from './loginReducer';
import { cartReducer } from './passShowReducer';
import { profileReducer } from './profileReducer';
import { AttendanceReducer } from './AttendanceReducer';
import { StopTimeReducer } from './StopTimerReducer';


const reducers = combineReducers({
    biddingReducer: biddingReducer,
    projectbillingReducer: projectbillingReducer,
    loginAuthReducer: loginAuthReducer,
    loginReducer: loginReducer,
    cartReducer: cartReducer,
    profileReducer: profileReducer,
    AttendanceReducer: AttendanceReducer,
    StopTimerReducer: StopTimeReducer
});

export default reducers;