import React from "react";
import { isAuthenticated } from "../utils";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  console.log(isAuthenticated());
  const { exact, path } = { ...rest };
  return (
    <Route
      // ... rest are the props in PrivateRoute (exact, path). setting those props here
      exact={exact}
      path={path}
      render={() =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
