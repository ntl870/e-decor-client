import {
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import ScrollToTop from "components/common/ScrollToTop";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "redux/blogRedux";
import { blogSelector } from "redux/selectors";
import { isEmpty } from "underscore";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import MainFeaturedPost from "./MainFeaturedPost";
import PostSidebar from "./PostSidebar";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
}));

const mainFeaturedPost = {
  title: "E-Decor Blog",
  description:
    "Where you find inspirations and ideas through what's most interesting in post's contents.",
  image:
    "https://i.pinimg.com/564x/68/7e/be/687ebed47faa6963896c628b836046cc.jpg",
  imgText: "main image description",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image:
      "https://i.pinimg.com/564x/68/7e/be/687ebed47faa6963896c628b836046cc.jpg",
    imageText: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image:
      "https://i.pinimg.com/564x/68/7e/be/687ebed47faa6963896c628b836046cc.jpg",
    imageText: "Image Text",
  },
];

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",

  social: [
    { name: "Instagram", icon: InstagramIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

export default function Blog() {
  ScrollToTop();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentPage } = useSelector(blogSelector);
  useEffect(() => {
    dispatch(getPosts({ page: currentPage, limit: 5 }));
  }, [currentPage, dispatch]);

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        dispatch(getPosts({ page, limit: 5 })).then((res) => {
          setPosts((users) => [...users, ...res.payload.posts]);
        });
      } catch (error) {
        setErrorMsg("Error while loading data. Try again later.");
      } finally {
        setIsLoading(false);
        console.log(errorMsg);
      }
    };

    loadUsers();
  }, [dispatch, errorMsg, page]);

  const loadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
      <Container maxWidth="lg" style={{ paddingTop: 100 }}>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts?.map((post, index) => (
              <FeaturedPost key={index} post={post} />
            ))}
          </Grid>
          <Grid container spacing={3} className={classes.mainGrid}>
            {!isEmpty(posts) && (
              <Main title="Decor Posts" loadMore={loadMore} posts={posts} />
            )}
            {(isEmpty(posts) || isLoading) && (
              <Grid item xs={12} md={9}>
                <Box
                  mb={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      lineHeight: 1,
                      textTransform: "none",
                      whiteSpace: "normal",
                      color: "#2B3445",
                    }}
                  >
                    Decor Posts
                  </Typography>

                  <FormControl
                    // style={{ width: "25%" }}
                    // margin="dense"

                    variant="outlined"
                    className={classes.formControl}
                    size="small"
                  >
                    {/* <InputLabel id="select-outlined-label">Select City</InputLabel> */}
                    <Select
                      labelId="select-outlined-label"
                      id="select-outlined"
                      value={"Newest"}
                      // onChange={handleChangeCity}
                      // label="Select City"
                      className={classes.input}
                      defaultValue=""
                      MenuProps={{
                        disableScrollLock: true,
                        classes: { paper: classes.menuPaper },
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                    >
                      {["Newest", "Popular", "Oldest"]?.map((city, index) => (
                        <MenuItem key={index} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="center" mt={2}>
                  <Box style={{ fontSize: 20 }}>Loading...</Box>
                </Box>
              </Grid>
            )}
            <PostSidebar
              title={sidebar.title}
              description={sidebar.description}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
    </>
  );
}
