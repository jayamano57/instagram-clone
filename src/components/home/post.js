import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../../firebase";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  "profile-avatar": {
    width: "32px",
    height: "32px",
  },
  heart: {
    height: "24px",
    width: "24px",
    marginBottom: "8px",
    marginLeft: "-3px",
  },
}));

const Comment = (comment) => {
  return (
    <p className="post-reply-group">
      <span className="text-strong">{comment.username}</span>
      <span className="post-reply-content">&nbsp; {comment.text}</span>
    </p>
  );
};

const Post = ({ postId, username, imageUrl, caption, signedInUser }) => {
  //hooks
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      // getting the comments for each post and adding event listener to hear for any new comments
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => {
              return { id: doc.id, data: doc.data() };
            })
          );
        });
    }
    return () => {
      unsubscribe();
    };
  }, []);

  const reply = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: signedInUser,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  return (
    <article className="post">
      <header className="post-header">
        <div className="post-header-profile-info">
          <Avatar
            className={classes["profile-avatar"]}
            alt={signedInUser}
            src=""
          />
          <div className="post-header-name text-strong">{username}</div>
        </div>
      </header>
      <img className="post-content" src={imageUrl} alt={`${username}'s post`} />
      <div className="post-caption">
        <FavoriteBorderIcon className={classes.heart} />
        <p className="post-likes text-strong">0 likes</p>
        <p className="post-caption-group">
          <span className="text-strong">{username}</span>
          <span className="post-caption-content">&nbsp; {caption}</span>
        </p>
        <div
          className="post-replies"
          style={{ display: comments.length ? "block" : "none" }}
        >
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                username={comment.data.username}
                text={comment.data.text}
              />
            );
          })}
        </div>
      </div>
      <div className="add-comment">
        <form>
          <input
            type="text"
            placeholder="Add a comment..."
            name="text"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></input>
          <button className="post-btn" onClick={reply}>
            Post
          </button>
        </form>
      </div>
    </article>
  );
};

export default Post;
