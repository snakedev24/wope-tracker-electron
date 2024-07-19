import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";

const ProjectDashboardList = ({ projects, onProjectClick }) => {
  const { projectTimerResult } = useSelector((state: any) => state.projectbillingReducer);
  const [active, setActive] = useState()
  const handleActiveIndex = (projectId: any) => {
    setActive(projectId)
    onProjectClick(projectId)
  }

  useEffect(() => {
    if (projects && !active) {
      projects?.map((project: any, index: any) => {
        if (project.is_active) {
          setActive(project.project_id)
        }
      })
    }
  }, [projects])

  const getProjectTime = (projectId, totalTime) => {
    const projectTime = projectTimerResult?.projects?.find(
      (item: any) => item.project_id === projectId
    );
    return projectTime ? projectTime.total_time : totalTime;
  };
  
  return (
    <div className="project-list">
      {projects?.map((project: any, index: any) => {
        return (
          <div key={index} style={{ color: active === project?.project_id ? '#008000' : 'black' }} className="project-item cursor-pointer" onClick={() => handleActiveIndex(project.project_id)}>
            {project.project_name}
            <span>{getProjectTime(project.project_id, project.total_time)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectDashboardList;