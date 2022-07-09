import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import useTitle from "../customhooks/useTitle";
import Breadcrumbs from "../components/general/Breadcrumbs";
import Discussion from "../components/general/Discussion";
import dayjs from "dayjs";

export default function SingleBlog() {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  function createMarkup(content) {
    return { __html: content };
  }
  const { slug } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useTitle(slug);
  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await axios.get("/posts/" + slug);
        await axios.put("/posts/views/" + data.data[0]._id);
        setData(data.data);
        setLoading(false);
        //console.log(data.data[0]._id);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, [slug]);

  // useEffect(() => {
  //   const loading = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(loading);
  // }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center bg-white">
          <AiOutlineLoading3Quarters className="text-4xl  animate-spin" />
        </div>
      ) : (
        <div className="w-full min-h-full py-8 bg-[#f5f5f5]">
          <div className="max-w-6xl p-4 md:rounded-xl bg-white mx-auto w-full">
            <Breadcrumbs data={data} />
            <div className="grid lg:grid-cols-4 px-4 gap-6 grid-cols-1">
              <div className="lg:col-span-3 col-span-1 text-black ">
                {data.map((post) => (
                  <div key={post._id}>
                    <div className="w-full mb-4 h-80 relative">
                      <img
                        className="absolute object-cover w-full h-full rounded"
                        src={post.photo}
                        alt={post.title}
                      />
                    </div>
                    <div className="">
                      <div className="flex my-4 p-4 space-x-2">
                        <img
                          src={post.author.map((user) => user.imgurl)}
                          alt={post.author.map((user) => user.name)}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex flex-col">
                          <h2 className="text-sm ">
                            Author @
                            <span className="hover:text-blue-800 font-bold cursor-pointer">
                              {post.author.map((user) => user.name)}
                            </span>
                          </h2>
                          <span className="text-xs">
                            <span className="mr-1">Posted on</span>
                            {dayjs(post.createdAt).format("DD/MM/YYYY")} |
                            <span className="ml-1">
                              {dayjs(post.createdAt).fromNow()}
                            </span>
                          </span>
                        </div>
                      </div>
                      <h1 className="font-bold p-4 md:text-5xl text-3xl">
                        {post.title}
                      </h1>
                      <div
                        className="mt-8 sun-editor-editable md:!text-xl !text-lg !text-black !tracking-wide"
                        dangerouslySetInnerHTML={createMarkup(post.content)}
                      ></div>
                    </div>
                  </div>
                ))}
                {data.map((data) => (
                  <Discussion user={data} key={data._id} />
                ))}
              </div>
              <div className="bg-gray-100 sticky top-0 col-span-1 min-w-md w-full h-64"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
