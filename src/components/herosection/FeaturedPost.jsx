import { axiosInstance } from "../../config";
import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import "swiper/css";
import { Navigation } from "swiper";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
export default function FeaturedPost() {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getPost = async () => {
      try {
        const data = await axiosInstance.get("/blog");
        setPostData(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    getPost();

    // return () => clearTimeout(load);
  }, []);
  return (
    <div>
      {!postData ? (
        ""
      ) : (
        <div>
          <div className="flex justify-between items-center pr-8">
            <h1 className="md:text-7xl text-3xl mb-4 font-extrabold text-black">
              Featured Post
            </h1>
          </div>
          <Swiper
            spaceBetween={50}
            modules={[Navigation]}
            breakpoints={{
              240: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 50,
              },
            }}
            navigation={{
              nextEl: ".next",
              prevEl: ".prev",
            }}
          >
            <div>
              {postData.slice(0, 8).map((post, index) => (
                <SwiperSlide key={index}>
                  <div>
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
                          <div className="relative flex-1  rounded-xl overflow-hidden">
                            <div className="w-full md:h-96 h-64 relative">
                              {post.image && (
                                <>
                                  <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full   object-cover"
                                  />
                                </>
                              )}
                              {!post.photo && (
                                <>
                                  <img
                                    src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                    alt="{post.title}"
                                    className="w-full h-full  object-cover"
                                  />
                                </>
                              )}
                            </div>
                            <div className="absolute w-full flex justify-start items-end h-full top-0 bg-black bg-opacity-20">
                              <div className="bg-black p-4 bg-opacity-30 w-full md:h-40 h-28">
                                <Link to={`/blog/${post._id}/${post.slug}`}>
                                  <h2 className="text-white 	font-extrabold  w-full capitalize  md:text-3xl text-lg md:line-clamp-2">
                                    {post.title}
                                  </h2>
                                </Link>
                                <span className="text-slate-900">
                                  #pharmacy
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
          <div className="flex justify-end text-3xl text-black mt-4 w-auto space-x-4 align-center">
            <div className="prev  px-6 cursor-pointer">
              <FaLongArrowAltLeft />
            </div>
            <div className="next  px-6 cursor-pointer">
              <FaLongArrowAltRight />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
