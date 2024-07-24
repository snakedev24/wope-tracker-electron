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
  const { StopProjectTimer } = useActions()

  const handleStopWorking = () => {
    StopProjectTimer()
    setIsDashboard(true)
  }

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
