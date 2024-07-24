import { get, post } from "./requests";

export const bidding = () => {
   return get("/api/home")
}

export const billing = (proid) => {
   return get(`/api/projectbill/${proid}`)
}

export const loginAuth = () => {
   return get("/api/profileapi")
}

export const userProfile = () => {
   return get("/api/profileapi")
}

export const loginValid = (fdata) => {
   return post("/api/login", fdata)
}

export const logoutUser = () => {
   return get("/api/logout")
}

export const projectCheckIn = (data) => {
   return post("/api/toggle-project-timer", data)
}

export const projectTimer = () => {
   return get("/get-projects-time")
}

export const attendanceStatus = (data) => {
   return post("/api/checkAttenndance", data)
}

export const projectCheckOut = (data) => {
   return post("/api/checkout", data)
}

export const stopTimer = () => {
   return get("/api/stoptimer")
}