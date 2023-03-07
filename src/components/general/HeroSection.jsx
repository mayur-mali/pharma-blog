import React, { useContext } from "react";
import useTitle from "../../customhooks/useTitle";
import heroimg from "../../static/assets/svg/flame-787.png";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

export default function HeroSection() {
  const { currentUser } = useContext(AuthContext);

  useTitle("welcome to pharmacy blog");

  return (
    <div className="h-full  flex justify-center flex-col items-center">
      <img src={heroimg} alt="hero" className="" />
      <main className="mx-auto max-w-7xl px-4 ">
        <div className="text-center">
          <h1 className="text-4xl  tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline underline-offset-2 underline">
              The Pharma
            </span>

            <span className="block text-indigo-600 ml-4 xl:inline underline-offset-2 underline">
              Bloggers
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          {currentUser ? (
            <div className="mt-4">
              <h1 className="text-black sm:text-lg md:text-5xl font-bold">
                <span className="text-indigo-600 mr-2">Welcome !</span>
                {currentUser.username}
              </h1>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <Link to="/blogs" className="bg-black px-4 py-2 rounded-xl">
                  Go to blogs
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow"></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
