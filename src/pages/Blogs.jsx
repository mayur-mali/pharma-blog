import React, { useContext } from "react";

import HeroSection from "../components/herosection/HeroSection";
import FeaturedPost from "../components/herosection/FeaturedPost";
import TodaysHighlight from "../components/herosection/TodaysHighlight";
import MostRecentPost from "../components/herosection/MostRecentPost";
import CreateNewPostBtn from "../components/general/CreateNewPostBtn";
import { AuthContext } from "../context/AuthContext";

export default function Blogs() {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <HeroSection />
      <div className="py-4 px-6 max-w-7xl mx-auto w-full">
        <FeaturedPost />
      </div>
      <div className="py-4 max-w-7xl mx-auto w-full">
        <MostRecentPost />
      </div>
      <div className="py-10 max-w-7xl px-6 mx-auto w-full">
        <TodaysHighlight />
      </div>
      {currentUser && <CreateNewPostBtn />}
    </>
  );
}
