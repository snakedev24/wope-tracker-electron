// const { ipcRenderer } = require("electron");
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Define the types for the functions
type TimeData = {
  hours: number;
  minutes: number;
  seconds: number;
};

// Function definitions with type annotations
export function high(e: any): any {
  return e;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getyes(e: number): void { // set yesterday data in time dashboard
  let { hours, minutes } = convertSeconds(e);
  const yesterdayElem = document.getElementById('yesterday');
  if (yesterdayElem) {
    yesterdayElem.innerHTML = `${hours}h ${minutes}m`;
  }
}

export function convertSeconds(seconds: number): TimeData { // converts seconds into hours and minutes
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return {
    hours,
    minutes,
    seconds: remainingSeconds
  };
}

export function gettoday(e: number): void { // set today data in time dashboard
  let { hours, minutes } = convertSeconds(e);
  const todayElem = document.getElementById('today');
  if (todayElem) {
    todayElem.innerHTML = `${hours}h ${minutes}m`;
  }
  (window as any).removeDataToday = convertSeconds(e);
}

export function getWeekNumber(date: Date): number {
  const dayOfWeek = (date.getDay() + 6) % 7;
  return Math.floor((date.getDate() + dayOfWeek) / 7);
}

export function getweek(e: number): void { // set this week data in time dashboard
  let { hours, minutes } = convertSeconds(e);
  const weekElem = document.getElementById('week');
  if (weekElem) {
    weekElem.innerHTML = `${hours}h ${minutes}m`;
  }
  (window as any).removeDataYes = convertSeconds(e);
}

export function getmonth(e: number): void { // set this month data in time dashboard
  let { hours, minutes } = convertSeconds(e);
  const monthElem = document.getElementById('month');
  if (monthElem) {
    monthElem.innerHTML = `${hours}h ${minutes}m`;
  }
  (window as any).removeDataMonth = convertSeconds(e);
}

export const goback = (e: Event, setbackbtn: (flag: boolean) => void): void => {
  e.preventDefault();
  setbackbtn(false);
  document.getElementById("passbox")?.classList.remove('in');
  document.getElementById("emailbox")?.classList.remove('out');
}

export const updateData = (): void => {
  const timeInput = document.getElementById("time") as HTMLInputElement;
  const secInput = document.getElementById("initialsec") as HTMLInputElement;
  const actualSecInput = document.getElementById("actualsec") as HTMLInputElement;

  if (!Number(secInput.value)) {
    return;
  }

  actualSecInput.value = secInput.value;
  const d = new Date(Date.now());
  timeInput.value = d.toLocaleString();
  // ipcRenderer.send("screenshot:capture", {});
};
