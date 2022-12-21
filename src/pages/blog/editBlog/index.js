import {
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Images from "constants/image";
import { formats, modules } from "constants/index";
import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost } from "redux/blogRedux";
import { getUploadedUrl } from "utils/helpers";
import LinkImage from "./LinkImage";

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
  //
  editor: {
    "& .ql-container": {
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      // background: "#fefcfc",
      height: 200,
    },
    "& .ql-toolbar": {
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      background: "#f5f5f5",
    },
  },
  //
  wallInput: {
    display: "none",
  },
  wallLabel: {
    "& .MuiIconButton-root": {
      backgroundColor: "#E3E9EF",
      "&:hover": {
        backgroundColor: "rgba(15, 52, 96, 0.04)",
      },
    },
  },
}));

export default function EditBlog() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

  const fileRef = useRef(0);

  //
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [decorTheme, setDecorTheme] = useState("");
  const handleChange = (value) => {
    setContent(value);
  };
  const handleCreatePost = () => {
    const post = { title, content, images, decorTheme };
    dispatch(createPost(post)).then((data) => {
      history.push(`/blog/posts/${data?.payload?.id}`);
    });
  };
  // useEffect(() => {
  //   console.log("useEffect");
  // }, []);

  return (
    <Box>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <PostAddIcon className={classes.icon} />
          <Typography className={classes.title}>Add New Post</Typography>
        </Box>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => history.push("/blog/my-posts")}
        >
          View Posts
        </Button>
      </Box>
      <Box style={{}}>
        <Paper>
          <Box p={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  value={title}
                  fullWidth
                  id="postTitle"
                  label="Post Title"
                  variant="outlined"
                  InputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  value={decorTheme}
                  fullWidth
                  id="decorThemes"
                  label="Decor Theme"
                  variant="outlined"
                  InputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                  onChange={(e) => {
                    setDecorTheme(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <ReactQuill
                  className={classes.editor}
                  style={{ borderRadius: 8 }}
                  // theme="snow"
                  value={content}
                  onChange={handleChange}
                  modules={modules}
                  formats={formats}
                  placeholder={"Content ..."}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography gutterBottom>Image</Typography>

                <Box display="flex" alignItems="center" flexDirection="column">
                  {files?.length > 0 &&
                    files?.map((file, index) => (
                      <LinkImage key={index} imageObj={file} />
                    ))}
                </Box>
                <Box
                  style={{
                    border: "1px solid #ccc",
                    backgroundImage: `url(${"wallUrl"})`,
                    backgroundPositionX: `center`,
                    backgroundPositionY: `center`,
                    // backgroundSize: uploadCover ? "cover" : 150,
                    // backgroundRepeat: uploadCover ? "none" : "no-repeat",
                    borderRadius: 10,
                    overflow: "hidden",
                    height: 173,
                    position: "relative",
                  }}
                >
                  <Box style={{ position: "absolute", top: 20, right: 24 }}>
                    <input
                      accept="image/*"
                      className={classes.wallInput}
                      id="wall-file"
                      type="file"
                      onChange={(e) => {
                        if (e?.target?.files?.length > 0) {
                          var src = URL.createObjectURL(e?.target?.files[0]);

                          const tmp = [...files, src];

                          setFiles(tmp);

                          fileRef.current = fileRef.current + 1;

                          getUploadedUrl(e.target.files?.[0]).then((result) => {
                            setImages([...images, result]);
                          });
                        }
                      }}
                    />
                    <label
                      className={classes.wallLabel}
                      htmlFor="wall-file"
                      style={{ marginLeft: -24 }}
                    >
                      <IconButton
                        size="small"
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                    <Box display="flex" justifyContent="center">
                      <img src={Images.PRODUCT_VERSION} alt="" width={"10%"} />
                    </Box>
                    <Box p={2} display="flex" justifyContent={"center"}>
                      Add decoration images
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleCreatePost}
                >
                  Post
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
