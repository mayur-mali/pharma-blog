import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import { IoIosLogOut } from "react-icons/io";
function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const nevigate = useNavigate();

  const logout = () => {
    googleLogout();
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    nevigate("/");
  };

  return (
    <div className="h-20 absolute top-0 md:px-8 px-4 py-2 bg-white shadow-md  w-full">
      <div className="flex h-full max-w-7xl w-full mx-auto md:flex-row flex-col justify-between md:items-center">
        <h3 className="text-black font-bold text-xl capitalize">
          pharmacy blog
        </h3>
        <div className="max-w-md mx-auto text-black rounded-xl px-4 flex space-x-3 justify-between items-center shadow dark:bg-slate-700 bg-gray-200 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
          <input
            type="text"
            onChange={(e) => console.log(e.target.value)}
            className="w-full py-1 focus:outline-none bg-transparent text-black"
            placeholder="search...."
          />
          <button className="md:px-6 px-4 py-1 md:py-2 dark:bg-white dark:text-black bg-blue-500 text-white font-bold rounded-xl">
            Go!
          </button>
        </div>
        <div className="text-black  w-56 font-bold text-sm capitalize">
          {currentUser ? (
            <div className="w-32 flex items-center justify-between">
              <p>{currentUser.name}</p>
              <IoIosLogOut
                className="text-xl font-bold cursor-pointer"
                onClick={() => logout()}
              />
            </div>
          ) : (
            <div className="w-full flex items-center justify-evenly">
              <span>&#128522;</span> <p>user is not available</p>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
