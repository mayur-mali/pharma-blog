import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { query, where, onSnapshot, collection } from "firebase/firestore";

//import { list } from "postcss";
export default function SingleBlog() {
  function createMarkup(content) {
    return { __html: content };
  }
  const { blogsId } = useParams();
  // const docRef =  doc(db, "cities", "SF");
  // const docSnap = getDoc(docRef);
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), where("slug", "==", blogsId));
    onSnapshot(q, (snap) => {
      if (!snap.empty) {
        const data = snap.docs[0].data();
        setData(data);
        //console.log(data);
      } else {
        console.log("No documents found with given slug");
      }
    });
  }, [blogsId]);

  return (
    <div>
      SingleBlog
      {data.title}
      <div dangerouslySetInnerHTML={createMarkup(data.content)}></div>
    </div>
  );
}
