import React, { useState, useEffect } from "react";
import PostsList from "./postsList";
import SideProfile from "./sideProfile";
import { db } from "./../../firebase";
import ImageUploadModal from "./imageUploadModal";

const Home = ({ open, handleClose, fullName, username }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // onSnapshot fires whenever a new document (post) gets added
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              post: doc.data(),
            };
          })
        );
      });
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
