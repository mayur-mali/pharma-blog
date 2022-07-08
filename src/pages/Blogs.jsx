import React, { useContext } from "react";
import useTitle from "../customhooks/useTitle";
import SearchAndFilterSection from "../components/herosection/SearchAndFilterSection";
import FeaturedPost from "../components/herosection/FeaturedPost";
import TodaysHighlight from "../components/herosection/TodaysHighlight";
import MostRecentPost from "../components/herosection/MostRecentPost";
import CreateNewPostBtn from "../components/general/CreateNewPostBtn";
import { AuthContext } from "../context/AuthContext";

export default function Blogs() {
  useTitle("blogs");
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <SearchAndFilterSection />
      <div className="py-10 max-w-7xl px-6 mx-auto w-full">
        {/*<FeaturedPost />*/}
      </div>
      <div className="py-10 max-w-7xl px-6 mx-auto w-full">
        <TodaysHighlight />
      </div>
      <div className="py-10 px-6 max-w-7xl mx-auto w-full">
        <MostRecentPost />
      </div>
      {currentUser && <CreateNewPostBtn />}
    </>
  );
}
