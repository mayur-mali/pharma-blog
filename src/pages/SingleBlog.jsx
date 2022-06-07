import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import useTitle from "../customhooks/useTitle";

//import { list } from "postcss";
export default function SingleBlog() {
  function createMarkup(content) {
    return { __html: content };
  }
  const { slug } = useParams();

  const [data, setData] = useState([]);
  useTitle(slug);
  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await axios.get("/posts/" + slug);
        setData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, [slug]);

  return (
    <div>
      SingleBlog
      {data.map((post) => (
        <div key={post.id}>
          <h1 className="font-bold text-4xl">{post.title}</h1>
          <div className="mt-8">{post.content}</div>
        </div>
      ))}
      <div dangerouslySetInnerHTML={createMarkup(data.content)}></div>
    </div>
  );
}
