import { Box, Container, CssBaseline, Grid } from "@material-ui/core";
import Footer from "components/layout/Footer";
import React from "react";
import { Redirect } from "react-router-dom";
import { getToken } from "utils/helpers";
import Dashboard from "./Dashboard";
import Header from "./Header";
import { useStyles } from "./styles";
const withBlog = (Component) => (props) => {
  const classes = useStyles();
  return getToken() ? (
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
      <Container maxWidth="lg" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <main>
          <Grid container spacing={3} className={classes.container}>
            <Grid item xs={12} lg={3}>
              <Dashboard />
            </Grid>
            <Grid item xs={12} lg={9}>
              <Component />
            </Grid>
          </Grid>
        </main>
      </Container>
      <Footer />
    </>
  ) : (
    <Redirect to={"/login"} />
  );
};
export default withBlog;
