import React, { useState, MouseEvent } from "react";
import "./navbar.css";
import user from "../../../Assets/user.png"
import { IoMdArrowDropdown } from "react-icons/io";
import { MdArrowDropUp } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { BsCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  developer: string;
}

const Navbar: React.FC<NavbarProps> = ({ developer }) => {
  const navigate = useNavigate();
  const [toggle, settoggle] = useState(true);
  const logout = () => {
    const projectElement = document.getElementById('projectid') as HTMLInputElement;
    if (projectElement) projectElement.value = '';
    localStorage.clear();
    navigate("/Login");
  };

  // drop down on image  
  const showDrop = () => {
    settoggle(!toggle);
  };

  return (
    <>
      <div className="wrapper">
        <div className="w_left">
          <h2> Time Tracker</h2>
        </div>
        <div className="w_right">
          <div className="user" >
            <div className="flex items-center gap-3">
              <BsCircleFill id="net" />
              {developer}
              <div onClick={showDrop} className="flex items-center gap-3">
                <img src={user} width="30px" alt="user" />
                {toggle ? (
                  <IoMdArrowDropdown />
                ) : (
                  <MdArrowDropUp />
                )}
              </div>
            </div>
            {toggle ? (
              <> </>
            ) : (
              <div className='drop'>
                <ul>
                  <li>{developer}</li>
                  <li onClick={logout}>Logout
                    <IoLogOutSharp style={{ color: "red" }} />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
