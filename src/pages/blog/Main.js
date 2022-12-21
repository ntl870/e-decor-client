import {
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDecorTheme } from "redux/blogRedux";
import { blogSelector } from "redux/selectors";
import PostCard from "./post";

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function Main(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { title, posts, loadMore } = props;
  const [type, setType] = useState("Newest");
  const { decorTheme } = useSelector(blogSelector);

  // const { posts, currentPage } = useSelector(blogSelector);
  // const [currentPosts, setCurrentPosts] = useState([]);
  // useEffect(() => {
  //   setCurrentPosts([...currentPosts, posts]);
  // }, [posts, currentPage]);
  return (
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
          {title}
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
          {/* <InputLabel id="select-outlined-label">Select City</InputLabel> */}
          <Select
            labelId="select-outlined-label"
            id="select-outlined"
            value={type}
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
      {posts?.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
      <Box mt={4} display="flex" justifyContent="center">
        <Button variant="outlined" color="primary" onClick={loadMore}>
          Load more
        </Button>
      </Box>
    </Grid>
  );
}
