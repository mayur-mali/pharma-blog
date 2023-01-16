import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { axiosInstance } from "../config";
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
  const { id, slug } = useParams();
  // console.log({ id, slug });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useTitle(slug);
  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await axiosInstance.get(`/blog/${id}`);
        await axiosInstance.put("/blog/view/" + id);
        console.log(data.data);
        setData(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, [id, slug]);

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
        <div className="w-full min-h-full pb-8 bg-[#f5f5f5]">
          <div className="max-w-6xl md:p-4 md:rounded-xl bg-white mx-auto w-full">
            {<Breadcrumbs data={data} />}
            <div className="grid lg:grid-cols-4 gap-6 grid-cols-1">
              <div className="lg:col-span-3 col-span-1 text-black ">
                <div key={data._id}>
                  <div className="w-full mb-4 md:h-80 h-96 relative p-2">
                    {data.image && (
                      <>
                        <img
                          src={data.image}
                          alt={data.title}
                          className="w-full rounded-lg h-full object-cover shadow-2xl"
                        />
                      </>
                    )}
                    {!data.image && (
                      <>
                        <img
                          src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                          alt="{data.title}"
                          className="w-full grayscale h-full object-cover"
                        />
                      </>
                    )}
                    <div className="right-5 w-[100px] flex items-center justify-between -bottom-4 absolute">
                      <div className="p-3 rounded-full bg-white bg-opacity-90">
                        <FaShare className="text-xl text-gray-800" />
                      </div>
                      <div className="p-3 rounded-full bg-white bg-opacity-90">
                        <FcLike className="text-xl" />
                      </div>
                    </div>
                    <div className="absolute md:hidden block left-5 bg-opacity-70 top-4 p-2 bg-white rounded-full">
                      <Link to="/">
                        <MdOutlineKeyboardBackspace className="text-2xl" />
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h1 className="font-bold capitalize p-2 md:text-5xl text-3xl">
                      {data.title}
                    </h1>
                    <div className="flex my-1 p-4 items-center space-x-2">
                      <img
                        src={data.user?.profilePic}
                        alt={data.user?.profilePic}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <h2 className="text-sm ">
                          <span className="hover:text-blue-800 font-bold cursor-pointer">
                            {data.user?.username} |
                            {dayjs(data.createdAt).fromNow()}
                          </span>
                        </h2>
                      </div>
                    </div>

                    <div
                      className="mt-8 sun-editor-editable md:!text-xl !text-lg !text-black !tracking-wide"
                      dangerouslySetInnerHTML={createMarkup(data.body)}
                    ></div>
                    {/*<Discussion user={data} />*/}
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 sticky top-0 col-span-1 min-w-md w-full h-64"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
