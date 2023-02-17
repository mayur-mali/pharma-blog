import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import heroimg from "../../static/assets/svg/flame-787.png";
export default function HeroSection() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <div className="w-full   py-8 px-4 space-y-6 mx-auto max-w-7xl">
        <img src={heroimg} alt="heroimage" className="mx-auto" />
        <div className="w-full flex flex-col space-y-4 items-center">
          {currentUser && (
            <h1 className="md:text-5xl  capitalize text-4xl font-bold dark:text-white text-blue-600">
              Welcome &nbsp;
              {currentUser.username && (
                <span className="text-black underline">
                  {currentUser.username}
                </span>
              )}
              {currentUser.name && (
                <span className="text-black underline">{currentUser.name}</span>
              )}
            </h1>
          )}
          {!currentUser && (
            <h1 className="md:text-5xl  text-4xl font-bold dark:text-white text-blue-600">
              Welcome To
            </h1>
          )}
          <h2 className="md:text-6xl text-4xl font-bold dark:text-gray-300 text-indigo-900">
            <span className="text-indigo-400 dark:text-gray-600 mr-1">
              &ldquo;
            </span>
            The Pharma Blog
            <span className="text-indigo-400 dark:text-gray-600 ml-1">
              &rdquo;
            </span>
          </h2>
        </div>
      </div>
      <hr />
    </div>
  );
}
