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
import BallotIcon from "@material-ui/icons/Ballot";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ScrollToTop from "components/common/ScrollToTop";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router-dom";
import ImageMapper from "react-image-mapper";
import { formats, modules } from "constants/index";

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

export default function MyBlogDetail() {
  ScrollToTop();
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState("");
  const [hoveredArea, setHoveredArea] = useState("");
  const [msg, setMsg] = useState("");
  const [moveMsg, setMoveMsg] = useState("");
  const handleChange = (value) => {
    setValue(value);
  };
  const MAP = {
    name: "my-map",
    areas: [
      {
        name: "1",
        shape: "rect",
        coords: [433, 187, 619, 364],
        // preFillColor: "green",
        // fillColor: "blue",
      },
      {
        name: "2",
        shape: "poly",
        coords: [219, 118, 220, 210, 283, 210, 284, 119],
        // preFillColor: "pink",
      },
      {
        name: "3",
        shape: "poly",
        coords: [381, 241, 383, 94, 462, 53, 457, 282],
        // fillColor: "yellow",
      },
      {
        name: "4",
        shape: "poly",
        coords: [245, 285, 290, 285, 274, 239, 249, 238],
        // preFillColor: "red",
      },
      { name: "5", shape: "circle", coords: [170, 100, 25] },
    ],
  };

  const enterArea = (area) => {
    setHoveredArea(area);
  };

  const leaveArea = (area) => {
    setHoveredArea(null);
  };

  const getTipPosition = (area) => {
    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  };
  const load = () => {
    setMsg("Interact with image !");
  };
  const clicked = (area) => {
    setMsg(
      `You clicked on ${area.shape} at coords ${JSON.stringify(area.coords)} !`
    );
  };
  const clickedOutside = (evt) => {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    setMsg(`You clicked on the image at coords ${JSON.stringify(coords)} !`);
  };
  const moveOnImage = (evt) => {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    setMoveMsg(`You moved on the image at coords ${JSON.stringify(coords)} !`);
  };
  const moveOnArea = (area, evt) => {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    setMoveMsg(
      `You moved on ${area.shape} ${area.name} at coords ${JSON.stringify(
        coords
      )} !`
    );
  };
  return (
    <Box>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <BallotIcon className={classes.icon} />
          <Typography className={classes.title}>Post Detail</Typography>
        </Box>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => history.push("/blog/my-posts")}
        >
          View Posts List
        </Button>
      </Box>
      <Box style={{}}>
        <Paper>
          <Box p={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  id="postTitle"
                  label="Post Title"
                  variant="outlined"
                  InputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <ReactQuill
                  className={classes.editor}
                  style={{ borderRadius: 8 }}
                  // theme="snow"
                  value={value}
                  onChange={handleChange}
                  modules={modules}
                  formats={formats}
                  placeholder={"Content ..."}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography>Image</Typography>
                <img
                  src="https://media.designcafe.com/wp-content/uploads/2021/04/23193918/study-room-decoration-ideas-for-your-home.jpg"
                  alt="Workplace"
                  usemap="#workmap"
                  width="854"
                  height="512"
                />

                <map name="workmap">
                  <area
                    shape="rect"
                    coords="433,187,619,364"
                    alt="Computer"
                    href={`/products/`}
                  />
                  <area
                    shape="rect"
                    coords="290,172,333,250"
                    alt="Phone"
                    href={`/products/`}
                  />
                  <area
                    shape="circle"
                    coords="337,300,44"
                    alt="Cup of coffee"
                    href={`/products/`}
                  />
                </map>
                <ImageMapper
                  src={
                    "https://media.designcafe.com/wp-content/uploads/2021/04/23193918/study-room-decoration-ideas-for-your-home.jpg"
                  }
                  fillColor={"rgba(255, 255, 255, 0.5)"}
                  map={MAP}
                  width="854"
                  height="512"
                  onLoad={() => load()}
                  onClick={(area) => {
                    clicked(area);
                    // console.log(area);
                    // history.push(`/products/`);
                  }}
                  onMouseEnter={(area) => enterArea(area)}
                  onMouseLeave={(area) => leaveArea(area)}
                  onMouseMove={(area, _, evt) => moveOnArea(area, evt)}
                  onImageClick={(evt) => clickedOutside(evt)}
                  onImageMouseMove={(evt) => moveOnImage(evt)}
                />
                {hoveredArea && (
                  <span
                    style={{
                      ...getTipPosition(hoveredArea),
                      position: "absolute",
                      color: "#fff",
                      padding: 10,
                      background: "rgba(0,0,0,0.8)",
                      transform: "translate3d(-50%, -50%, 0)",
                      borderRadius: 5,
                      pointerEvents: "none",
                      zIndex: 9999999,
                    }}
                    className="tooltip"
                    // style={{ ...getTipPosition(hoveredArea) }}
                  >
                    {hoveredArea && hoveredArea.name}
                  </span>
                )}
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
                        // getUploadedUrl(e.target.files?.[0]).then((result) =>
                        //   setWallUrl(result)
                        // );
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
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button color="primary" variant="contained">
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
