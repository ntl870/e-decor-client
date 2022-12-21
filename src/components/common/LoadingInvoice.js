import { Box, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
const useStyles = makeStyles((theme) => ({}));
export const LoadingInvoice = () => {
  const classes = useStyles();

  return (
    <Box mb={6}>
      <Paper>
        <Box display="flex" flexDirection="column" p={4} mb={2}>
          <Box mb={2} display="flex" className={classes.head}>
            <Skeleton width={"100%"} animation="wave" />
          </Box>
          <Box>
            {[1, 2, 3]?.map((product, index) => (
              <Box width="100%" key={index}>
                <Box
                  display="flex"
                  alignItems="center"
                  className={classes.root}
                >
                  <Box p={0.5} mr={1}>
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      width={40}
                      height={40}
                    />
                  </Box>

                  <Grid container spacing={1} alignItems="center">
                    <Grid item md={5}>
                      <Skeleton animation="wave" />
                    </Grid>
                    <Grid item md={5}>
                      <Skeleton animation="wave" />
                    </Grid>
                    <Grid item md={2}>
                      <Skeleton animation="wave" />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box p={4}>
              <Box mb={4}>
                <Skeleton animation="wave" width="60%" />
                <Skeleton animation="wave" />
              </Box>
              <Skeleton animation="wave" width="60%" />
              <Skeleton animation="wave" />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box p={4}>
              <Box mb={4}>
                <Skeleton animation="wave" width="60%" />
                <Skeleton animation="wave" />
              </Box>
              <Skeleton animation="wave" width="60%" />
              <Skeleton animation="wave" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
