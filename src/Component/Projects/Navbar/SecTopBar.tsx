import React, { useState } from "react";
import ProjectTimer from "../../Timer/ProjectTimer";
import "../../Projects/dashboard/ProjectDashboardPage.css"
import { useActions } from "../../../Hooks/useAction";

interface SecTopBarProps {
  settimer: (value: boolean) => void;
  updateData: () => void;
  isDashboard: boolean;
  setIsDashboard: (value: boolean) => void;
  biddingData: {
    formattedTime: string;
  } | null;
}

const SecTopBar: React.FC<SecTopBarProps> = ({ settimer, updateData, isDashboard, setIsDashboard, biddingData }) => {
  const [rotated, setRotated] = useState(false);
  const { StopProjectTimer } = useActions()
  const handleSpinner = () => {
    setRotated(true);
    settimer(false);
    setTimeout(() => {
      settimer(true);
      setRotated(false);
    }, 3000);
  };

  const handleStopWorking = () => {
    StopProjectTimer()
    setIsDashboard(true)
  }

  const handleReload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => {
    e.preventDefault();
    const selInput = document.getElementById("projectid") as HTMLInputElement | null
    let selproject = selInput?.value;
    if (!selproject) {
      return;
    }
    const taskInput = document.getElementById("task") as HTMLInputElement | null;
    const taskValue = taskInput?.value;
    if (taskValue === '') {
      window.alert('First start your timer');
    } else {
      handleSpinner();
      updateData();
    }
  };

  return (
    <div className="tracking">
      <div className="t-left">
        <h3>Tracker</h3>
      </div>
      <div className="t-right">
        <span style={{ marginRight: "10px" }}>
          {biddingData && (
            <ProjectTimer
              initialTime={biddingData?.formattedTime || "0h 0m 0s"}
              running={biddingData?.formattedTime !== "0h 0m 0s"}
              isShowSecond={true}
            />
          )}
        </span>
        {biddingData?.formattedTime !== "0h 0m 0s" && (
          <button onClick={() => handleStopWorking()} className="stop-working">
            Stop Working
          </button>
        )}
      </div>
    </div>
  );
};

export default SecTopBar;
