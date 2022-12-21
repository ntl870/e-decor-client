import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import BallotOutlinedIcon from "@material-ui/icons/BallotOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PostAddIcon from "@material-ui/icons/PostAdd";
import React from "react";
import { NavLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {},
  headText: {
    margin: 0,
    fontWeight: 400,
    lineHeight: 1.5,
    padding: "26px 30px 1.5rem",
    color: "rgb(125, 135, 156)",
    fontSize: 16,
  },
  navLink: {
    letterSpacing: 1.2,
    display: "flex",
    alignItems: "center",
    transition: "color 150ms ease-in-out 0s",
    borderLeft: "4px solid transparent",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    marginBottom: "1.25rem",
    color: "#2b3445",
    // color: "rgb(125, 135, 156)",

    "&:hover": {
      borderLeft: "4px solid rgb(210, 63, 87)",
      color: "rgb(210, 63, 87)",
    },
  },
  icon: {
    marginRight: 8,
  },

  active: {
    color: "rgb(210, 63, 87)",
    borderLeft: "4px solid rgb(210, 63, 87)",
  },
}));
export default function Dashboard() {
  const classes = useStyles();

  return (
    <Paper>
      <Box pb={2}>
        <Typography className={classes.headText}>DASHBOARD</Typography>
        <Box display="flex" flexDirection="column">
          <NavLink
            className={classes.navLink}
            to="/blog/my-posts"
            activeClassName={classes.active}
            exact
          >
            <BallotOutlinedIcon className={classes.icon} />
            My Posts
          </NavLink>

          <NavLink
            className={classes.navLink}
            to="/blog/my-posts/add"
            activeClassName={classes.active}
            exact
          >
            <PostAddIcon className={classes.icon} />
            Add New Post
          </NavLink>
          <NavLink
            className={classes.navLink}
            to="/blog/my-favorite"
            activeClassName={classes.active}
          >
            <FavoriteBorderIcon className={classes.icon} />
            My Favorite Posts
          </NavLink>
        </Box>
      </Box>
    </Paper>
  );
}
