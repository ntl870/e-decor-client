import { Box, Container, CssBaseline } from "@material-ui/core";
import Footer from "components/layout/Footer";
import React from "react";
import Header from "./Header";

const withBlogGuess = (Component) => (props) => {
  return (
    <>
      <CssBaseline />
      <Box
        style={{
          backgroundColor: "#0c0e30",
          zIndex: 1000,
          position: "fixed",
          width: "100%",
        }}
        mb={10}
      >
        <Container maxWidth="lg">
          <Header title="E-Decor Blog" />
        </Container>
      </Box>
      <Component />
      <Footer />
    </>
  );
};
export default withBlogGuess;
