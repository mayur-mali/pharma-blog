import { axiosInstance } from "../../config";
import dayjs from "dayjs";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SectionsTitle from "../general/SectionsTitle";
import EditPost from "../herosection/EditPost";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";
import { AuthContext } from "../../context/AuthContext";
export default function MostRecentPost() {
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  const { currentUser } = useContext(AuthContext);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPost, setEditPost] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [lastIndex, setLastIndex] = useState(9);
  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        // const data = await axiosInstance.get("/posts");
        const data1 = await axiosInstance.get("/blog");
        console.log(data1.data);
        setPostData(data1.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    getPost();
  }, []);

  const setEditPostData = async (data) => {
    console.log(data);
  };

  const deletePost = async (id) => {
    console.log(id, { userid: currentUser._id });
    // const user = currentUser._id;
    // try {
    //   await axiosInstance.delete(`/blog/${id}`, { data: { user } });
    //   setPostData(postData.filter((item) => item._id !== id));
    // } catch (error) {
    //   setLoading(false);
    // }
  };

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
              {postData?.map((post) => (
                <XyzTransition
                  appear
                  xyz="fade-75% down-5  ease-out-back"
                  key={post._id}
                >
                  <div className="col-span-1   bg-white shadow-md h-full rounded-lg overflow-hidden">
                    <div className="relative w-full  flex-none h-56">
                      {post.image && (
                        <>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </>
                      )}
                      {!post.image && (
                        <>
                          <img
                            src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt="{post.title}"
                            className="w-full grayscale h-full object-cover"
                          />
                        </>
                      )}
                      <div className="absolute flex flex-col justify-between px-4 top-0 left-0 w-full h-full bg-black bg-opacity-60">
                        <div className="flex mt-3 w-full justify-between">
                          {currentUser && (
                            <>
                              {currentUser?._id === post.user._id && (
                                <>
                                  <Link to={`/editpost/${post._id}`}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 cursor-pointer"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                      />
                                    </svg>
                                  </Link>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 cursor-pointer"
                                    onClick={() => deletePost(post._id)}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </>
                              )}
                            </>
                          )}
                        </div>

                        <div className="text-xs mb-3 space-x-2 ">
                          <span className="bg-white text-black rounded-md p-1.5">
                            #pharma
                          </span>
                          <span className="bg-white text-black rounded-md p-1.5">
                            #pharma
                          </span>

                          <h2 className="text-white mt-4 font-extrabold capitalize  md:text-xl text-lg overflow-hidden line-clamp-2">
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
                            src={post.user?.profilePic}
                            alt={post.title}
                          />
                          <div>
                            <h5 className="text-sm text-black capitalize">
                              {post.user?.username}
                            </h5>
                            <p className="text-xs text-gray-600">
                              {dayjs(post.createdAt).format("LL")}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Link to={`/blog/${post._id}/${post.slug}`}>
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
