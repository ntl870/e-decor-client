import {
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Box,
  Button,
  CardHeader,
  Card,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "redux/blogRedux";
import PostDetail from "./PostDetail";
import PostSidebar from "./PostSidebar";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import BallotIcon from "@material-ui/icons/Ballot";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { blogSelector, userSelector } from "redux/selectors";
import { useHistory } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginBottom: theme.spacing(5),
  },
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 500,
  },
}));

const sidebar = {
  social: [
    { name: "Instagram", icon: InstagramIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

export default function ViewPost() {
  const classes = useStyles();
  const { postId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector(blogSelector);
  const { currentUser } = useSelector(userSelector);
  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);

  const handleClick = (event) => {
    // event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };
  return (
    <>
      <Container maxWidth="lg" style={{ paddingTop: 100 }}>
        <main>
          <Grid container spacing={3} className={classes.mainGrid}>
            <Grid
              item
              xs={12}
              md={12}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNextIcon fontSize="small" />}
              >
                <Link
                  color="inherit"
                  href="/blog"
                  onClick={handleClick}
                  className={classes.link}
                >
                  <HomeIcon className={classes.icon} />
                  Blog
                </Link>
                {currentUser?.id === post?.user?.id && (
                  <Link
                    color="inherit"
                    href="/blog/my-posts/"
                    onClick={handleClick}
                    className={classes.link}
                  >
                    <BallotIcon className={classes.icon} />
                    My Posts
                  </Link>
                )}
                <Typography color="primary" className={classes.link}>
                  <PostAddIcon className={classes.icon} />
                  Post Detail
                </Typography>
              </Breadcrumbs>
              {currentUser?.id === post?.user?.id && (
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() =>
                      history.push(`/blog/my-posts/edit/${post?.id}`)
                    }
                  >
                    <EditIcon />
                    <Box ml={1}>Edit Post</Box>
                  </Button>
                </Box>
              )}
            </Grid>

            {isLoading ? (
              <Grid item xs={12} md={9}>
                <Card className={classes.card}>
                  <CardHeader
                    title={
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                      />
                    }
                    subheader={
                      <Skeleton animation="wave" height={10} width="40%" />
                    }
                  />

                  <Skeleton
                    animation="wave"
                    variant="rect"
                    className={classes.media}
                  />
                </Card>
              </Grid>
            ) : (
              <PostDetail />
            )}

            <PostSidebar social={sidebar.social} />
          </Grid>
        </main>
      </Container>
    </>
  );
}
