import React from "react";
import useTitle from "../customhooks/useTitle";

export default function Blogs() {
  useTitle("blogs");

  return <div className="text-black">Blogs</div>;
}
