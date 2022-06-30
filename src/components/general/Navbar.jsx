import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import { VscBell } from "react-icons/vsc";
import { AiOutlineMenu } from "react-icons/ai";
import MobileMenu from "./MobileMenu";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";
function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const nevigate = useNavigate();
  const [userSetting, setUserSetting] = useState(false);
  const [mobilenavbar, setMobileNavbar] = useState(false);
  const [navColor, setNavColor] = useState(false);
  const changeBackgound = () => {
    if (window.scrollY >= 50) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };
  window.addEventListener("scroll", changeBackgound);
  const logout = () => {
    googleLogout();
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    nevigate("/");
  };

  return (
    <div
      className={
        "h-20 fixed z-40 top-0 transition duration-200 md:px-8 px-4 py-2 w-full " +
        (navColor ? " bg-white shadow-sm" : " bg-[#f5f5f5]")
      }
    >
      <div className="flex h-full w-full mx-auto justify-between items-center">
        <div className="flex space-x-2 items-center">
          <AiOutlineMenu
            className="text-2xl text-black cursor-pointer lg:hidden flex"
            onClick={() => setMobileNavbar(!mobilenavbar)}
          />
          <h3 className="text-black relative xl:text-3xl md:text-2xl text-xl font-extrabold capitalize">
            pharmacy blog
          </h3>
        </div>
        <div className="hidden xl:flex justify-center max-w-lg w-full">
          <ul className="flex text-black justify-center items-center font-sans font-medium  capitalize space-x-6">
            <Link to="#">
              <li className="active:border-b active:font-extrabold border-red-500">
                home
              </li>
            </Link>
            <Link to="#">
              <li className="active:border-b active:font-extrabold border-red-500">
                categories
              </li>
            </Link>
            <Link to="#">
              <li className="active:border-b active:font-extrabold border-red-500">
                news
              </li>
            </Link>
          </ul>
        </div>
        <div className="hidden lg:flex space-x-10">
          <div className="flex border-b  border-black justify-between items-center">
            <input
              type="text"
              onChange={(e) => console.log(e.target.value)}
              className="w-full capitalize pr-2 py-1 focus:outline-none bg-transparent text-black"
              placeholder="search...."
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {currentUser ? (
            <div className="flex space-x-10 items-center  justify-between">
              <VscBell className="text-2xl text-gray-400" />
              <div className="w-10 h-10 relative">
                <img
                  onClick={() => setUserSetting(!userSetting)}
                  className="rounded-full cursor-pointer"
                  src={currentUser.picture}
                  alt={currentUser.name}
                />
              </div>
              {userSetting ? (
                <div className="w-56 rounded-md h-20 p-4 bg-white border absolute -bottom-[70px] right-8">
                  <div className="flex justify-between">
                    <h3
                      className="text-black uppercase cursor-pointer"
                      onClick={() => logout()}
                    >
                      log out
                    </h3>
                  </div>
                </div>
              ) : null}
              {/* 
              <IoIosLogOut
                className="text-xl font-bold cursor-pointer"
                onClick={() => logout()}
              /> */}
            </div>
          ) : null}
        </div>
        <XyzTransition appear xyz="fade-75% up-2  ease-out-back">
          {mobilenavbar && (
            <div className="w-full lg:hidden square absolute left-0 py-10 px-4 top-20 h-screen z-20 bg-[#f5f5f5]">
              <div className="flex border-b max-w-lg w-full mx-auto border-black justify-between items-center">
                <input
                  type="text"
                  onChange={(e) => console.log(e.target.value)}
                  className="w-full capitalize pr-2 py-1 focus:outline-none bg-transparent text-black"
                  placeholder="search...."
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="h-full mt-24">
                <ul className="flex flex-col text-black justify-start items-center font-workSans md:text-6xl text-3xl font-medium  capitalize space-y-10">
                  <Link to="#">
                    <li className="hover:text-gray-500 font-extrabold ">
                      home
                    </li>
                  </Link>
                  <Link to="#">
                    <li className="hover:text-gray-500 font-extrabold ">
                      categories
                    </li>
                  </Link>
                  <Link to="#">
                    <li className="hover:text-gray-500 font-extrabold ">
                      news
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          )}
        </XyzTransition>
        <div className="lg:hidden flex">
          {currentUser ? (
            <div className="flex space-x-10 items-center  justify-between">
              <VscBell className="text-2xl text-gray-400" />
              <div className="w-10 h-10 relative">
                <img
                  onClick={() => setUserSetting(!userSetting)}
                  className="rounded-full cursor-pointer"
                  src={currentUser.picture}
                  alt={currentUser.name}
                />
              </div>
              {userSetting ? (
                <div className="w-56 rounded-md h-20 p-4 bg-white border absolute -bottom-[70px] right-8">
                  <div className="flex justify-between">
                    <h3
                      className="text-black uppercase cursor-pointer"
                      onClick={() => logout()}
                    >
                      log out
                    </h3>
                  </div>
                </div>
              ) : null}
              {/* 
            <IoIosLogOut
              className="text-xl font-bold cursor-pointer"
              onClick={() => logout()}
            /> */}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
