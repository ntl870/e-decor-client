import { Box, Grid, Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

export const LoadingProductDetail = () => {
  return (
    <Paper>
      <Box p={6} mt={2} mb={10}>
        <Grid container spacing={4} style={{ marginBottom: 16 }}>
          <Grid item xs={12} md={6}>
            <Box m={2}>
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height={400}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box m={2}>
              <Skeleton width={"100%"} animation="wave" />
            </Box>
            <Box m={2}>
              <Skeleton width={"100%"} animation="wave" />
            </Box>
            <Box m={2}>
              <Skeleton width={"100%"} animation="wave" />
            </Box>
            <Box m={2}>
              <Skeleton width={"60%"} animation="wave" />
            </Box>
          </Grid>
        </Grid>
        {/* <Grid
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
        </Box> */}
      </Box>
    </Paper>
  );
};
