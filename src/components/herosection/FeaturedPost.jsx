import { axiosInstance } from "../../config";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
export default function FeaturedPost() {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
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

    //return () => clearTimeout(load);
  }, []);
  return (
    <div>
      <div>
        <div className="flex justify-between items-center pr-8">
          <h1 className="md:text-7xl text-3xl font-extrabold text-black">
            Featured Post
          </h1>
          <Link to="/allpost">
            <h3 className="md:text-3xl text-xl hover:text-blue-600 hover:underline font-extrabold text-black">
              All Post
            </h3>
          </Link>
        </div>
        <div className="grid md:grid-cols-8 md:mt-12 mt-8 grid-cols-1 gap-x-10">
          <div className="md:col-span-5 col-span-1">
            {loading && (
              <div>
                <div className="flex-none  animate-pulse w-full md:h-96 sm:h-60 h-40 rounded-xl bg-slate-900 mr-4"></div>
                <div className="flex flex-col mt-5 py-2 pr-2 justify-between space-y-4">
                  <div className="bg-gray-600 h-2 w-96"></div>
                  <div className="bg-gray-600 h-2 w-60"></div>
                  <div className="bg-gray-600 h-2 w-72"></div>
                </div>
              </div>
            )}
            {postData.slice(0, 1).map((post, index) => (
              <div className="flex flex-col group text-black" key={index}>
                {!loading && (
                  <>
                    <div className="flex-none overflow-hidden cursor-pointer w-full md:h-96 sm:h-60 h-40 rounded-xl border bg-slate-300 mr-4">
                      <img
                        src={post.photo}
                        alt={post.title}
                        className="w-full h-full transition duration-500 group-hover:scale-110 object-cover"
                      />
                    </div>
                    <div className="flex flex-col mt-5 py-2 pr-2 justify-between space-y-4">
                      <Link to={`/post/${post.slug}`}>
                        <h3 className="md:text-2xl sm:text-xl text-sm font-bold group-hover:text-gray-600 capitalize line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      <div>
                        <ul className="flex text-xs items-center space-x-4">
                          <li>
                            <span className="p-1 bg-opacity-25 bg-purple-600 rounded-md text-white mr-2">
                              #
                            </span>
                            pharmacy
                          </li>
                          <li>
                            <span className="p-1 bg-opacity-25 bg-purple-600 rounded-md text-white mr-2">
                              #
                            </span>
                            cogonocy
                          </li>
                          <li>
                            <span className="p-1 bg-opacity-25 bg-purple-600 rounded-md text-white mr-2">
                              #
                            </span>
                            cology
                          </li>
                          <li>
                            <span className="p-1 bg-opacity-25 bg-purple-600 rounded-md text-white mr-2">
                              #
                            </span>
                            pharma
                          </li>
                        </ul>
                      </div>

                      <h5 className="md:text-sm text-xs">
                        Author @ {post.author.map((author) => author.name)} |
                        <span className="text-xs ml-1">
                          <span className="mr-1">Posted on</span>
                          {dayjs(post.createdAt).format("DD/MM/YYYY")} |
                          <span className="ml-1">
                            {dayjs(post.createdAt).fromNow()}
                          </span>
                        </span>
                      </h5>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="md:col-span-3 col-span-1 w-full space-y-4 py-2">
            {loading && (
              <>
                {[1, 2, 3].map((item, index) => (
                  <div key={index} className="flex sm:flex-row flex-col">
                    <div className="flex-none animate-pulse sm:w-40 w-full sm:h-28 h-40 rounded-xl bg-slate-600 mr-4"></div>
                    <div className="flex w-full animate-pulse flex-col py-2 pr-2 justify-between space-y-2">
                      <div className="bg-gray-600 h-2 w-full"></div>
                      <div className="bg-gray-600 h-2 w-full"></div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {postData.slice(1, 4).map((post, index) => (
              <div
                className="flex group cursor-pointer sm:flex-row flex-col text-black"
                key={index}
              >
                {!loading && (
                  <>
                    <div className="flex-none sm:w-40 border  overflow-hidden w-full sm:h-28 h-40 rounded-xl bg-slate-300 mr-4">
                      <img
                        src={post.photo}
                        alt={post.title}
                        className="w-full h-full transition duration-500 group-hover:scale-110 object-cover"
                      />
                    </div>
                    <div className="flex w-full flex-col py-2 pr-2 justify-between space-y-2">
                      <Link to={`/post/${post.slug}`}>
                        <h3 className="sm:text-md text-sm group-hover:text-gray-600 font-bold capitalize line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      <h5 className="sm:text-sm text-xs">
                        Author @ {post.author.map((author) => author.name)} |
                        <span className="text-xs ml-1">
                          <span className="mr-1">Posted on</span>
                          {dayjs(post.createdAt).format("DD/MM/YYYY")} |
                          <span className="ml-1">
                            {dayjs(post.createdAt).fromNow()}
                          </span>
                        </span>
                      </h5>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
