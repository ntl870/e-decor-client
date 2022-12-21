import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ScrollToTop from "components/common/ScrollToTop";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getMyLikes } from "redux/blogRedux";
import { blogSelector } from "redux/selectors";
import FeaturedPost from "../FeaturedPost";
import PostCard from "../post";
import ToolbarBox from "../Toolbar";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#2b3445",
    fontSize: 25,
    marginBottom: 0,
    marginTop: 0,
    fontWeight: 700,
    lineHeight: 1,
    marginLeft: 12,
    whiteSpace: "normal",
  },
  icon: {
    fontSize: 24,
    color: "#D23F57",
  },
}));
export default function MyFavorite() {
  ScrollToTop();

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyLikes());
  }, [dispatch]);
  const { posts } = useSelector(blogSelector);
  const [showType, setShowType] = useState(true);
  return (
    <Box>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <FavoriteIcon className={classes.icon} />
          <Typography className={classes.title}>My Favorite Posts</Typography>
        </Box>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => history.push("/blog/my-posts/add")}
        >
          <AddIcon style={{ marginRight: 8 }} />
          New Post
        </Button>
      </Box>
      <ToolbarBox showType={showType} setShowType={setShowType} />
      <Box style={{}}>
        {!showType &&
          posts?.map((post, index) => (
            <PostCard key={index} post={post?.post} />
          ))}
        {showType && (
          <Grid container spacing={3}>
            {posts?.map((post, index) => (
              <FeaturedPost key={index} post={post} />
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
