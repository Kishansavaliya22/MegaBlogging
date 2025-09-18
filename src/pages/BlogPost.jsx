import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appwriteDBService from "../appwrite/appwriteDBService";
import { Card } from "antd";

const BlogPost = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    appwriteDBService.listArticles([]).then((posts) => {
      if (posts) {
        setPost(posts);
      }
    });
  }, []);

  return (
    <div>
      {post?.map((post) => (
        <Link to={`/readblog/${post.$id}`}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src={appwriteDBService.getFilePreview(post.featuredimage)}
              />
            }
          >
            <Meta title={post.title} />
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default BlogPost;
