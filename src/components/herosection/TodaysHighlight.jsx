import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import SectionsTitle from "../general/SectionsTitle";

export default function TodaysHighlight() {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [lastIndex, setLastIndex] = useState(9);
  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const data = await axiosInstance.get("/posts/views/max");
        setPostData(data.data.post);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    getPost();
  }, []);
  console.log(postData);
  return (
    <>
      {postData.length > 0 && (
        <div>
          <SectionsTitle title="Today Highlights" />

          <div className="grid lg:grid-cols-4 mt-8 grid-cols-1 gap-5">
            {postData?.map((post, index) => (
              <div
                className="lg:col-span-2 col-span-1 flex md:flex-row flex-col text-black"
                key={index}
              >
                <div className="flex-none md:w-56 md:h-40 w-full h-48 rounded-xl bg-slate-300 mr-4"></div>
                <div className="flex flex-col py-2 pr-2 justify-between space-y-2">
                  <h3 className="text-lg font-bold capitalize line-clamp-2">
                    {post.title}
                  </h3>
                  <h5 className="text-sm">
                    Author @ {post.author.map((author) => author.name)}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
