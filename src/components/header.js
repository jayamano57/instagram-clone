import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import IGLogo from "../media/instagram-header-logo.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { auth } from "./../firebase";

const useStyles = makeStyles((theme) => ({
  user: {
    width: "22px",
    marginLeft: "22px",
  },
  headerIcon: {
    height: "22px",
    width: "22px",
    marginLeft: "22px",
  },
}));

const Header = ({ handleOpen, username }) => {
  const classes = useStyles();
  return (
    <nav className="Header">
      <div className="header-inner container">
        <a href="/">
          <img src={IGLogo} alt="Instagram Logo" />
        </a>
        <div className="header-profile">
          <button title="upload" onClick={handleOpen}>
            <CameraAltIcon className={classes.headerIcon} />
          </button>
          <button title="logout" onClick={() => auth.signOut()}>
            <ExitToAppIcon className={classes.headerIcon} />
          </button>
          <Avatar
            className={classes.user}
            alt={`${username}'s profile picture`}
            src=""
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
