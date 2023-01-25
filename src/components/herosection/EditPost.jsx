import { useRef, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import SunEditor from "suneditor-react";
import { useEffect } from "react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import app from "../../firebase";

export default function EditPost() {
  const { currentUser } = useContext(AuthContext);
  const nevigate = useNavigate();
  const [coverPic, setCoverPic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [getPostValues, setPostValue] = useState([]);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState(null);
  const { id } = useParams();
  const title = useRef();
  // const body = useRef();
  // const image = useRef();
  const handleOnChange = (editorContent) => setContent(editorContent);
  useEffect(() => {
    const getPost = async () => {
      try {
        const post = await axiosInstance.get(`/blog/${id}`);
        setPostValue(post.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);
  const editPost = async (e) => {
    e.preventDefault();

    try {
      const post = await axiosInstance.put(`/blog/${id}`, {
        user: currentUser._id,
        title: title.current.value,
        body: content,
        image: coverPic,
      });
      if (post.status === 200) {
        console.log(post);
        nevigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
            setCoverPic(downloadURL);
          });
        }
      );
    }
  }, [file]);

  const deleteCoverimg = () => {
    const storage = getStorage();
    const desertRef = ref(storage, coverPic);
    deleteObject(desertRef)
      .then(() => {
        setCoverPic(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="max-w-lg mx-auto w-full py-10 bg-white">
        <div className="py-8 bg-gray-50 text-black border rounded-lg w-full">
          <form
            className="flex  flex-col px-8 space-y-6"
            onSubmit={(e) => editPost(e)}
          >
            <input
              type="text"
              className="px-4 py-2 focus:outline-none border placeholder:capitalize"
              name="title"
              required
              ref={title}
              defaultValue={getPostValues.title}
              placeholder="title of post"
            />

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
            <div className="float-right">
              {coverPic ? (
                <span onClick={deleteCoverimg}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              ) : (
                <input
                  type="file"
                  name="product-img"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="block w-full text-sm cursor-pointer text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
                />
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 focus:outline-none border cursor-pointer bg-slate-700 text-white hover:bg-slate-900 transition-all duration-150 capitalize"
            >
              update post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
