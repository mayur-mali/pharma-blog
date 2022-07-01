import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumbs(props) {
  return (
    <>
      <div className="bg-white">
        <div className="py-8 px-4  lg:py-10">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <div>
                  <Link to="/" className="text-gray-400 hover:text-gray-500">
                    <svg
                      className="flex-shrink-0 h-5 w-5"
                      data-todo-x-description="Heroicon name: solid/home"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    <span className="sr-only">Home</span>
                  </Link>
                </div>
              </li>

              <li>
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                  </svg>
                  {props.data.map((data, index) => (
                    <h3
                      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      key={index}
                    >
                      {data.title}
                    </h3>
                  ))}
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </>
  );
}
