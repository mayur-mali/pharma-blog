import React, { useState } from "react";
import SectionsTitle from "../general/SectionsTitle";

export default function FeaturedPost(props) {
  //console.log(title);
  const [data, setdata] = useState([1, 2, 3, 4, 5, 6, 8, 6, 9]);
  return (
    <div>
      <SectionsTitle title="featured post" />
      <div className="grid lg:grid-cols-4 mt-8 grid-cols-1 gap-5">
        {data.map((post) => (
          <div
            className="lg:col-span-2 col-span-1 flex text-black"
            key={post.id}
          >
            <div className="flex-none w-36 h-36 rounded-xl bg-slate-300 mr-4"></div>
            <div className="flex flex-col py-2 pr-2 justify-between space-y-2">
              <h3 className="text-lg font-bold capitalize line-clamp-2">
                Here are a few tips that will help you to get started about
                lifestyle
              </h3>
              <h5 className="text-sm">Author @ {}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
