import React from "react";
import { Link } from "react-router-dom";

export default function CreateNewPostBtn() {
  return (
    <Link
      to="/createpost"
      className=" rounded-full z-20 fixed sm:bottom-10 bottom-8 right-4 sm:right-10 bg-green-500 sm:px-6 px-4 py-2 sm:py-3"
    >
      <h2 className="sm:text-2xl  text-xl font-workSans capitalize text-white">
        create post
      </h2>
    </Link>
  );
}
