import React from "react";

export default function SectionsTitle(props) {
  return (
    <div className="text-black relative w-full border-b-2 py-3 border-gray-300">
      <span className="bg-black h-[2px] w-24 absolute -bottom-[2px]"></span>
      <h1 className="text-black text-2xl font-bold capitalize">
        {props.title}
      </h1>
    </div>
  );
}
