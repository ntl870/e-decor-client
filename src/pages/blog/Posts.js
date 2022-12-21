import {
  Box,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import ScrollToTop from "components/common/ScrollToTop";
import Images from "constants/image";
import LoadingPost from "pages/LoadingPost";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDecorTheme, getPosts } from "redux/blogRedux";
import { blogSelector } from "redux/selectors";
import { isEmpty } from "underscore";
import Main from "./Main";
import PostSidebar from "./PostSidebar";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
}));

const sidebar = {
  social: [
    { name: "Instagram", icon: InstagramIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

export default function Posts() {
  ScrollToTop();

  const classes = useStyles();
  const dispatch = useDispatch();
  const { search, isLoading, posts, decorTheme } = useSelector(blogSelector);
  useEffect(() => {
    dispatch(getPosts({ page: 1, limit: 5, search, decorThemes: decorTheme }));
  }, [decorTheme, dispatch, search]);
  return (
    <>
      <Container maxWidth="lg" style={{ paddingTop: 50 }}>
        <main>
          <Grid container spacing={3} className={classes.mainGrid}>
            {isLoading ? (
              <Grid item xs={12} md={9}>
                <LoadingPost />
              </Grid>
            ) : isEmpty(posts) ? (
              <Grid item xs={12} md={9} className={classes.list}>
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
                  {decorTheme?.length > 0 && (
                    <Box display="flex">
                      {decorTheme?.map((theme, index) => (
                        <Box mx={0.5} key={index}>
                          <Chip
                            color="primary"
                            size="small"
                            label={theme}
                            style={{
                              letterSpacing: 1.2,
                              // fontSize: 12,
                              // backgroundColor: "#D23F57",
                            }}
                            onDelete={() => {
                              dispatch(deleteDecorTheme(theme));
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  )}
                  <FormControl
                    // style={{ width: "25%" }}
                    // margin="dense"

                    variant="outlined"
                    className={classes.formControl}
                    size="small"
                  >
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
                <Paper>
                  <Box
                    p={24}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <img src={Images.NO_SEARCH} alt="" width={200} />
                    <Box style={{ color: "#bdbdbd", fontSize: 16 }} mt={3}>
                      No Results Yet.
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ) : (
              <Main title="Decor Posts" posts={posts} />
            )}

            <PostSidebar social={sidebar.social} />
          </Grid>
        </main>
      </Container>
    </>
  );
}
