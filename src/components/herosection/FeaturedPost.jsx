import React, { useState } from "react";
import SectionsTitle from "../general/SectionsTitle";

export default function FeaturedPost(props) {
  //console.log(title);
  const [data, setdata] = useState([1, 2, 3, 4, 5, 6, 8, 6, 9, 10, 14, 65]);
  return (
    <div>
      <SectionsTitle title="featured post" />
      <div className="grid lg:grid-cols-4 mt-8 grid-cols-1 gap-5">
        {data.map((post, index) => (
          <div className="lg:col-span-2 col-span-1 flex text-black" key={index}>
            <div className="flex-none w-28 h-28 md:w-36 md:h-36 rounded-xl bg-slate-300 mr-4"></div>
            <div className="flex flex-col py-2 pr-2 justify-between space-y-2">
              <h3 className="md:text-lg text-sm font-bold capitalize line-clamp-2">
                Here are a few tips that will help you to get started about
                lifestyle
              </h3>
              <h5 className="md:text-sm text-xs">Author @ {}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
