import React, { useState, useEffect } from "react";
import IGLogo from "../../media/instagram-logo-high-rez.png";
import Login from "./login";
import Signup from "./signup";
import { auth, db } from "./../../firebase";
import { useHistory } from "react-router-dom";

import useForm from "../../hooks/useForm";
const Landing = ({ login }) => {
  const history = useHistory();
  const formData = login
    ? { email: "", password: "" }
    : { email: "", fullName: "", username: "", password: "" };
  const [form, changeHandler] = useForm(formData);

  const signUp = (e) => {
    auth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((authUser) => {
        const { email, uid } = authUser.user;
        db.collection("users").add({
          email,
          uid,
          username: form.username,
          fullName: form.fullName,
        });
      })
      .catch((error) => alert(error.message));
  };

  const loginUser = (e) => {
    auth
      .signInWithEmailAndPassword(form.email, form.password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="Landing">
      <div className="landing-form-container">
        <img src={IGLogo} className="img-responsive" alt="Instagram Logo" />
        {login ? (
          <Login changeHandler={changeHandler} form={form} login={loginUser} />
        ) : (
          <Signup changeHandler={changeHandler} form={form} signUp={signUp} />
        )}
        <div className="separator">
          <div className="left-line" />
          <span className="or">OR</span>
          <div className="right-line" />
        </div>
        <div className="alternative-action">
          <p>{login ? `Don't have an account?` : `Have an account?`}</p>
          <button
            role="link"
            onClick={(e) => history.push(`/${login ? "signup" : "login"}`)}
          >
            {login ? `Sign up` : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
