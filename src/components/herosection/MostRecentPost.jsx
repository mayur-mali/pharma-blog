import React from "react";
import SectionsTitle from "../general/SectionsTitle";

export default function MostRecentPost() {
  return (
    <div>
      <SectionsTitle title="Most Recent Posts" />
      <div className="grid grid-cols-1 md:grid-cols-2 my-8 lg:grid-cols-6 gap-5">
        <div className="col-span-1 space-y-3 lg:col-span-2">
          <div className="bg-slate-200 h-48 rounded-xl"></div>
          <h5 className="text-sm text-black">Author @ {}</h5>
          <h3 className="text-lg font-bold text-black capitalize line-clamp-2">
            Here are a few tips that will help you to get started about
            lifestyle
          </h3>
        </div>
        <div className="col-span-1 space-y-3 lg:col-span-2">
          <div className="bg-slate-200 h-48 rounded-xl"></div>
          <h5 className="text-sm text-black">Author @ {}</h5>
          <h3 className="text-lg font-bold text-black capitalize line-clamp-2">
            Here are a few tips that will help you to get started about
            lifestyle
          </h3>
        </div>
        <div className="col-span-1 space-y-3 lg:col-span-2">
          <div className="bg-slate-200 h-48 rounded-xl"></div>
          <h5 className="text-sm text-black">Author @ {}</h5>
          <h3 className="text-lg font-bold text-black capitalize line-clamp-2">
            Here are a few tips that will help you to get started about
            lifestyle
          </h3>
        </div>
        <div className="col-span-1 space-y-3 lg:col-span-2">
          <div className="bg-slate-200 h-48 rounded-xl"></div>
          <h5 className="text-sm text-black">Author @ {}</h5>
          <h3 className="text-lg font-bold text-black capitalize line-clamp-2">
            Here are a few tips that will help you to get started about
            lifestyle
          </h3>
        </div>
      </div>
    </div>
  );
}
