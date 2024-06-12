import React from "react";

const ProjectList = ({ biddingData, searchinput, setprojectid }) => {
  return biddingData.filter((val) => {
    if (searchinput === "") {
      return val;
    } else if (
      val.job.job_title.toLowerCase().includes(searchinput.toLowerCase())
    ) {
      return val;
    }
    return null
  }).map((val) => {
    const jobId = val.job.id
    const jobTitle = val.job.job_title;
    const firstName = val.job.seller.user.first_name;
    return (
      <div
        className="card"
        id="card"
        data-user={firstName}
        data-id={jobId}
        data-title={jobTitle}
        data-temp={jobId + firstName}
        onClick={(e) => { setprojectid(e) }}
        key={jobId}
      >
        <span id={jobId + firstName}>Project : {jobTitle}</span>
        <br />
      </div>
    );
  })
}


export default ProjectList;