import React from "react";
import "../Auth/login.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { goback } from "../../utils/utils";
// import GoogleLog from "../Auth/GoogleLogin";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useActions } from "../../Hooks/useAction";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Mail } from "lucide-react"

const Loginform = (
  {
    handleChange,
    handleSubmit,
    continuebtn,
    showPassword,
    icon,
    data,
    backbtn,
    setbackbtn,
    loading
  }
) => {
  const state = useSelector((state: any) => state);

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />

      <section className="login-box">
        <article className="form-h">
          <h1 className="text-3xl text-red-700 font-semibold">Wope AI</h1>
          <h2 className="text-gray-800">Welcome Back!</h2>
        </article>

        <form
          // onSubmit={handleSubmit}
          id="form">
          <fieldset className="user-box" id="emailbox">
            <label>Email</label> <br />
            <Input
              className="input-design mb-3 w-full"
              // value={data.username}
              type="text"
              id="email"
              name="email"
              autoComplete="off"
              onChange={handleChange}
              required
              placeholder="your@mail.com"
            />

            <label>Password</label> <br />
            <Input
              className="input-design"
              // value={data.password}
              // type="password"
              type={state.cartReducer.password} // Assuming this is a boolean
              id="password"
              name="password"
              autoComplete="off"
              onChange={handleChange}
              required
              placeholder="Enter your Password"
            />

            <span onClick={showPassword} className="absolute right-4 bottom-[130px] text-xl text-blue-900">
              {icon}
            </span>

            {/* <div>
              <NavLink to="https://snakescript.wope.ai/forget-password" className="text-xs flex justify-end mt-2 text-blue-700">
                Forgot Password?
              </NavLink>
            </div> */}

            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className={"submit-btn rounded-lg bg-blue-600 hover:bg-blue-700"}
            >
              {!loading ?
                <span>
                  Submit
                </span>
                :
                <span>
                  Submitting...
                </span>
              }
            </Button>

            <Button
              type="button"
              className={
                // !data.username ? "submit-btn disabled" : 
                "submit-btn rounded-lg bg-blue-600 hover:bg-blue-700"
              }
            // onClick={continuebtn}
            >Continue with Email</Button>

          </fieldset>

          {/* <div className="user-box" id="passbox"> </div> */}
        </form>
      </section>
    </>
  );
};

export default Loginform;
