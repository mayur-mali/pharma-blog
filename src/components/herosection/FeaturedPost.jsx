import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SectionsTitle from "../general/SectionsTitle";
import dayjs from "dayjs";
export default function FeaturedPost() {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const load = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const getPost = async () => {
      try {
        const data = await axios.get("/posts");
        setPostData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();

    return () => clearTimeout(load);
  }, []);
  return (
    <div>
      <SectionsTitle title="featured post" />
      <div className="grid lg:grid-cols-4 mt-8 grid-cols-1 gap-5">
        {postData.map((post, index) => (
          <div className="lg:col-span-2 col-span-1 flex text-black" key={index}>
            {loading ? (
              <div className="animate-pulse flex w-full">
                <div className="flex-none  w-28 h-28 md:w-36 md:h-36 rounded-xl bg-slate-600 mr-4"></div>
                <div className="flex w-full flex-col py-2 pr-2 justify-between space-y-2">
                  <div className="bg-slate-700 h-4 w-full"></div>
                  <div className="w-28 h-2 bg-slate-400"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-none w-28 h-28 md:w-36 md:h-36 rounded-xl bg-slate-300 mr-4"></div>
                <div className="flex flex-col py-2 pr-2 justify-between space-y-2">
                  <Link to={`/post/${post.slug}`}>
                    <h3 className="md:text-lg text-sm font-bold capitalize line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <h5 className="md:text-sm text-xs">
                    Author @ {post.username}
                  </h5>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
