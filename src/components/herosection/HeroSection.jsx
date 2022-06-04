import React from "react";
import { Link } from "react-router-dom";
export default function HeroSection() {
  return (
    <div>
      <div className="w-full font-workSans py-8 px-4 space-y-6 mx-auto max-w-7xl">
        <div className="w-full flex flex-col space-y-4 items-center">
          <h1 className="md:text-5xl text-4xl font-bold dark:text-white text-blue-600">
            Welcome To
          </h1>
          <h2 className="md:text-6xl text-4xl font-bold dark:text-gray-300 text-indigo-900">
            <span className="text-indigo-400 dark:text-gray-600 mr-1">
              &ldquo;
            </span>
            The Pharma Blog
            <span className="text-indigo-400 dark:text-gray-600 ml-1">
              &rdquo;
            </span>
          </h2>
          <p className="w-72 md:text-xl text-base dark:text-gray-600 text-gray-500 text-center font-medium">
            Lorem ipsum dolor sit, amet consectetur adipisicing.
          </p>
        </div>
        <div className="max-w-md mx-auto text-black rounded-xl px-4 flex space-x-3 justify-between items-center shadow dark:bg-slate-700 bg-gray-200 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            onChange={(e) => console.log(e.target.value)}
            className="w-full py-1 focus:outline-none bg-transparent text-black"
            placeholder="search...."
          />
          <button className="md:px-6 px-4 py-1 md:py-2 dark:bg-white dark:text-black bg-blue-500 text-white font-bold rounded-xl">
            Go!
          </button>
        </div>
        <div className="max-w-5xl flex flex-col justify-center items-center space-y-9 w-full mx-auto">
          <h2 className="flex text-black items-center text-2xl text-center font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Find by categories
          </h2>
          <div className="flex flex-wrap justify-center">
            <Link
              to="#"
              className="px-6 bg-red-100 dark:bg-transparent dark:border dark:text-white dark:border-red-400 m-2 flex justify-center items-center text-red-800 rounded-xl py-3"
            >
              span
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              to="#"
              className="px-6 bg-indigo-100 dark:bg-transparent dark:border dark:text-white dark:border-indigo-400 m-2 flex justify-center items-center text-indigo-800 rounded-xl py-3"
            >
              span
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              to="#"
              className="px-6 bg-green-100 dark:bg-transparent dark:border dark:text-white dark:border-green-400 m-2 flex justify-center items-center text-green-800 rounded-xl py-3"
            >
              span
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              to="#"
              className="px-6 bg-gray-100 dark:bg-transparent dark:border dark:text-white dark:border-gray-400 m-2 flex justify-center items-center text-gray-800 rounded-xl py-3"
            >
              span
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              to="#"
              className="px-6 bg-yellow-100 dark:bg-transparent dark:border dark:text-white dark:border-yellow-400 m-2 flex justify-center items-center text-yellow-800 rounded-xl py-3"
            >
              span
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              to="#"
              className="px-6 bg-pink-100 dark:bg-transparent dark:border dark:text-white dark:border-pink-400 m-2 flex justify-center items-center text-pink-800 rounded-xl py-3"
            >
              span
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              to="#"
              className="px-6 bg-purple-100 dark:bg-transparent dark:border dark:text-white dark:border-purple-400 m-2 flex justify-center items-center text-purple-800 rounded-xl py-3"
            >
              span
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
