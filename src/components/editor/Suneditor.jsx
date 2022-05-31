import React, { useState } from "react";
// import CreateNewPostBtn from "../components/general/CreateNewPostBtn";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

export default function Suneditor(props) {
  const [content, setContent] = useState("");
  const [openTab, setOpenTab] = React.useState(1);
  const [loding, setLoding] = useState(false);
  const postsCollectionRef = collection(db, "posts");
  const handleOnChange = (editorContent) => setContent(editorContent);
  function createMarkup() {
    return { __html: content };
  }
  //console.log(content);
  const nevigate = useNavigate();
  const createPost = async () => {
    setLoding(true);
    const slug = slugify(props.title, { lower: true });
    try {
      await addDoc(postsCollectionRef, {
        title: props.title,
        slug,
        content,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
          imgurl: auth.currentUser.photoURL,
        },
        createAt: serverTimestamp(),
      });
      setTimeout(() => {
        setLoding(false);
      }, 3000).then(nevigate("/blogs"));
    } catch (error) {}
    //console.log("sent..", postsCollectionRef);
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
