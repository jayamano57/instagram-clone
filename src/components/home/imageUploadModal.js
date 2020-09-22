import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IGLogo from "../../media/instagram-logo-high-rez.png";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import firebase from "firebase";
import { storage, db } from "../../firebase";

const useStyles = makeStyles((theme) => ({
  "caption-input": {
    width: "100%",
  },
  input: {
    display: "none",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    maxWidth: "28rem",
    width: "28rem",
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    border: "1px solid #dbdbdb",
    borderRadius: "3px",
    padding: theme.spacing(2, 4, 3),
    "&:focus": {
      outline: "none",
    },
  },
  "image-chooser": {
    padding: "0",
    marginLeft: "16px",
  },
  "photo-icon": {
    fontSize: "24px",
    color: (props) => {
      return props.image ? `#0095f6` : `#848a8e`;
    },
  },
  "upload-btn": {
    marginTop: "5.4rem",
    marginBottom: "1rem",
    width: "100%",
    overflow: "hidden",
    "& .MuiButton-label": {
      zIndex: "5",
    },
    "&::before": {
      content: "''",
      display: "block",
      position: "absolute",
      top: "0",
      left: "0",
      zIndex: "1",
      height: "100%",
      width: (props) => `${props.progress}%`,
      backgroundColor: "#8fd3ff",
    },
  },
}));

const ImageUploadModal = ({ open, handleClose, username }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const classes = useStyles({ progress, image });

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    // access storage in firebase, create and get a reference to this folder (/images), image.name is the filename (image.png), then put this image here
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //keep giving me snapshots of the progress as it gets updated
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //error function
        console.log(error);
      },
      () => {
        //complete function - get the images path location reference in storage, get the image name, and get download link, then save to db
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post img inside the db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setCaption("");
            setImage(null);
            setProgress(0);
            handleClose();
          });
      }
    );
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <img
            src={IGLogo}
            className="img-responsive"
            alt="Instagram Logo"
            style={{ height: "4rem", marginBottom: "3rem" }}
          />
          <form style={{ width: "100%" }}>
            <div
              className="caption-image"
              style={{ display: "flex", alignItems: "flex-end" }}
            >
              <TextField
                id="caption"
                label="Caption"
                placeholder="Write your caption here..."
                multiline
                className={classes["caption-input"]}
                InputProps={{ style: { fontSize: 12 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
              />
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  className={classes["image-chooser"]}
                >
                  <PhotoCamera className={classes["photo-icon"]} />
                </IconButton>
              </label>
            </div>
            <Button
              variant="contained"
              className={classes["upload-btn"]}
              disableElevation
              onClick={handleUpload}
            >
              Post
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default ImageUploadModal;
