import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import Post from "./Post";
import { useStyles } from "./styles";

export default function IdeasBlog() {
  const classes = useStyles();
  return (
    <section style={{ marginBottom: 64 }}>
      <Box my={4}>
        <Typography className={classes.headText}>
          Get Ideas from our Blog
        </Typography>
      </Box>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Post />
        </Grid>
        <Grid item xs={12} md={6}>
          <Post />
        </Grid>
      </Grid>
    </section>
  );
}
