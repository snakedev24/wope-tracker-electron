import React from "react";

const Loader = ({show}) => {
  return (
    <>
    {(show)?
      <div className="loader" id="loader">
        <div className="spinner" />
      </div>:
    <div className="loader hide" id="loader">
      <div className="spinner" />
    </div>}
    </>
  );
};

export default Loader;