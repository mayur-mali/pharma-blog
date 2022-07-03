import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Suneditor from "../components/editor/Suneditor";

import { AiOutlineDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import app from "../firebase";
import { RiImageAddLine } from "react-icons/ri";
export default function CreateNewPost() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [converImgurl, setConverImgurl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (file) {
      setLoading(true);
      const fileName = new Date().getTime() + "_" + file.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(StorageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          setLoading(false);
        },
        () => {
          setFile(null);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setLoading(false);
            setConverImgurl(downloadURL);
          });
        }
      );
    }
  }, [file]);

  // delete converImg

  const deleteCoverimg = () => {
    const storage = getStorage();
    const desertRef = ref(storage, converImgurl);
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        setConverImgurl(null);
        console.log(desertRef);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  return (
    <div className="w-full font-workSans bg-slate-900 min-h-screen h-auto py-3 relative">
      <div className="max-w-7xl p-4 mx-auto">
        <div className="space-x-8 flex items-center">
          <span>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
            </Link>
          </span>
        </div>
      </div>
      <div className="max-w-7xl px-4 mt-6 mx-auto">
        <div className="">
          {!converImgurl && (
            <>
              {loading ? (
                <div className="flex items-center space-x-4">
                  <AiOutlineLoading3Quarters className="text-white animate-spin text-2xl" />
                  <h3 className="text-white">Uploading...</h3>
                </div>
              ) : (
                <>
                  <label
                    className="px-4 py-2 flex border w-56 items-center justify-between cursor-pointer"
                    htmlFor="fileInput"
                  >
                    <h3 className="text-white">Add Cover Image</h3>
                    <RiImageAddLine className="text-3xl text-white" />
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </>
              )}
            </>
          )}
          {converImgurl && (
            <>
              <img
                src={converImgurl}
                alt="converImgurl"
                className="rounded-lg h-72  w-full object-cover"
              />
              <span className="text-white justify-center cursor-pointer flex space-x-4 items-center mt-4 border px-4 py-2 w-56 rounded-md">
                <h6>Remove Image..</h6>
                <AiOutlineDelete
                  className="text-3xl text-red-400"
                  onClick={deleteCoverimg}
                />
              </span>
            </>
          )}
        </div>

        <div className="my-8 flex md:flex-row flex-col items-center">
          <input
            type="text"
            name="postname"
            className="focus:outline-none bg-transparent text-white capitalize sm:text-5xl text-3xl md:w-3/4 w-full py-4"
            placeholder="Blog title here..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <Suneditor title={title} coverurl={converImgurl} />
        </div>
      </div>
    </div>
  );
}
