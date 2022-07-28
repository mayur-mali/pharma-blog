import React, { useContext } from "react";
import signupImg from "../static/assets/svg/signup_screen.svg";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import useTitle from "../customhooks/useTitle";
import { useState } from "react";
import { axiosInstance } from "../config";

export default function Signup() {
  useTitle("Sign up");
  const nevigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.password === user.cpassword) {
        const res = await axiosInstance.post("/auth/register", {
          username: user.fname + "_" + user.lname,
          email: user.email,
          password: user.password,
        });
        nevigate("/login");
      } else {
        setError("password is not match");
      }
    } catch (error) {
      setError("something went wrong");
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
            src={signupImg}
            alt="signupImg"
            className="w-full absolute mx-auto h-full "
          />
        </div>
        <div className="px-4 space-y-8">
          <h2 className="text-black text-3xl font-bold ">Sign up</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className=" flex items-center w-full">
              <AiOutlineUser className="text-slate-600 text-2xl mr-3" />
              <div className="flex justify-between md:gap-0 gap-y-4 md:flex-row flex-col w-full">
                <div className="relative">
                  <input
                    type="text"
                    name="fname"
                    value={user.fname}
                    id="firstname"
                    onChange={handleOnChange}
                    placeholder="First Name"
                    className="border-b py-2 w-full focus:outline-none placeholder-transparent peer"
                    required
                  />
                  <label
                    htmlFor="firstname"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    First Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="lname"
                    value={user.lname}
                    placeholder="Last Name"
                    id="lastname"
                    onChange={handleOnChange}
                    required
                    className="border-b py-2 w-full focus:outline-none placeholder-transparent peer"
                  />
                  <label
                    htmlFor="lastname"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Last Name
                  </label>
                </div>
              </div>
            </div>
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
            <div className="flex py-2 items-center relative ">
              <AiOutlineLock className="text-slate-600 text-2xl" />
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleOnChange}
                required
                placeholder="Password"
                className="w-full border-b focus:outline-none ml-3 placeholder-transparent peer"
              />
              <label
                htmlFor="password"
                className="absolute left-10 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Password
              </label>
            </div>
            <div className="flex py-2 items-center relative ">
              <AiOutlineLock className="text-slate-600 text-2xl" />
              <input
                type="password"
                name="cpassword"
                id="confirmpassword"
                value={user.cpassword}
                onChange={handleOnChange}
                required
                placeholder="Confirm Password"
                className="w-full border-b focus:outline-none ml-3 placeholder-transparent peer"
              />
              <label
                htmlFor="confirmpassword"
                className="absolute left-10 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Confirm Password
              </label>
            </div>
            {error && (
              <div className="flex py-2 justify-center capitalize w-full text-red-500 items-center relative ">
                <p>{error} </p>
              </div>
            )}
            <div className="flex flex-col py-2 items-center justify-center">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 w-full max-w-md rounded-xl font-semibold"
              >
                Signup
              </button>

              <h3 className="mt-4 font-semibold">
                Already have an account?
                <Link to="/login" className="text-blue-600 ml-2">
                  Login
                </Link>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
