import { axiosInstance } from "../../config";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SectionsTitle from "../general/SectionsTitle";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";
export default function MostRecentPost() {
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  //dayjs.extend(relativeTime);

  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [lastIndex, setLastIndex] = useState(9);
  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const data = await axiosInstance.get("/posts");
        setPostData(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    getPost();
  }, []);

  const seemorepost = () => {
    setContentLoading(true);

    const totalPost = postData.length;
    if (lastIndex <= totalPost) {
      setTimeout(() => {
        setContentLoading(false);
        setLastIndex(lastIndex + 3);
      }, 2000);
    }
  };

  return (
    <div className="px-6">
      <SectionsTitle title="Most Recent Posts" />
      <div className="max-w-7xl   mx-auto w-full py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((post, i) => (
                <div
                  className="col-span-1   bg-slate-600 animate-pulse shadow-md h-full rounded-lg overflow-hidden"
                  key={i}
                >
                  <div className=" w-full bg-gray-400 h-56"></div>
                  <div className="p-4 w-full flex justify-between items-center bg-gray-300">
                    <div className="flex space-x-4 items-start">
                      <div className="h-12 w-12 rounded-full bg-slate-400"></div>
                      <div className="flex h-10 flex-col justify-between">
                        <div className="w-24 bg-gray-400 h-2 "></div>
                        <div className="w-20 bg-gray-900 h-2"></div>
                      </div>
                    </div>
                    <div>
                      <div className="p-5 w-24 rounded-md bg-gray-500"></div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {postData.slice(0, lastIndex).map((post, index) => (
                <XyzTransition
                  appear
                  xyz="fade-75% down-5  ease-out-back"
                  key={index}
                >
                  <div className="col-span-1   bg-white shadow-md h-full rounded-lg overflow-hidden">
                    <div className="relative w-full  flex-none h-56">
                      {post.photo && (
                        <>
                          <img
                            src={post.photo}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </>
                      )}
                      {!post.photo && (
                        <>
                          <img
                            src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt="{post.title}"
                            className="w-full grayscale h-full object-cover"
                          />
                        </>
                      )}
                      <div className="absolute pt-28 px-4 top-0 left-0 w-full h-full bg-black bg-opacity-60">
                        <div className="text-xs mb-3 space-x-2 ">
                          <span className="bg-white text-black rounded-md p-1.5">
                            #pharma
                          </span>
                          <span className="bg-white text-black rounded-md p-1.5">
                            #pharma
                          </span>
                        </div>
                        <div>
                          <h2 className="text-white font-extrabold capitalize  md:text-xl text-lg overflow-hidden line-clamp-2">
                            {post.title}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="w-full flex justify-between items-center p-4">
                        <div className="flex space-x-4 items-start">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={post.author.map((user) => user.imgurl)}
                            alt={post.title}
                          />
                          <div>
                            <h5 className="text-sm text-black capitalize">
                              {post.author.map((author) => author.name)}
                            </h5>
                            <p className="text-xs text-gray-600">
                              {dayjs(post.createdAt).format("LL")}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Link to={`/post/${post.slug}`}>
                            <div className="px-2 py-1 rounded-md bg-blue-500 text-white">
                              Read more
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </XyzTransition>
              ))}
            </>
          )}
        </div>
        <div className="w-full flex justify-center mt-4 items-center">
          <button
            className={
              "rounded-3xl px-4 py-3  text-white" +
              (lastIndex >= postData.length
                ? " bg-red-600 "
                : " bg-blue-600 hover:bg-blue-500") +
              (loading && " hidden")
            }
            onClick={seemorepost}
            disabled={lastIndex >= postData.length}
          >
            {contentLoading ? (
              <div className="flex items-center space-x-4">
                <AiOutlineLoading3Quarters className="animate-spin text-white text-xl" />
                <span>Loading...</span>
              </div>
            ) : (
              <>
                {lastIndex >= postData.length
                  ? "No more post"
                  : "See more post"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
