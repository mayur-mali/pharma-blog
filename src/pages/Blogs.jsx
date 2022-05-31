import React, { useEffect, useState } from "react";
import useTitle from "../customhooks/useTitle";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function Blogs() {
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
    <div className="text-black">
      Blogs
      {logding ? (
        <p>loding...........</p>
      ) : (
        <div>
          {postData.map((post) => (
            <div key={post.id}>
              <Link to={slugify(post.title, { lower: true })}>
                {post.title}
              </Link>
              <div onClick={() => handleDelete(post.id)}>X</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line no-lone-blocks
{
  /*<div
            className="p-6 mt-4"
            dangerouslySetInnerHTML={createMarkup(post.content)}
            key={post.id}
          ></div>*/
}
