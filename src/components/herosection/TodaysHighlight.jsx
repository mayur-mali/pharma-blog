import React, { useState } from "react";
import SectionsTitle from "../general/SectionsTitle";

export default function TodaysHighlight() {
  const [data, setdata] = useState([1, 2, 3, 4, 5]);
  return (
    <div>
      <SectionsTitle title="Today Highlights" />
      <div className="grid lg:grid-cols-4 mt-8 grid-cols-1 gap-5">
        {data.map((post, index) => (
          <div
            className="lg:col-span-2 col-span-1 flex md:flex-row flex-col text-black"
            key={index}
          >
            <div className="flex-none md:w-56 md:h-40 w-full h-48 rounded-xl bg-slate-300 mr-4"></div>
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
