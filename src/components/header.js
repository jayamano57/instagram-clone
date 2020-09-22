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

const Header = ({ handleOpen }) => {
  const classes = useStyles();
  return (
    <nav className="Header">
      <div className="header-inner container">
        <a href="/">
          <img src={IGLogo} className="img-responsive" alt="Instagram Logo" />
        </a>
        <div className="header-profile">
          <button title="upload" onClick={handleOpen}>
            <CameraAltIcon className={classes.headerIcon} />
          </button>
          <button title="logout" onClick={() => auth.signOut()}>
            <ExitToAppIcon className={classes.headerIcon} />
          </button>
          <Avatar className={classes.user} alt="Remy Sharp" src="" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
