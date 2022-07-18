import { axiosInstance } from "../../config";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
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
        </div>
        <Swiper
          spaceBetween={50}
          slidesPerView={2}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <div className="grid md:grid-cols-2 md:mt-12 mt-8 grid-cols-1 gap-x-10">
            {postData.slice(0, 8).map((post, index) => (
              <SwiperSlide key={index}>
                <div className="col-span-1">
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

                  <div className="flex text-black">
                    {!loading && (
                      <>
                        <div className=" relative  rounded-xl overflow-hidden">
                          <div className="w-full h-96 relative">
                            {post.photo && (
                              <>
                                <img
                                  src={post.photo}
                                  alt={post.title}
                                  className="w-full h-full   object-cover"
                                />
                                <h2 className="text-white p-4	font-extrabold absolute capitalize inset-14  md:text-xl text-lg md:line-clamp-2">
                                  {post.title}
                                </h2>
                              </>
                            )}
                            {!post.photo && (
                              <>
                                <img
                                  src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                  alt="{post.title}"
                                  className="w-full h-full  object-cover"
                                />
                                <h2 className="text-white p-4 backdrop-blur-[1px]	font-extrabold absolute capitalize inset-14  md:text-xl text-lg md:line-clamp-2">
                                  {post.title}
                                </h2>
                              </>
                            )}
                          </div>
                          <div className="absolute w-full flex justify-start items-end h-full top-0 bg-black bg-opacity-20">
                            <div className="bg-black p-4 bg-opacity-30 w-full h-40">
                              <h2 className="text-white 	font-extrabold  w-full capitalize  md:text-3xl text-lg md:line-clamp-2">
                                {post.title}
                              </h2>
                              <span className="text-slate-900">#pharmacy</span>
                            </div>
                          </div>
                        </div>
                        {/* 
                    <div className="flex flex-1 flex-col mt-5 py-2 pr-2 justify-between space-y-4">
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
                    */}
                      </>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
}
