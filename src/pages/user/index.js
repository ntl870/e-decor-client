import { Container, Grid } from "@material-ui/core";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import Sidebar from "components/user/sidebar";
import React from "react";
import { Redirect } from "react-router-dom";
import { getToken } from "utils/helpers";
import { useStyles } from "./styles";
const withUser = (Component) => (props) => {
  const classes = useStyles();
  return getToken() ? (
    <>
      <Header />
      <Container className={classes.root}>
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12} lg={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} lg={9}>
            <Component />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  ) : (
    <Redirect to={"/"} />
  );
};
export default withUser;
