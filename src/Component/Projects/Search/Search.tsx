import React from "react";
import { BiSearch } from "react-icons/bi";



const Search = ({ setSearchinput }) => {

  const changeHandel = (e) => {//search functionality
    setSearchinput(e.target.value)
  }

  return (
    <div className="search">
      <BiSearch className="icon" />
      <input type="search" placeholder="Search Project Name " onChange={changeHandel} />
    </div>
  );
};

export default Search;
