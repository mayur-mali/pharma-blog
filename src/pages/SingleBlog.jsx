import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import useTitle from "../customhooks/useTitle";
import Breadcrumbs from "../components/general/Breadcrumbs";
import Discussion from "../components/general/Discussion";
import dayjs from "dayjs";

//import { list } from "postcss";
export default function SingleBlog() {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const { currentUser } = useContext(AuthContext);
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
    <div className="w-full  min-h-screen h-full">
      <div className="max-w-6xl lg:px-8 px-5 mx-auto w-full  ">
        <Breadcrumbs slug={slug} />
        <div className="grid lg:grid-cols-4 grid-cols-1">
          <div className="lg:col-span-3 col-span-1 text-black ">
            {data.map((post) => (
              <div key={post._id}>
                <div className="w-full mb-4 h-80 relative">
                  <img
                    className="absolute object-cover w-full h-full rounded"
                    src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                    alt={post.title}
                  />
                </div>
                <div className="px-8 ">
                  <div className="flex my-4 space-x-2">
                    <img
                      src={currentUser.picture}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-sm ">
                        Author @{" "}
                        <span className="hover:text-blue-800 font-bold cursor-pointer">
                          {currentUser.name}
                        </span>
                      </h2>
                      <span className="text-xs">
                        <span className="mr-1">Posted on</span>
                        {dayjs(post.createdAt).format("DD/MM/YYYY")} |
                        <span className="ml-1">
                          {dayjs(post.createdAt).fromNow()}
                        </span>
                      </span>
                    </div>
                  </div>
                  <h1 className="font-bold text-4xl">{post.title}</h1>
                  <div className="mt-8">{post.content}</div>
                  <p>
                    molestias repellendus quae possimus quia facere natus fuga
                    cumque quam sit eveniet voluptatem. Reprehenderit earum
                    molestias, a nostrum vitae at consequuntur illum accusantium
                    porro delectus cupiditate, corporis doloremque? Sequi
                    quisquam asperiores possimus, assumenda vitae odit amet?
                    Repudiandae excepturi iure amet laudantium non voluptates
                    provident? Vitae, ipsam totam molestiae pariatur distinctio
                    suscipit cupiditate optio accusantium blanditiis sequi ipsa
                    alias veniam. Provident magni rem fugit quibusdam quas odio
                    voluptatem, magnam odit, atque repudiandae excepturi
                    distinctio totam aliquid? Inventore illum vitae atque saepe
                    et! Mollitia obcaecati, temporibus inventore magnam, quo
                    accusamus at similique adipisci voluptates illo reiciendis
                    dolores. Eius facilis quibusdam porro beatae necessitatibus
                    est! Perferendis id ea libero laboriosam culpa dignissimos
                    veniam illo quam perspiciatis eveniet! Voluptatem modi
                    reprehenderit blanditiis, vel sit asperiores voluptates
                    beatae nemo quia numquam consequatur reiciendis magni
                    corrupti obcaecati eos maiores unde labore a, quis libero
                    dolores aliquid illo recusandae! Tempore, aliquam iure eum
                    architecto mollitia ullam saepe esse! Quaerat incidunt ipsam
                    minus voluptates accusamus. Impedit, velit accusantium
                    quisquam vitae perspiciatis laborum id, eveniet, quae vel
                    veritatis nisi. Excepturi voluptatum, numquam reprehenderit
                    et magnam veniam illo quam perspiciatis eveniet! Voluptatem
                    modi reprehenderit blanditiis, vel sit asperiores voluptates
                    beatae nemo quia numquam consequatur reiciendis magni
                    corrupti obcaecati eos maiores unde labore a, quis libero
                    dolores aliquid illo recusandae! Tempore, aliquam iure eum
                    architecto mollitia ullam saepe esse! Quaerat incidunt ipsam
                    minus voluptates accusamus. Impedit, velit accusantium
                    quisquam vitae perspiciatis laborum id, eveniet, quae vel
                    veritatis nisi. Excepturi voluptatum, numquam reprehenderit
                    et magnam eveniet ab.{" "}
                  </p>
                </div>
              </div>
            ))}
            <Discussion user={currentUser} />
            <div dangerouslySetInnerHTML={createMarkup(data.content)}></div>
          </div>
          <div className="bg-blue-300 sticky top-0 col-span-1 min-w-md w-full lg:ml-4 h-96"></div>
        </div>
      </div>
    </div>
  );
}
