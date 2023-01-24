import React from "react";

export default function ImageModal({ url, title, setOpenModal }) {
  return (
    <div className="h-screen md:p-4 p-2 fixed top-0 left-0 w-full bg-opacity-50 bg-black">
      <div className="min-h-screen h-full md:p-8 w-full">
        <span className="float-right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-white cursor-pointer"
            onClick={() => setOpenModal(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
        <img
          src={url}
          alt={title}
          className="h-full object-cover max-w-xl w-full mx-auto"
        />
      </div>
    </div>
  );
}
