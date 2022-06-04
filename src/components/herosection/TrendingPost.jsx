import React, { useState } from "react";
import SectionsTitle from "../general/SectionsTitle";

export default function TrendingPost(props) {
  return (
    <>
      <SectionsTitle title="Trending post" />

      {props.data.map((post, index) => (
        <div
          className="flex text-black py-8  pr-2  border-b-[1px] border-gray-300"
          key={index}
        >
          <div className="mr-4 text-lg font-bold text-gray-400">
            {index + 1}.
          </div>
          <div>
            <h3 className="text-lg font-bold capitalize  line-clamp-2">
              Here are a few tips that will help you to get started about
              lifestyle
            </h3>
            <h5 className="text-sm">Author @ {}</h5>
          </div>
        </div>
      ))}
    </>
  );
}
