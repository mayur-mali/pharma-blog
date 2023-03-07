import React from "react";

export default function Tag(props) {
  return (
    <span className="bg-white text-black rounded-md p-1.5"># {props.tag}</span>
  );
}
