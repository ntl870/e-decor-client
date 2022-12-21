import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "utils/helpers";

const PrivateRoute = ({ children, ...rest }) => {
  // Check if user is logged in
  // If yes, show route
  // Otherwise, redirect to login page

  const isLoggedIn = getToken();

  return (
    <Route
      {...rest}
      render={() => {
        return isLoggedIn ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
