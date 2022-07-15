import React from "react";

export default function Discussion(props) {
  const [hideBtn, sethideBtn] = React.useState(false);
  return (
    <div className="border-t-2 px-2 my-8 py-2">
      <h1 className="text-2xl font-bold">Discussion</h1>
      <div className="flex space-x-3 mt-4">
        <img
          className="w-10 h-10 rounded-full"
          src={props.user.author.map((user) => user.imgurl)}
          alt={props.user.author.map((user) => user.name)}
        />
        <div className="space-y-2">
          <textarea
            name="discussion"
            className="w-full border overflow-hidden transition duration-300 p-2 border-gray-500 rounded-md focus:ring-1 ring-purple-700 focus:outline-none"
            placeholder="start discussion with author..."
            cols="70"
            onFocus={(e) => {
              e.target.style.height = "100px";
              sethideBtn(true);
            }}
            onKeyDown={(e) => {
              e.target.style.height = "inherit";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          ></textarea>
          {hideBtn && (
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg capitalize font-bold">
              submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
