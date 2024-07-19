import { get, post } from "./requests";

export const bidding = () => {
   return get("/home")
}

export const billing = (proid) => {
   return get(`/projectbill/${proid}`)
}

export const loginAuth = () => {
   return get("/profileapi")
}

export const userProfile = () => {
   return get("/profileapi")
}

export const loginValid = (fdata) => {
   return post("/login", fdata)
}

export const logoutUser = () => {
   return get("/logout")
}

export const projectCheckIn = (data) => {
   return post("/toggle-project-timer", data)
}

export const projectTimer = () => {
   return get("/get-projects-time")
}

export const attendanceStatus = (data) => {
   return post("/checkAttenndance", data)
}

export const projectCheckOut = (data) => {
   return post("/checkout", data)
}

export const stopTimer = () => {
   return get("/stoptimer")
}