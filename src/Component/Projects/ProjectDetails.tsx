//react or router hooks/module imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
//components import
import Navbar from "./Navbar/Navbar";
import Loader from "../Loader/loader";
import { getmonth, gettoday, getweek, getyes, high, updateData } from "../../utils/utils";
import { useActions } from "../../Hooks/useAction";
import Search from "./Search/Search";
import { useSelector } from "react-redux";
import ProjectList from "./projectList/ProjectList";
import SecTopBar from "./Navbar/SecTopBar";
import SideBar from "./sidebar/SideBar";
import ProjectStatusDashboard from "./ProjectStatusDashboard";
import ProjectDashboardPage from "./dashboard/ProjectDashboardPage";

const ProjectDetails = () => {
  const [timer, settimer] = useState(false);
  const [user, setuser] = useState();
  const [hideWatch, setHideWatch] = useState(false);
  const [title, settitle] = useState("");//stores project title 
  const [searchinput, setSearchinput] = useState("");//for seach bar functionality
  const [projectloader, setprojectloader] = useState(true)//for minimizing functionality of application
  const { getUserProfile, fetchData, updatedashboard } = useActions()
  const biddingData = useSelector((state: any) => state.biddingReducer.biddingdata.biddingdata)  //for storing projects data
  const billingData = useSelector((state: any) => state.projectbillingReducer) //billing api data
  const dev = useSelector((state: any) => state?.biddingReducer?.biddingdata?.biddingdata?.user_name)  //logged in user name
  const [isDashboard, setIsDashboard] = useState(false);
  // const fetchUserProfile = () => {
  //   getUserProfile(navigate);
  // };
  const time = billingData.billingdata?.projects[0].total_time

  const navigate = useNavigate()
  // useEffect(() => {
  //   fetchUserProfile()
  // },[]);

  const setprojectid = (e) => {
    // e.preventDefault()
    const selInput = document.getElementById('projectid') as HTMLInputElement || null
    let selproject = selInput?.value;
    let proid = e.target.closest(".card").dataset.id;
    let sel = e.target.closest('.card').classList.contains('card_border')
    if (sel && hideWatch) {
      return;
    }
    if (!navigator.onLine && (selproject !== '' || selproject === proid)) {
      window.alert('No Internet')
      return;
    }
    if (selproject !== '' || selproject === proid) {
      if (!window.confirm('Are you sure you want to change your project')) {
        return;
      } else {
        let timeinput = document.getElementById("time") as HTMLInputElement || null;
        let d = new Date(Date.now());
        let timeInputValue = timeinput?.value
        timeInputValue = d.toLocaleString();
        // ipcRenderer.send("screenshot:capture", {});
        // if (document.getElementById('service').value === 'true') {
        //   ipcRenderer.send('stop', {});
        // }
        // settimer(false)
      }
    }
    document.getElementById('watch')?.classList.add('hide');
    document.getElementById('loader')?.classList.remove('hide');
    setHideWatch(true)

    document.getElementById('con')?.classList.remove('start_container');

    let prodet = e.target.closest(".card").dataset.temp;

    const projectDet = document.getElementById("projectdet") as HTMLInputElement || null
    let projectDetValue = projectDet?.value
    projectDetValue = prodet;

    // setuser(e.target.closest(".card").dataset.user)
    setuser(biddingData.user_name);
    settitle(e.target.closest(".card").dataset.title);
    let child = e.target.closest("#left-container").children;
    for (let i = 0; i < child.length; i++) {
      const e = child[i];
      e.classList.remove('card_border')
    }
    e.target.closest(".card").classList.add("card_border")
    updatedashboard(proid, { high, getmonth, gettoday, getweek, getyes });
  }

  useEffect(() => {
    fetchData(navigate, setprojectloader)
  }, []);

  return (
    <div className="slide">
      <SideBar />
      <div className="side">
        <Navbar
          developer={dev}
        />
        <SecTopBar
          settimer={settimer}
          updateData={updateData}
          isDashboard={isDashboard}
          setIsDashboard={setIsDashboard}
          biddingData={biddingData}
        />
        {isDashboard
          ?
          <ProjectStatusDashboard isDashboard={setIsDashboard} />
          :
          <ProjectDashboardPage />
        }
      </div>
    </div>
  );
};

export default ProjectDetails;
