import React from "react";
import useTitle from "../customhooks/useTitle";

import SearchAndFilterSection from "../components/herosection/SearchAndFilterSection";
import FeaturedPost from "../components/herosection/FeaturedPost";
import TrendingPost from "../components/herosection/TrendingPost";
import TodaysHighlight from "../components/herosection/TodaysHighlight";

import MostRecentPost from "../components/herosection/MostRecentPost";
import CreateNewPostBtn from "../components/general/CreateNewPostBtn";
import { useEffect } from "react";

export default function Blogs() {
  useTitle("blogs");

  return (
    <>
      <SearchAndFilterSection />
      <div className="grid lg:grid-cols-12 px-6 grid-cols-1 gap-8 py-10 max-w-7xl mx-auto w-full">
        <div className="lg:col-span-9 col-span-1">
          <FeaturedPost />
        </div>
        <div className="lg:col-span-3  col-span-1">
          {/*<TrendingPost />*/}
          <div className="sticky top-0">
            <TrendingPost />
          </div>
        </div>
      </div>
      <div className="py-10 max-w-7xl px-6 mx-auto w-full">
        <TodaysHighlight />
      </div>
      <div className="py-10 px-6 max-w-7xl mx-auto w-full">
        <MostRecentPost />
      </div>
      <CreateNewPostBtn />
    </>
  );
}
