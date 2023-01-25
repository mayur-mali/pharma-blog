import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";
export default function AllPost() {
  //var relativeTime = require("dayjs/plugin/relativeTime");
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  //dayjs.extend(relativeTime);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [lastIndex, setLastIndex] = useState(6);
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
    <div className="max-w-7xl px-6  mx-auto w-full py-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((post, i) => (
              <div
                className="col-span-1   bg-slate-600 animate-pulse shadow-md h-full rounded-lg overflow-hidden"
                key={i}
              >
                <div className=" w-full  h-40"></div>
                <div className="h-56 w-full"></div>
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
                <div className="col-span-1   bg-white shadow-md h-full rounded-lg overflow-hidden">
                  <div className="relative w-full  flex-none h-48 ">
                    {post.photo && (
                      <img
                        src={post.photo}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {!post.photo && (
                      <>
                        <img
                          src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                          alt="{post.title}"
                          className="w-full grayscale h-full object-cover"
                        />
                        <h2 className="text-white p-4 backdrop-blur-[1px]	font-extrabold absolute capitalize inset-14  md:text-xl text-lg md:line-clamp-2">
                          {post.title}
                        </h2>
                      </>
                    )}
                  </div>
                  <div>
                    <div className="md:p-4 p-3 space-y-3 md:my-4">
                      <span className="text-blue-700 font-bold md:text-md text-sm capitalize">
                        cology
                      </span>
                      <h2 className="text-black hover:text-gray-500 md:text-xl text-lg font-bold md:line-clamp-2">
                        {post.title}
                      </h2>
                      <div>
                        <p className="text-gray-400 line-clamp-4">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quisquam sunt accusantium, expedita odio
                          inventore eaque hic! Temporibus quibusdam minus, earum
                          tenetur eligendi sed, saepe facilis placeat accusamus
                          aperiam quis impedit.
                        </p>
                      </div>
                    </div>
                    <div className="w-full  p-4">
                      <div className="flex space-x-4 items-start">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                          alt="fjlsjdflaj"
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
              {lastIndex >= postData.length ? "No more post" : "See more post"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
