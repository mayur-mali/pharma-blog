import React, { useState } from "react";
// import CreateNewPostBtn from "../components/general/CreateNewPostBtn";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Suneditor(props) {
  const [content, setContent] = useState("");

  const [openTab, setOpenTab] = React.useState(1);
  const [loding, setLoding] = useState(false);

  const handleOnChange = (editorContent) => setContent(editorContent);
  function createMarkup() {
    return { __html: content };
  }
  //console.log(content);
  const nevigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const createPost = async () => {
    // const fileName = new Date().getTime() + props.coverPhoto.name;
    // const storage = getStorage(app);
    // const StorageRef = ref(storage, fileName);
    // const uploadTask = uploadBytesResumable(StorageRef, props.coverPhoto);
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //     switch (snapshot.state) {
    //       case "paused":
    //         console.log("Upload is paused");
    //         break;
    //       case "running":
    //         console.log("Upload is running");
    //         break;
    //       default:
    //     }
    //   },
    //   (error) => {
    //     // Handle unsuccessful uploads
    //   },
    //   () => {
    //     // Handle successful uploads on complete
    //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       console.log("File available at", downloadURL);
    //     });
    //   }
    // );
    // setLoding(true);
    // try {
    //   await axios.post("/posts/", {
    //     title: props.title,
    //     content,
    //     author: {
    //       name: currentUser.name,
    //       imgurl: currentUser.picture,
    //     },
    //   });
    //   setTimeout(() => {
    //     setLoding(false);
    //     nevigate("/");
    //   }, 2000);
    // } catch (error) {}
  };
  return (
    <>
      <div className="my-5 text-right space-x-3">
        <span
          className="px-4 py-2 bg-gray-600 rounded-lg cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setOpenTab(1);
          }}
          data-toggle="tab"
          href="#link1"
          role="tablist"
        >
          edit
        </span>
        <span
          className="px-4 py-2 bg-gray-600 rounded-lg cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setOpenTab(2);
          }}
          data-toggle="tab"
          href="#link2"
          role="tablist"
        >
          preview
        </span>
      </div>
      <div className={openTab === 1 ? "block" : "hidden"}>
        <SunEditor
          setDefaultStyle="font-size: 30px;"
          placeholder="write your post content here..."
          onChange={handleOnChange}
          setOptions={{
            height: "auto",
            minHeight: "400",
            buttonList: [
              ["paragraphStyle", "blockquote"],
              ["font", "fontSize", "formatBlock"],
              ["fontColor", "hiliteColor", "textStyle"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
              ],
              ["removeFormat"],
              ["table", "link", "image", "video", "audio"],
            ],
          }}
        />
      </div>
      <div className={openTab === 2 ? "block" : "hidden"}>
        <div className="mt-5 p-5 text-black bg-white sm:text-5xl text-3xl  capitalize">
          Title: {props.title}
        </div>
        <div
          className="mt-5 p-5 text-black bg-white sun-editor-editable"
          dangerouslySetInnerHTML={createMarkup()}
        ></div>
      </div>

      <div className="md:w-1/3 w-full my-10 h-full">
        {content.length > 20 && (
          <button
            className="px-4 py-2 md:w-56 w-full text-white bg-green-500 font-bold"
            onClick={() => createPost()}
          >
            {loding ? <span>posting...</span> : <span> publish</span>}
          </button>
        )}
      </div>
    </>
  );
}
