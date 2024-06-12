import React, { useEffect, useState } from "react";
import { FaStopCircle } from "react-icons/fa";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { updateData } from "../../utils/utils";
// const { ipcRenderer } = window.require("electron");

interface TimerProps {
  timer: boolean;
  settimer: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer: React.FC<TimerProps> = ({ timer, settimer }) => {
  const [sec, setsec] = useState<number>(0);
  const [min, setmin] = useState<number>(0);
  const [hour, sethour] = useState<number>(0);

  function convertSeconds(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return {
      hours,
      minutes,
      seconds: remainingSeconds
    };
  }

  const start = () => {
    const taskElement = document.getElementById("task") as HTMLInputElement;
    const serviceElement = document.getElementById("service") as HTMLInputElement;

    if (taskElement.value === '') {
      window.alert('please enter your task details');
    } else {
      // ipcRenderer.send("logger:start", {});
      settimer(true);
      serviceElement.value = "true";
      taskElement.setAttribute("disabled", "false");
    }
  };

  const stop = () => {
    const serviceElement = document.getElementById("service") as HTMLInputElement;

    serviceElement.value = "false";
    // ipcRenderer.send("logger:stop", {});
    settimer(false);
    updateData();
  };

  useEffect(() => {
    const secondsElement = document.getElementById('seconds') as HTMLInputElement;
    const second = parseInt(secondsElement.value, 10);
    const { hours, minutes, seconds } = convertSeconds(second);

    sethour(hours);
    setmin(minutes);
    setsec(seconds);
  }, []);

  // useEffect(() => {
  //   if (timer) {
  //     // ipcRenderer.send("logger:start", {});
  //   }

  //   const gettimeListener = () => {
  //     const secondsElement = document.getElementById('seconds') as HTMLInputElement;
  //     const second = parseInt(secondsElement.value, 10);
  //     const { hours, minutes, seconds } = convertSeconds(second);
  //     sethour(hours);
  //     setmin(minutes);
  //     setsec(seconds);
  //   };

  //   // ipcRenderer.on('gettime', gettimeListener);

  //   return () => {
  //     // ipcRenderer.removeListener('gettime', gettimeListener);
  //   };
  // }, [timer]);

  // useEffect(() => {
  //   const stoptimerListener = (e: any, data: any) => {
  //     stop();
  //   };

  //   ipcRenderer.on("stoptimer", stoptimerListener);

  //   return () => {
  //     ipcRenderer.removeListener('stoptimer', stoptimerListener);
  //   };
  // }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timer) {
      interval = setInterval(() => {
        const abcd = min % 15;

        if (sec === 0) {
          if ((abcd === 0 && min) || (min / 15 === 0 && hour)) {
            updateData();
          }
        }

        if (sec < 59) {
          setsec(prevSec => prevSec + 1);
          const secondsElement = document.getElementById('seconds') as HTMLInputElement;
          const initialsecElement = document.getElementById('initialsec') as HTMLInputElement;

          if (secondsElement && initialsecElement) {
            const newval = parseInt(secondsElement.value) + 1;
            const newvalsec = parseInt(initialsecElement.value) + 1;
            secondsElement.value = newval.toString();
            initialsecElement.value = newvalsec.toString();
          }
        }

        if (sec >= 59) {
          const projectidElement = document.getElementById('projectid') as HTMLInputElement;
          // ipcRenderer.send('updatetime', { proid: projectidElement.value });
          const secondsElement = document.getElementById('seconds') as HTMLInputElement;
          const initialsecElement = document.getElementById('initialsec') as HTMLInputElement;

          if (secondsElement && initialsecElement) {
            const newval = parseInt(secondsElement.value) + 1;
            const newvalsec = parseInt(initialsecElement.value) + 1;
            secondsElement.value = newval.toString();
            initialsecElement.value = newvalsec.toString();
          }

          setmin(prevMin => prevMin + 1);
          setsec(0);
        }

        if (min >= 59 && sec >= 59) {
          sethour(prevHour => prevHour + 1);
          setmin(0);
        }
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, sec, min, hour]);

  return (
    <div id="timer" className="center">
      <div className="timer">
        <div className="watch">
          <h2>{hour >= 10 ? hour : "0" + hour}</h2>
          <span> hrs</span>
          <h2>{min >= 10 ? min : "0" + min}</h2>
          <span> min </span>
          <h2>{sec >= 10 ? sec : "0" + sec}</h2>
          <span> sec</span>
          {timer ? (
            <FaStopCircle onClick={stop} />
          ) : (
            <BsFillPlayCircleFill onClick={start} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;
