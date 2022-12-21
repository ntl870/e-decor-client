import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  makeStyles,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ScrollToTop from "components/common/ScrollToTop";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";
import { blogSelector } from "redux/selectors";
import PostImage from "./PostImage";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { format } from "date-fns";
const useStyles = makeStyles((theme) => ({
  btn: {
    "& .Carousel-button": {
      zIndex: "1000 !important",
    },
    "& .MuiButtonBase-root": {
      zIndex: "1000 !important",
    },
    "& .MuiIconButton-root": {
      zIndex: "1000 !important",
    },
  },
}));
export default function PostDetail() {
  ScrollToTop();
  const classes = useStyles();
  const { post } = useSelector(blogSelector);
  return (
    <Grid item xs={12} md={9}>
      <Box>
        <Box mb={2} style={{ fontSize: 28, fontWeight: "bold" }}>
          {post?.title}
        </Box>
        <Paper>
          <Box p={2}>
            <Carousel
              autoPlay={false}
              animation="slide"
              // duration="5000"
              // interval={10000}
              className={classes.btn}
            >
              {post?.images?.map((image, i) => (
                <PostImage key={i} image={image} />
              ))}
            </Carousel>
          </Box>
        </Paper>
        <Box mt={2}>
          <Paper>
            <Box
              p={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Avatar
                  src={post?.user?.avatar}
                  alt=""
                  style={{ border: "1px solid rgb(211 206 206)" }}
                />
                <Box ml={2} display="flex" flexDirection="column">
                  <Box>{post?.user?.name}</Box>
                  <Box>
                    {post?.createdAt
                      ? format(new Date(post?.createdAt), "MMM dd, yyyy")
                      : "MMM dd, yyyy"}
                  </Box>
                </Box>
              </Box>
              <Box>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box mt={2}>
          <Paper>
            <Box p={2} display="flex" flexDirection="column">
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                mb={2}
              >
                <Box mb={1}>Decor Themes</Box>
                <Box>
                  <Chip
                    color="primary"
                    size="small"
                    label={post?.decorTheme}
                    style={{
                      letterSpacing: 1.2,
                      // fontSize: 12,
                      // backgroundColor: "#D23F57",
                    }}
                  />
                </Box>
              </Box>
              <Divider />
              <Box mt={2} py={2}>
                <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Grid>
  );
}
