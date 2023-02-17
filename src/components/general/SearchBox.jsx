import React from "react";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";

export default function SearchBox({ searchMenu, setSearchMenu }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const handleSearch = async () => {
    try {
      const data = await axiosInstance.get(`/blog/search?term=${searchTerm}`);
      setData(data.data);
      console.log(data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  function searchDebounce(callBack, delay) {
    let timer;
    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      if (searchTerm.length > 2) {
        setLoading(true);
        timer = setTimeout(() => {
          setLoading(false);
          callBack();
        }, delay);
      }
    };
  }

  const searchBlog = searchDebounce(handleSearch, 1000);

  return (
    <XyzTransition appear xyz="fade-75% up-2  ease-out-back">
      {searchMenu && (
        <div className="w-full backdrop-blur-sm absolute top-0 left-0 mx-auto bg-black bg-opacity-70 h-screen flex justify-center items-center flex-col text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute top-10 right-10 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            onClick={() => setSearchMenu(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div className="flex border-b-2  max-w-lg w-full mx-auto border-white justify-between items-center">
            <form onKeyUp={searchBlog} className="flex w-full">
              <input
                type="text"
                required
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full capitalize placeholder:text-white pr-2 py-1 focus:outline-none bg-transparent text-white"
                placeholder="search post...."
              />
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white cursor-pointer"
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
              </button>
            </form>
          </div>
          <div className="mt-4 space-y-3 max-h-[60vh] scrollbar-hide overflow-y-scroll w-full max-w-lg">
            {loading && "loading..."}
            {data?.map((item) => (
              <h3 key={item._id}>
                <Link
                  to={`/blog/${item._id}/${item.slug}`}
                  className="underline underline-offset-2 text-2xl"
                >
                  {item.title}
                </Link>
              </h3>
            ))}
            {data?.length < 0 && "no post found"}
          </div>
        </div>
      )}
    </XyzTransition>
  );
}
