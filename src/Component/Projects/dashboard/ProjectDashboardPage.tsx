import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useActions } from "../../../Hooks/useAction";
import ProjectDashboardList from "./ProjectDashboardList";
import "./ProjectDashboardPage.css";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "../../ui/input";

const ProjectDashboardPage = () => {
  const biddingData = useSelector(
    (state: any) => state.biddingReducer.biddingdata.biddingdata
  );

  const { checkInUser, checkProjectTime } = useActions();
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const handleProjectClick = async (projectId) => {
   await checkInUser(projectId, dispatch, toast);
  };

  const handleSearchProject = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredData = biddingData?.myprojects?.filter((val: any) => {
    if (searchInput === "") {
      return true;
    } else if (
      val.project_name &&
      val.project_name?.toLowerCase().startsWith(searchInput?.toLowerCase())
    ) {
      return val;
    }
    return null;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(checkProjectTime(dispatch));
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <section className="App">
      <header className="App-header">
        <h1>Project Name</h1>
        <p>Kindly choose a project for check-in or switching.</p>
        <Input
          type="text"
          placeholder="Project Name"
          onChange={handleSearchProject}
        />
      </header>
      <ProjectDashboardList
        projects={filteredData}
        onProjectClick={handleProjectClick}
      />
    </section>
  );
};

export default ProjectDashboardPage;
