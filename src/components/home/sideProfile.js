import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
const useStyles = makeStyles((theme) => ({
  "side-avatar": {
    height: "56px",
    width: "56px",
  },
  "suggestion-avatar": {
    height: "32px",
    width: "32px",
    marginRight: "1.2rem",
  },
}));
const SideProfile = ({ username, fullName }) => {
  const classes = useStyles();
  return (
    <section className="side-profile">
      <div className="side-profile-me">
        <Avatar className={classes["side-avatar"]} />
        <div className="side-profile-names">
          <p className="text-strong" style={{ marginBottom: "4px" }}>
            {username}
          </p>
          <p style={{ fontSize: "12px", color: "#8e8e8e" }}>{fullName}</p>
        </div>
      </div>
      <div className="suggestions-for-me">
        <div
          className="text-strong"
          style={{ color: "#8e8e8e", marginBottom: "8px" }}
        >
          Suggestions For You
        </div>
        <div className="suggestion">
          <Avatar className={classes["suggestion-avatar"]} />
          <p
            className="text-strong"
            style={{
              position: "relative",
              top: "-2px",
            }}
          >
            mscott69
          </p>
        </div>
        <div className="suggestion">
          <Avatar className={classes["suggestion-avatar"]} />
          <p
            className="text-strong"
            style={{
              position: "relative",
              top: "-2px",
            }}
          >
            mscott69
          </p>
        </div>
        <div className="suggestion">
          <Avatar className={classes["suggestion-avatar"]} />
          <p
            className="text-strong"
            style={{
              position: "relative",
              top: "-2px",
            }}
          >
            mscott69
          </p>
        </div>
        <div className="suggestion">
          <Avatar className={classes["suggestion-avatar"]} />
          <p
            className="text-strong"
            style={{
              position: "relative",
              top: "-2px",
            }}
          >
            mscott69
          </p>
        </div>
        <div className="suggestion">
          <Avatar className={classes["suggestion-avatar"]} />
          <p
            className="text-strong"
            style={{
              position: "relative",
              top: "-2px",
            }}
          >
            mscott69
          </p>
        </div>
      </div>
    </section>
  );
};

export default SideProfile;
