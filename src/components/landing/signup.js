import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingTop: "2.4rem",
    "& > *": {
      width: "100%",
    },
  },
  "signup-password": {
    marginTop: "2rem",
  },
  "login-btn": {
    marginTop: "2.4rem",
    fontSize: "1.4rem",
    textTransform: "none",
    backgroundColor: "#0095f6",
    color: "white",
    "&:hover": {
      backgroundColor: "#0095f6",
    },
  },
}));

const Login = ({ changeHandler, form, signUp }) => {
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <TextField
        id="signup-email"
        label="Email"
        type="email"
        variant="outlined"
        name="email"
        size="small"
        InputProps={{ style: { fontSize: 12 } }}
        InputLabelProps={{ style: { fontSize: 12 } }}
        onChange={changeHandler}
        value={form.email}
      />
      <TextField
        id="signup-fullname"
        label="Full Name"
        type="text"
        variant="outlined"
        size="small"
        name="fullName"
        InputProps={{ style: { fontSize: 12 } }}
        InputLabelProps={{ style: { fontSize: 12 } }}
        onChange={changeHandler}
        value={form.fullName}
      />
      <TextField
        id="signup-username"
        label="Username"
        type="text"
        variant="outlined"
        name="username"
        size="small"
        InputProps={{ style: { fontSize: 12 } }}
        InputLabelProps={{ style: { fontSize: 12 } }}
        onChange={changeHandler}
        value={form.username}
      />
      <TextField
        id="signup-password"
        label="Password"
        type="password"
        name="password"
        variant="outlined"
        size="small"
        InputProps={{ style: { fontSize: 12 } }}
        InputLabelProps={{ style: { fontSize: 12 } }}
        className={classes["login-password"]}
        onChange={changeHandler}
        value={form.password}
      />
      <Button
        className={classes["login-btn"]}
        variant="contained"
        disableElevation
        onClick={signUp}
      >
        Sign Up
      </Button>
    </form>
  );
};

export default Login;
