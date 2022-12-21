import { Avatar, Box, IconButton, Link, Tooltip } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { format } from "date-fns";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },

  cover: {
    minWidth: 200,
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2 /* number of lines to show */,
    "line-clamp": 2,
    "-webkit-box-orient": "vertical",
    maxWidth: 300,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea
        component="a"
        href={`/blog/posts/${post?.id}`}
        style={{ marginTop: 16 }}
      >
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <Box mb={2} className={classes.text}>
              {post?.post?.title || "Post Title "}
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar src={post?.post?.user?.avatar} alt="" />
              <Box ml={2} display="flex" flexDirection="column">
                <Box>{post?.post?.user?.name || "User"}</Box>
                <Box>
                  {post?.createdAt
                    ? format(new Date(post?.createdAt), "MMM dd, yyyy")
                    : "MMM dd, yyyy"}
                </Box>
              </Box>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => {
                    // setIsClicked(!isClicked);
                    // isClicked
                    //   ? dispatch(unlikePost(post?.id)).then((data) =>
                    //       console.log(data)
                    //     )
                    //   : dispatch(likePost(post?.id)).then((data) =>
                    //       console.log(data)
                    //     );
                  }}
                >
                  <FavoriteIcon
                  // style={{ color: isClicked ? "#D23F57" : null }}
                  />
                </IconButton>
                <Box>50 Likes</Box>
              </Box>
              <Tooltip title="View detail" arrow>
                <Link to={`/blog/posts/${post?.id}`}>
                  <IconButton>
                    <ArrowForwardIcon className={classes.icon} />
                  </IconButton>
                </Link>
              </Tooltip>
            </Box>
          </CardContent>

          <CardMedia
            className={classes.cover}
            image={
              post?.post?.images?.[0]?.image ||
              "https://homebnc.com/homeimg/2021/02/14-study-room-design-ideas-decor-homebnc.jpg"
            }
            title={post?.imageTitle}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
