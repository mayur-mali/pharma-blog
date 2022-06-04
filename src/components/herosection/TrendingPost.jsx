import React, { useState } from "react";
import SectionsTitle from "../general/SectionsTitle";

export default function TrendingPost(props) {
  return (
    <>
      <SectionsTitle title="Trending post" />
      {props.data.map((post) => (
        <div className="flex text-black pb-2 flex-col pr-2 justify-between space-y-2 border-b-[1px] border-gray-300">
          <h3 className="text-lg font-bold capitalize  line-clamp-2">
            Here are a few tips that will help you to get started about
            lifestyle
          </h3>
          <h5 className="text-sm">Author @ {}</h5>
        </div>
      ))}
    </>
  );
}
