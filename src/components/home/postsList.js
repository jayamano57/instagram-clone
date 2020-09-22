import React from "react";
import Post from "./post";

const PostsList = ({ posts, signedInUser }) => {
  return (
    <section className="posts-list">
      {posts.map(({ id, post: { username, imageUrl, caption } }) => {
        return (
          <Post
            key={id}
            username={username}
            imageUrl={imageUrl}
            caption={caption}
            postId={id}
            signedInUser={signedInUser}
          />
        );
      })}
    </section>
  );
};

export default PostsList;
