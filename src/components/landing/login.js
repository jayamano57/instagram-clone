import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useForm from "../../hooks/useForm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingTop: "2.4rem",
    "& > *": {
      width: "100%",
    },
  },
  "login-password": {
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

const Login = ({ changeHandler, form, login }) => {
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <TextField
        id="login-email"
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
        id="login-password"
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
        onClick={login}
      >
        Log In
      </Button>
    </form>
  );
};

export default Login;
