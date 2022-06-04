import React, { useEffect, useState } from "react";
import useTitle from "../customhooks/useTitle";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import HeroSection from "../components/herosection/HeroSection";
import FeaturedPost from "../components/herosection/FeaturedPost";
import TrendingPost from "../components/herosection/TrendingPost";
import TodaysHighlight from "../components/herosection/TodaysHighlight";
import SectionsTitle from "../components/general/SectionsTitle";
import MostRecentPost from "../components/herosection/MostRecentPost";

export default function Blogs() {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const data = [1, 23, 45, 13, 15, 46];
  var slugify = require("slugify");
  const [postData, setPostData] = useState([]);

  const [logding, setLoding] = useState(true);
  const postsCollectionRef = collection(db, "posts");
  // eslint-disable-next-line no-unused-vars
  function createMarkup(content) {
    return { __html: content };
  }
  useTitle("blogs");
  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setPostData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoding(false);
      } catch (error) {
        console.error(error);
        setLoding(false);
      }
    };
    getPost();
  }, [postsCollectionRef]);

  const handleDelete = async (id) => {
    setLoding(true);
    try {
      await deleteDoc(doc(db, "posts", id));
      setPostData(postData.filter((item) => item.id !== id));
      setLoding(false);
      //console.log(id);
    } catch (err) {
      setLoding(false);
      console.log(err);
    }
  };

  return (
    <>
      <HeroSection />
      <div className="grid lg:grid-cols-12 px-6 grid-cols-1 gap-8 py-10 max-w-7xl mx-auto w-full">
        <div className="lg:col-span-9 col-span-1">
          <FeaturedPost data={postData} />
        </div>
        <div className="lg:col-span-3  col-span-1">
          {/*<TrendingPost />*/}
          <div className="sticky top-0">
            <TrendingPost data={data} />
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
