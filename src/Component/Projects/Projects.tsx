import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProjectDetails from "./ProjectDetails";

const Projects = () => {
  const [token, setoken] = useState(false);
  const navigate = useNavigate();

  const checkUserLoggedIn = () => {
    if (!localStorage.getItem("token"))
      navigate("/login");
    else
      setoken(true)
  }

  useEffect(() => {
    checkUserLoggedIn()
  });

  return <>
    {token ?
      <div className="projects">
        <ProjectDetails />
      </div>
      : <></>
    }
  </>
};
export default Projects;
