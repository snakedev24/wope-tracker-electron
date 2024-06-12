import React, { useState, useEffect } from 'react';

function ProjectTimer({ initialTime, running, isShowSecond }) {
  const [time, setTime] = useState(convertToSeconds(initialTime));
  const [formattedTime, setFormattedTime] = useState(initialTime);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  useEffect(() => {
    setFormattedTime(convertToFormattedTime(time));
  }, [time]);

  function convertToSeconds(timeString) {
    // Extract hours, minutes, and seconds, if present
    const timeParts = timeString.match(/(\d+h)?\s*(\d+m)?\s*(\d+s)?/);
    const hours = timeParts[1] ? parseInt(timeParts[1]) : 0;
    const minutes = timeParts[2] ? parseInt(timeParts[2]) : 0;
    const seconds = timeParts[3] ? parseInt(timeParts[3]) : 0;
    return (hours * 3600) + (minutes * 60) + seconds;
  }

  function convertToFormattedTime(totalSeconds) {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return (
    <span>
      {formattedTime}
    </span>
  );
}

export default ProjectTimer;
