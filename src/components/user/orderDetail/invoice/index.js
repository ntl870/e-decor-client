import { Box, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { orderSelector } from "redux/selectors";
import Infor from "./info";
import Products from "./products";
import Total from "./total";

export default function Invoice() {
  const { order } = useSelector(orderSelector);
  return (
    <Box>
      <Products order={order} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Infor order={order} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Total order={order} />
        </Grid>
      </Grid>
      <ToastContainer autoClose={1000} style={{ marginTop: "100px" }} />
    </Box>
  );
}
