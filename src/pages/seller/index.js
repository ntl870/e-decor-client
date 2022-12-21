import { Container, Grid } from "@material-ui/core";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import Sidebar from "components/seller/sidebar";
import React from "react";
import { useStyles } from "./styles";
const withSeller = (Component) => (props) => {
  const classes = useStyles();
  return (
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
  );
};
export default withSeller;
