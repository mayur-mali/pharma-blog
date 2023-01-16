import { useContext } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config";
import { AuthContext } from "../../context/AuthContext";

export default function EditPost() {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  const editPost = async (id) => {
    try {
      await axiosInstance.put(`/blog/${id}`, {
        user: currentUser._id,
        title: "updated via update page 1",
        body: "updated blog",
      });
      //console.log(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <div className="max-w-lg mx-auto w-full py-10 bg-white rounded-lg">
        <button
          className="px-4 py-2 text-black border"
          onClick={() => editPost(id)}
        >
          Edit Post
        </button>
      </div>
    </div>
  );
}
