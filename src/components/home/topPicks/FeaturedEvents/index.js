import { Box, Paper } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

export default function FeaturedEvents(props) {
  const classes = useStyles();
  const { event } = props;
  return (
    <Paper className={classes.root} variant="outlined">
      <Box
        className={classes.wrapper}
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
      >
        <h2 className={classes.text}>{props.event.name}</h2>
        <p className={classes.subText}>{props.event.description}</p>
        <a href="/products">
          <small className={classes.link}>SHOP NOW</small>
        </a>
      </Box>

      <img
        width="100%"
        height="500px"
        src={event.image}
        alt=""
        display="block"
        className={classes.image}
      />
    </Paper>
  );
}
