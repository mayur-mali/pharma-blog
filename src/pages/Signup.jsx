import React from "react";
import signupImg from "../static/assets/svg/signup_screen.svg";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

import useTitle from "../customhooks/useTitle";
import { useState } from "react";
import { axiosInstance } from "../config";
import { toast } from "react-toastify";

export default function Signup() {
  useTitle("Sign up");
  const nevigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
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
    setLoading(true);
    e.preventDefault();

    try {
      if (user.password === user.cpassword) {
        // eslint-disable-next-line no-unused-vars
        const res = await axiosInstance.post("/auth/register", {
          username: user.fname + "_" + user.lname,
          email: user.email,
          password: user.password,
          profilePic: `https://ui-avatars.com/api/?name=${user.fname}+${user.lname}`,
        });
        toast(`Welcome ${user.fname} ${user.lname}`);
        setLoading(false);
        nevigate("/login");
      } else {
        setLoading(false);
      }
    } catch (error) {
      toast(error.response.data);
      setLoading(false);
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

            <button
              type="submit"
              className="w-full flex disabled:bg-gray-400 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 animate-spin"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              ) : (
                "SING UP "
              )}
            </button>
            <div className="flex flex-col py-2 items-center justify-center">
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
