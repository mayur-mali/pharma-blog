import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { FcLike, FcDislike } from "react-icons/fc";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { axiosInstance } from "../config";
import useTitle from "../customhooks/useTitle";
import Breadcrumbs from "../components/general/Breadcrumbs";
import dayjs from "dayjs";
import ImageModal from "../components/general/ImageModal";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SingleBlog() {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const { currentUser } = useContext(AuthContext);
  function createMarkup(content) {
    return { __html: content };
  }
  const { id, slug } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  useTitle(slug);
  useEffect(() => {
    setLoading(true);
    const getPost = async () => {
      try {
        const data = await axiosInstance.get(`/blog/${id}`);
        await axiosInstance.put("/blog/view/" + id);

        setData(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, [id, slug]);

  useEffect(() => {
    setLike(data.likes?.includes(currentUser._id));
  }, [like]);
  const imageModal = (url) => {
    setOpenModal(true);
  };

  console.log(data.likes?.includes(currentUser._id));
  //const likeToggle = () => {};
  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center bg-white">
          <AiOutlineLoading3Quarters className="text-4xl  animate-spin" />
        </div>
      ) : (
        <div className="w-full min-h-full pb-8 bg-[#f5f5f5]">
          <div className="max-w-6xl md:p-4 md:rounded-xl md:rounded-t-none bg-white mx-auto w-full">
            {<Breadcrumbs data={data} />}
            <div className="grid lg:grid-cols-4 gap-6 grid-cols-1">
              <div className="lg:col-span-3 col-span-1 text-black ">
                <div key={data._id}>
                  <div className="w-full mb-4 md:h-80 h-96 relative p-2">
                    {data.image && (
                      <>
                        <img
                          src={data.image}
                          alt={data.title}
                          onClick={() => imageModal(data.image)}
                          className="w-full cursor-pointer rounded-lg h-full object-cover shadow-2xl"
                        />
                      </>
                    )}
                    {!data.image && (
                      <>
                        <img
                          src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                          alt="{data.title}"
                          className="w-full grayscale h-full object-cover"
                        />
                      </>
                    )}
                    <div className="right-5 space-x-3 flex items-center justify-between -bottom-4 absolute">
                      <div className="p-3 rounded-full bg-white bg-opacity-90">
                        <FaShare className="text-xl text-gray-800" />
                      </div>
                      {currentUser?._id === data.user._id && (
                        <div className="p-3 rounded-full bg-white bg-opacity-90">
                          <Link to={`/editpost/${data._id}`}>
                            <FiEdit3 className="text-xl text-gray-800" />
                          </Link>
                        </div>
                      )}
                      <div
                        className="p-3 rounded-full cursor-pointer bg-white bg-opacity-90"
                        onClick={() => setLike(!like)}
                      >
                        {like ? (
                          <FcDislike
                            className="text-xl"
                            onClick={() => console.log("Dislike")}
                          />
                        ) : (
                          <FcLike
                            className="text-xl"
                            onClick={() =>
                              console.log(data.likes.includes(currentUser.id))
                            }
                          />
                        )}
                      </div>
                    </div>
                    <div className="absolute md:hidden block left-5 bg-opacity-70 top-4 p-2 bg-white rounded-full">
                      <Link to="/">
                        <MdOutlineKeyboardBackspace className="text-2xl" />
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h1 className="font-bold capitalize p-2 md:text-5xl text-3xl">
                      {data.title}
                    </h1>
                    <div className="flex my-1 p-4 items-center space-x-2">
                      <img
                        src={data.user?.profilePic}
                        alt={data.user?.profilePic}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <h2 className="text-sm ">
                          <span className="hover:text-blue-800 font-bold cursor-pointer">
                            {data.user?.username} |
                            {dayjs(data.createdAt).fromNow()}
                          </span>
                        </h2>
                      </div>
                    </div>

                    <div
                      className="mt-8 sun-editor-editable md:!text-xl !text-lg !text-black !tracking-wide"
                      dangerouslySetInnerHTML={createMarkup(data.body)}
                    ></div>
                    {/*<Discussion user={data} />*/}
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 space-y-4 sticky top-0 p-4 col-span-1 min-w-md w-full h-64">
                <div className="flex space-x-4 items-center">
                  <img
                    src={data.user.profilePic}
                    alt={data.title}
                    className="h-12 w-12 rounded-full"
                  />
                  <h3 className="text-xl uppercase font-bold">
                    {data.user.username} <br />
                    <span className="text-sm font-normal lowercase">
                      {data.user.email}
                    </span>
                  </h3>
                </div>
                <div className="flex justify-between items-center">
                  <span>followers: 0</span> <span>followings: 0</span>{" "}
                </div>
                <button className="px-4 py-2 text-white rounded-md border bg-blue-500">
                  Follow
                </button>
              </div>
            </div>
          </div>
          {openModal && (
            <ImageModal
              url={data.image}
              setOpenModal={setOpenModal}
              title={data.title}
            />
          )}
        </div>
      )}
    </>
  );
}
