import React, { useContext } from "react";
import loginImg from "../static/assets/svg/login_screen.svg";
import { AiOutlineLock } from "react-icons/ai";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import useTitle from "../customhooks/useTitle";

export default function Login() {
  const { dispatch } = useContext(AuthContext);

  useTitle("Log in");
  const nevigate = useNavigate();
  return (
    <div className="h-screen bg-slate-100 flex justify-center items-center">
      <div className="w-full max-w-xl mx-auto bg-white h-auto sm:rounded-xl sm:p-8 p-4 shadow-md">
        <div className="w-10">
          <Link to="/">
            <HiOutlineArrowNarrowLeft className="text-2xl" />
          </Link>
        </div>
        <img src={loginImg} alt="loginImg" className="w-72 mx-auto h-full " />
        <div className="px-4 space-y-8">
          <h2 className="text-black text-3xl font-bold ">Log In</h2>

          <div className="space-y-4 relative ">
            <hr className="mb-8" />
            <span className="px-2 -top-8 left-56 py-1 rounded-md bg-slate-200 text-black absolute">
              Or
            </span>
            <div className="flex items-center justify-center">
              <GoogleLogin
                theme="filled_black"
                size="large"
                shape="square"
                type="icon"
                onSuccess={(credentialResponse) => {
                  const token = credentialResponse.credential;
                  var decoded = jwt_decode(token);
                  dispatch({ type: "LOGIN", payload: decoded });
                  localStorage.setItem("isLogin", true);
                  nevigate("/");
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
            <div className="flex py-2 items-center border-b">
              <span className="text-slate-600 text-2xl"> @</span>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full focus:outline-none ml-3"
              />
            </div>
            <div className="flex py-2 items-center  border-b">
              <AiOutlineLock className="text-slate-600 text-2xl" />
              <input
                type="password"
                name="password"
                id="password"
                required
                className="w-full focus:outline-none ml-3"
              />
            </div>
            <div className="flex flex-col py-2 items-center justify-center">
              <button className="px-4 py-2 text-white bg-blue-600 w-full max-w-md rounded-xl font-semibold">
                Login
              </button>
              <h3 className="text-gray-600 font-semibold mt-4">
                You Don't Have an Account ?
                <Link to="/signup" className="text-blue-600 ml-2">
                  Sign up
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
