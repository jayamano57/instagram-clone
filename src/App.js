import React, { useEffect, useState } from "react";
import PrivateRoute from "./components/privateRoute";
import Header from "./components/header";
import Home from "./components/home/home";
import Landing from "./components/landing/landing";
import "./App.scss";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import instagramLogoSmall from "./media/small-instagram-logo.png";
import { auth, db } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  // have to wait until firebase initializes, otherwise, the auth will be delayed an will have user set as null
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  useEffect(() => {
    console.log("hit");

    // will listen for any single time an authentication change happens (log in, log out, sign up)
    // even though state is not persistent, this method keeps us logged in because of cookie tracking
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      setFirebaseInitialized(true);
      if (authUser) {
        const userDoc = await db
          .collection("users")
          .where("uid", "==", authUser.uid)
          .get();
        setUser(userDoc.docs[0].data());
      } else {
        setUser(null);
      }
    });

    return () => {
      //perform some cleanup before useEffect runs/ detach listener, then rerun to avoid duplicate event listeners
      unsubscribe();
    };
  }, []);
  // }, [user, form.username]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (firebaseInitialized) {
    return (
      <Router>
        <PrivateRoute exact path="/">
          <Header handleOpen={handleOpen} />
          <Home
            open={open}
            handleClose={handleClose}
            username={user?.username}
            fullName={user?.fullName}
          />
        </PrivateRoute>
        <Route path="/login">
          {!user ? (
            <Landing login={true} user={user} setUser={setUser} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/signup">
          {!user ? (
            <Landing login={false} user={user} setUser={setUser} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
      </Router>
    );
  }

  return (
    <div className="loading">
      <img src={instagramLogoSmall} alt="Instagram logo" />
    </div>
  );
}

export default App;
