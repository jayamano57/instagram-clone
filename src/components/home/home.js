import React, { useState, useEffect } from "react";
import PostsList from "./postsList";
import SideProfile from "./sideProfile";
import { db } from "./../../firebase";
import ImageUploadModal from "./imageUploadModal";

const Home = ({ open, handleClose, fullName, username }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  console.log(open);
  useEffect(() => {
    let mounted = true;
    console.log(mounted);
    // onSnapshot fires whenever a new document (post) gets added
    if (mounted) {
      db.collection("posts").onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              post: doc.data(),
            };
          })
        );
      });
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="Home">
      <div className="container">
        <PostsList posts={posts} signedInUser={username} />
        <SideProfile fullName={fullName} username={username} />
      </div>
      <ImageUploadModal
        open={open}
        handleClose={handleClose}
        username={username}
      />
    </main>
  );
};

export default Home;
