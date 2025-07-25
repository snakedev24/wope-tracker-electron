import React, { useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai"
import { AiFillEyeInvisible } from "react-icons/ai"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useActions } from "../../Hooks/useAction";
import Loginform from "../Forms/Loginform";

const formData = {
  email: "",
  password: "",
}

const Login = () => {
  const navigate = useNavigate();
  const state: any = useSelector((state) => state);
  const [icon, seticon] = useState(<AiFillEye />);
  const [data, setdata] = useState(formData);
  const [backbtn, setbackbtn] = useState(false);
  const [loading, isLoading] = useState(false);
  const loginError = useSelector((state: any) => state?.loginReducer?.logindata?.logindata?.message)
  const { setpassword, login, authenticate } = useActions()

  const handleChange = (e: any) => {
    let value = e.target.value;
    setdata({
      ...data,
      [e.target.name]: value,
    });
  };

  const continuebtn = (e) => {
    e.preventDefault()
    if (navigator.onLine) {
      const pattern = /^[^]+@[^]+\.[a-z]{2,3}$/;
      if (data.email === "") {
        toast("Please enter your email");
      } else if (!data.email.match(pattern)) {
        toast("Please enter valid email");
      } else {
        login({ data, backbtn, authenticate, setbackbtn })
      };
    } else toast("No Internet");
  }

  const showPassword = () => {
    if (state?.cartReducer?.password === "password") {
      setpassword("text");
      seticon(<AiFillEyeInvisible />)
    } else {
      setpassword("password");
      seticon(<AiFillEye />)
    }
  }

  //submit function
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    isLoading(true);
    if (navigator.onLine) {
      let pattern = /^[^]+@[^]+\.[a-z]{2,3}$/;
      if (data.email === "") {
        toast("Enter Email");
      } else if (!data.email.match(pattern)) {
        toast("Invalid email format.");
      } else if (data.email.match(pattern)) {
        try {
          await login({ data, backbtn, authenticate, setbackbtn });
        } catch (error) {
          toast("Error logging in.");
          console.error(error);
        }
      }
    }
    isLoading(false);
  };  

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      authenticate(navigate)
    }
  }, [token]);

  return (
    <>
      <Loginform
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        continuebtn={continuebtn}
        showPassword={showPassword}
        icon={icon}
        data={data}
        backbtn={backbtn}
        setbackbtn={setbackbtn}
        loading={loading}
      />
    </>
  );
}

export default Login;
