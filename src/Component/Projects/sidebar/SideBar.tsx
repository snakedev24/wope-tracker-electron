import React, { useState, MouseEvent } from "react";
import { BsFillStopwatchFill } from "react-icons/bs";
import { AiFillSetting, AiOutlineFullscreenExit } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { FiMinimize } from "react-icons/fi";
// const { ipcRenderer } = window.require("electron");

const SideBar: React.FC = () => {
    const [isActive, setIsActive] = useState(false); // when user click on a project changes to true 
    const [miniicon, setminiicon] = useState(true); // for minimizing functionality of application

    const minmize = (e: MouseEvent) => {
        e.preventDefault();
        const projectElement = document.getElementById('projectid') as HTMLInputElement;
        if (projectElement && projectElement.value !== '') {
            // ipcRenderer.send('minimize', {});
            setminiicon(false);
            document.getElementById('timer')?.classList.add("minimize");
            document.getElementById("mini")?.classList.add("miniwindow");
        } else {
            alert('please select a project first');
        }
    };

    const fullscreen = (e: MouseEvent) => {
        e.preventDefault();
        // ipcRenderer.send('maximize', {});
        setminiicon(true);
        document.getElementById('timer')?.classList.remove("minimize");
        document.getElementById("mini")?.classList.remove("miniwindow");
    };

    const slidemenu = () => { // sidebar functionality
        setIsActive(true);
    };

    const backtoslide = () => { // sidebar functionality
        setIsActive(false);
    };

    return (
        <>
            {isActive ?
                <div className="side-bar"> <MdOutlineArrowBackIos onClick={backtoslide} />  {miniicon ? (
                    <FiMinimize onClick={minmize} />
                ) : (
                    <AiOutlineFullscreenExit id="fullbtn" className="fullbtn" onClick={fullscreen} />
                )}
                    <BsFillStopwatchFill />
                    <AiFillSetting />
                </div>

                : <div>
                    <IoIosArrowForward onClick={slidemenu} />
                </div>
            }
            <div className="mini" id="mini"></div>
        </>
    );
};

export default SideBar;
