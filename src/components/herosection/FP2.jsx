import React, { useState } from "react";
import SectionsTitle from "../general/SectionsTitle";
import dayjs from "dayjs";
export default function FP2() {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const [data, setdata] = useState([1, 2, 3, 4, 5]);
  return (
    <div>
      <h1 className="md:text-7xl text-3xl font-extrabold text-black">
        Featured Post
      </h1>
      <div className="grid md:grid-cols-8 md:mt-12 mt-8 grid-cols-1 gap-x-10">
        <div className="md:col-span-5 col-span-1">
          {data.slice(0, 1).map((post, index) => (
            <div className="flex flex-col  text-black" key={index}>
              <div className="flex-none  w-full md:h-96 sm:h-60 h-40 rounded-xl bg-slate-300 mr-4"></div>
              <div className="flex flex-col mt-5 py-2 pr-2 justify-between space-y-4">
                <h3 className="md:text-2xl sm:text-xl text-sm font-bold hover:text-gray-600 capitalize line-clamp-2">
                  Here are a few tips that will help you to get started about
                  lifestyle
                </h3>
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
                  Author @ {["mayur"].map((author) => author.name)} |
                  <span className="text-xs ml-1">
                    <span className="mr-1">Posted on</span>
                    {dayjs(post.createdAt).format("DD/MM/YYYY")} |
                    <span className="ml-1">
                      {dayjs(post.createdAt).fromNow()}
                    </span>
                  </span>
                </h5>
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-3 col-span-1 w-full space-y-4 py-2">
          {data.slice(1, 4).map((post, index) => (
            <div className="flex sm:flex-row flex-col text-black" key={index}>
              <div className="flex-none sm:w-40 w-full sm:h-28 h-40 rounded-xl bg-slate-300 mr-4"></div>
              <div className="flex w-full flex-col py-2 pr-2 justify-between space-y-2">
                <h3 className="sm:text-md text-sm font-bold capitalize line-clamp-2">
                  Here are a few tips that will help you to get started about
                  lifestyle
                </h3>
                <h5 className="sm:text-sm text-xs">Author @ {}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}