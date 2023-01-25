import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import SectionsTitle from "../general/SectionsTitle";

export default function TodaysHighlight() {
  const [postData, setPostData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  // const [lastIndex, setLastIndex] = useState(9);
  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const data = await axiosInstance.get("/blog/views");
        setPostData(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    getPost();
  }, []);

  return (
    <>
      {postData.length > 0 && (
        <div>
          <SectionsTitle title="Today Highlights" />

          <div className="grid lg:grid-cols-4 mt-8 grid-cols-1 gap-5">
            {postData?.map((post) => (
              <div
                className="lg:col-span-2 col-span-1 flex md:flex-row  flex-col text-black"
                key={post._id}
              >
                <div className="flex-none md:w-56 md:h-40 w-full h-48 overflow-hidden  rounded-xl  mr-4">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                      alt={post.title}
                      className="object-cover h-full w-full"
                    />
                  )}
                </div>
                <div className="flex flex-col py-2 pr-2 justify-between space-y-2">
                  <Link to={`/blog/${post._id}/${post.slug}`}>
                    <h3 className="text-lg font-bold capitalize line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  {post.user && (
                    <h5 className="text-sm">Author @ {post.user.username}</h5>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
