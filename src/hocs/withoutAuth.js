import { Container } from "@material-ui/core";
import Header from "components/auth/Header";
import React from "react";
import { Redirect } from "react-router-dom";
import { getToken } from "utils/helpers";

const withoutAuth = (Component) => (props) => {
  return getToken() ? (
    <Redirect to={"/"} />
  ) : (
    <>
      <Header />
      <Container
        style={{
          margin: "auto",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Component {...props} />
      </Container>
    </>
  );
};

export default withoutAuth;
