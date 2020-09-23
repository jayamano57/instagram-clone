import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import bigTuna from "../../media/jim-halpert.png";
import asst2regionalmngr from "../../media/dwight-schrute.png";
import nard_DOG from "../../media/nard-dog.png";
import michaelscarn007 from "../../media/michael-scarn.png";
import beeeeesly from "../../media/pam-beesly.png";
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
  const getLeftPosition = () => {
    const windowWidth = window.innerWidth;
    const containerWidth = 935;
    const containerGaps = windowWidth - containerWidth;
    const postWidth = 612;
    const marginLeft = 60.5;
    const newLeftPosition = containerGaps / 2 + postWidth + marginLeft;
    return newLeftPosition;
  };
  const updateSize = () => {
    const left = getLeftPosition();
    setLeftPosition(left);
  };

  const classes = useStyles();
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      username: "big-tuna",
      profilePic: bigTuna,
    },
    {
      id: 2,
      username: "michaelscarn007",
      profilePic: michaelscarn007,
    },
    {
      id: 3,
      username: "asst2regionalmngr",
      profilePic: asst2regionalmngr,
    },
    {
      id: 4,
      username: "beeeeesly",
      profilePic: beeeeesly,
    },
    {
      id: 5,
      username: "nard_DOG",
      profilePic: nard_DOG,
    },
  ]);
  const [leftPosition, setLeftPosition] = useState(getLeftPosition());
  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  });
  return (
    <section className="side-profile" style={{ left: `${leftPosition}px` }}>
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
        {suggestions.map((user) => {
          return (
            <div className="suggestion" key={user.id}>
              <Avatar
                className={classes["suggestion-avatar"]}
                src={user.profilePic}
              />
              <p
                className="text-strong"
                style={{
                  position: "relative",
                  top: "-2px",
                }}
              >
                {user.username}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SideProfile;
