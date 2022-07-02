import React, { useState } from "react";
import { Link } from "react-router-dom";
import Suneditor from "../components/editor/Suneditor";
//import Mdeditor from "../components/Mdeditor";
//import PostEditor from "../components/PostEditor";

import { RiImageAddLine } from "react-icons/ri";
export default function CreateNewPost() {
  const [title, setTitle] = useState("");

  return (
    <div className="w-full font-workSans bg-slate-900 min-h-screen h-auto py-3 relative">
      <div className="max-w-7xl p-4 mx-auto">
        <div className="space-x-8 flex items-center">
          <span>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
            </Link>
          </span>
        </div>
      </div>
      <div className="max-w-7xl px-4 mt-6 mx-auto">
        <div className="relative">
          <div className="w-full bg-black absolute h-72 rounded-lg bg-opacity-75"></div>
          <div className="absolute h-full flex text-center items-center w-full">
            <h1 className=" w-full text-white sm:text-5xl text-3xl  capitalize">
              {title}
            </h1>
          </div>
          <img
            src="https://images.unsplash.com/photo-1638624269877-1f8b55da3e71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="post_img"
            className="rounded-lg h-72  w-full object-cover"
          />
        </div>
        <label htmlFor="fileInput">
          <RiImageAddLine className="text-3xl text-white" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => console.log(e.target.files[0])}
        />
        <div className="my-8 flex md:flex-row flex-col items-center">
          <input
            type="text"
            name="postname"
            className="focus:outline-none bg-transparent text-white capitalize sm:text-5xl text-3xl md:w-3/4 w-full py-4"
            placeholder="Blog title here..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <Suneditor title={title} />
        </div>
      </div>
    </div>
  );
}
