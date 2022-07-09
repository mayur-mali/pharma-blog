import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SectionsTitle from "../general/SectionsTitle";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";
export default function MostRecentPost() {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [lastIndex, setLastIndex] = useState(9);
  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const data = await axios.get("/posts");
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
    //setLoading(true);
    const totalPost = postData.length;
    if (lastIndex <= totalPost) {
      setTimeout(() => {
        setContentLoading(false);
        setLastIndex(lastIndex + 3);
      }, 2000);
    }
  };

  return (
    <div>
      <SectionsTitle title="Most Recent Posts" />
      <div className="grid grid-cols-1 md:grid-cols-2 my-8 lg:grid-cols-6 gap-5">
        {loading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((post, i) => (
              <div
                className="col-span-1 animate-pulse space-y-3 lg:col-span-2"
                key={i}
              >
                <div className="bg-slate-400  h-48 rounded-xl"></div>
                <div className="bg-gray-300 h-2"></div>
                <div className="bg-gray-300 h-2"></div>
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
                className="group cursor-pointer"
              >
                <div className="col-span-1  space-y-3 lg:col-span-2">
                  <div className="bg-slate-200 h-48 rounded-xl overflow-hidden">
                    <img
                      src={post.photo}
                      alt={post.title}
                      className="w-full h-full transform transition duration-500 hover:scale-110 object-cover"
                    />
                  </div>
                  <h5 className="text-sm text-black">
                    Author @ {post.author.map((author) => author.name)}|
                    <span className="text-xs ml-1">
                      <span className="mr-1">Posted on</span>
                      {dayjs(post.createdAt).format("DD/MM/YYYY")} |
                      <span className="ml-1">
                        {dayjs(post.createdAt).fromNow()}
                      </span>
                    </span>
                  </h5>
                  <Link to={`/post/${post.slug}`}>
                    <h3 className="text-lg group-hover:text-gray-600 font-bold text-black capitalize line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                </div>
              </XyzTransition>
            ))}
          </>
        )}
      </div>
      <div className="w-full flex justify-center items-center">
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
              {lastIndex >= postData.length ? "No more post" : "See more post"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
