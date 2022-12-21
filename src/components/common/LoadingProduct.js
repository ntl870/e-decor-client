import { Box, Grid, Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

export const LoadingProduct = () => {
  return (
    <Paper>
      <Box p={4} mt={4} mb={10}>
        <Grid container spacing={3} style={{ marginBottom: 16 }}>
          <Grid item xs={12} md={6}>
            <Skeleton width={"100%"} animation="wave" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton width={"100%"} animation="wave" />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Grid item xs={12} md={6} container spacing={3}>
            <Grid item xs={12} md={6} width="100%">
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height={150}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height={150}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} container spacing={3}>
            <Grid item xs={12} md={6} width="100%">
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height={150}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height={150}
              />
            </Grid>
          </Grid>
        </Grid>
        <Box my={4}>
          <Skeleton width={"100%"} animation="wave" />
          <Skeleton width={"100%"} animation="wave" />
          <Skeleton width={"60%"} animation="wave" />
        </Box>
      </Box>
    </Paper>
  );
};
