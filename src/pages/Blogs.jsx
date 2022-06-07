import React, { useEffect, useState } from "react";
import useTitle from "../customhooks/useTitle";

import dayjs from "dayjs";
import HeroSection from "../components/herosection/HeroSection";
import FeaturedPost from "../components/herosection/FeaturedPost";
import TrendingPost from "../components/herosection/TrendingPost";
import TodaysHighlight from "../components/herosection/TodaysHighlight";

import MostRecentPost from "../components/herosection/MostRecentPost";

export default function Blogs() {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  // eslint-disable-next-line no-unused-vars
  function createMarkup(content) {
    return { __html: content };
  }
  useTitle("blogs");

  return (
    <>
      <HeroSection />
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
    </>
  );
}
