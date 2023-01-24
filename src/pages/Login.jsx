import React, { useContext, useState } from "react";
import loginImg from "../static/assets/svg/login_screen.svg";
import { AiOutlineLock } from "react-icons/ai";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import { GoogleLogin } from "@react-oauth/google";

import jwt_decode from "jwt-decode";
import useTitle from "../customhooks/useTitle";
import { axiosInstance } from "../config";

export default function Login() {
  const { dispatch, isFetching } = useContext(AuthContext);

  useTitle("Log in");
  const nevigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", {
        email: user.email,
        password: user.password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      nevigate("/");
    } catch (err) {
      setError("something went wrong");
      dispatch({ type: "LOGIN_FAILURE" });
      setUser({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="h-screen bg-slate-100 flex justify-center items-center">
      <div className="w-full max-w-xl mx-auto bg-white h-auto sm:rounded-xl sm:p-8 p-4 shadow-md">
        <div className="w-10">
          <Link to="/">
            <HiOutlineArrowNarrowLeft className="text-2xl" />
          </Link>
        </div>
        <div className="w-full relative h-72">
          <img
            src={loginImg}
            alt="loginImg"
            className="w-full h-full absolute mx-auto"
          />
        </div>
        <div className="px-4 space-y-8">
          <h2 className="text-black text-3xl font-bold ">Log In</h2>
          <div className="trigger"></div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex  items-center  relative">
              <span className="text-slate-600 text-2xl"> @</span>
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleOnChange}
                required
                placeholder="Email"
                className="w-full border-b py-2 focus:outline-none ml-3 placeholder-transparent peer "
              />
              <label
                htmlFor="email"
                className="absolute left-10 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Email
              </label>
            </div>
            <div className="flex  items-center relative ">
              <AiOutlineLock className="text-slate-600 text-2xl" />
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleOnChange}
                required
                placeholder="Password"
                className="w-full border-b py-2 focus:outline-none ml-3 placeholder-transparent peer"
              />
              <label
                htmlFor="password"
                className="absolute left-10 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Password
              </label>
            </div>
            {error && (
              <div className="flex py-2 justify-center capitalize w-full text-red-500 items-center relative ">
                <p>{error} </p>
              </div>
            )}
            <button
              type="submit"
              className="w-full flex mt-6 disabled:bg-gray-400 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isFetching ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-center animate-spin"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              ) : (
                "SING IN "
              )}
            </button>
            <div className="flex flex-col py-2 items-center justify-center">
              <div className="relative w-full mt-2">
                <hr className="mb-2" />
                {/*
                <div className="-top-4 absolute w-full flex justify-center items-center">
                  <span className="px-2  text-sm py-1 rounded-md bg-slate-100 text-black ">
                    Or continue with
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <GoogleLogin
                    theme="filled_black"
                    size="large"
                    shape="square"
                    type="icon"
                    onSuccess={(credentialResponse) => {
                      const token = credentialResponse.credential;
                      var decoded = jwt_decode(token);
                      console.log(decoded);
                      dispatch({ type: "LOGIN_SUCCESS", payload: decoded });
                      localStorage.setItem("isLogin", true);
                      nevigate("/");
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>
                */}
              </div>
              <h3 className="text-gray-600 font-semibold mt-4">
                You Don't Have an Account ?
                <Link to="/signup" className="text-blue-600 ml-2">
                  Sign up
                </Link>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
