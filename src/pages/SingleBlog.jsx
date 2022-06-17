import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import useTitle from "../customhooks/useTitle";
import Breadcrumbs from "../components/general/Breadcrumbs";
import Discussion from "../components/general/Discussion";
import dayjs from "dayjs";

//import { list } from "postcss";
export default function SingleBlog() {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const { currentUser } = useContext(AuthContext);
  function createMarkup(content) {
    return { __html: content };
  }
  const { slug } = useParams();

  const [data, setData] = useState([]);
  useTitle(slug);
  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await axios.get("/posts/" + slug);
        await axios.put("/posts/views/" + data.data[0]._id);
        setData(data.data);
        //console.log(data.data[0]._id);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, [slug]);

  // useEffect(() => {
  //   const updateViews = async () => {
  //     try {
  //       await axios.put("/posts/views/" + data[0]._id);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   updateViews();
  // }, [data]);

  return (
    <div className="w-full py-4 bg-gray-100">
      <div className="max-w-6xl rounded-md bg-white mx-auto w-full  ">
        <Breadcrumbs data={data} />
        <div className="grid lg:grid-cols-4 grid-cols-1">
          <div className="lg:col-span-3 px-4 col-span-1 text-black ">
            {data.map((post) => (
              <div key={post._id}>
                <div className="w-full mb-4 h-80 relative">
                  <img
                    className="absolute object-cover w-full h-full rounded"
                    src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                    alt={post.title}
                  />
                </div>
                <div className="">
                  <div className="flex my-4 p-4 space-x-2">
                    <img
                      src={currentUser.picture}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-sm ">
                        Author @{" "}
                        <span className="hover:text-blue-800 font-bold cursor-pointer">
                          {currentUser.name}
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
            <Discussion user={currentUser} />
          </div>
          <div className="bg-blue-300 sticky top-0 col-span-1 min-w-md w-full h-96"></div>
        </div>
      </div>
    </div>
  );
}
