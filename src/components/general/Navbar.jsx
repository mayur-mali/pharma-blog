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
