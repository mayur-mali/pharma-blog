import React from "react";
import { Link } from "react-router-dom";

export default function CommingSoon() {
  return (
    <div className="flex h-screen flex-col w-full items-center justify-center">
      <h1 className="text-7xl font-extrabold tracking-wider text-gray-300 font-workSans">
        404 Coming Soon...
      </h1>
      <button className="px-4 py-2 bg-blue-100 rounded-md my-8 text-black font-workSans">
        <Link to="/">Return</Link>
      </button>
    </div>
  );
}
