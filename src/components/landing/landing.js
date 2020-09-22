import React, { useState, useEffect } from "react";
import IGLogo from "../../media/instagram-logo-high-rez.png";
import Login from "./login";
import Signup from "./signup";
import { auth, db } from "./../../firebase";
import { useHistory } from "react-router-dom";

import useForm from "../../hooks/useForm";
const Landing = ({ login, user, setUser }) => {
  const history = useHistory();
  const formData = login
    ? { email: "", password: "" }
    : { email: "", fullName: "", username: "", password: "" };
  const [form, changeHandler] = useForm(formData);

  //   useEffect(() => {
  //     // will listen for any single time an authentication change happens (log in, log out, sign up)
  //     // even though state is not persistent, this method keeps us logged in because of cookie tracking
  //     const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //       if (authUser) {
  //         console.log(authUser);
  //         setUser(authUser);
  //       } else {
  //         setUser(null);
  //       }
  //     });

  //     return () => {
  //       //perform some cleanup before useEffect runs/ detach listener, then rerun to avoid duplicate event listeners
  //       unsubscribe();
  //     };
  //   }, [user, form.username]);

  const signUp = (e) => {
    auth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((authUser) => {
        // return authUser.user.updateProfile({
        //   displayName: form.username,
        //   photoURL: form.fullName,
        // })
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
      .then((authUser) => {
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
