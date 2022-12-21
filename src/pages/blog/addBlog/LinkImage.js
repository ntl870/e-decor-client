import {
  Box,
  Button,
  Fade,
  FormControl,
  InputBase,
  makeStyles,
  MenuItem,
  Paper,
  Popper,
  Select,
  Typography,
} from "@material-ui/core";
import objectAssign from "object-assign";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import RegionSelect from "react-region-select";
import { storeImageItem, storeItem } from "redux/blogRedux";
import { getPurchasedProducts } from "redux/productRedux";
import {
  blogSelector,
  categorySelector,
  productSelector,
} from "redux/selectors";
import { isEmpty } from "underscore";

const useStyles = makeStyles((theme) => ({
  selectInput: {
    height: 26,
    padding: "8px 15px",
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    width: "100%",
  },
  select: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
    border: "1px solid #c1b5b5",
  },
  line: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2 /* number of lines to show */,
    "line-clamp": 2,
    "-webkit-box-orient": "vertical",
    maxWidth: 300,
    fontSize: 16,
    marginLeft: 16,
  },
}));

export default function LinkImage(props) {
  const dispatch = useDispatch();

  const { images } = useSelector(blogSelector);
  const { purchasedProducts } = useSelector(productSelector);
  const { categories } = useSelector(categorySelector);
  const [categoryId, setCategoryId] = useState("");

  //
  const [anchorEl, setAnchorEl] = useState(null);

  // const id = Boolean(anchorEl) ? "transitions-popper" : undefined;

  //

  const { imageObj } = props;
  const classes = useStyles();
  const [coords, setCoords] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    dispatch(
      getPurchasedProducts({ categoryId: categoryId ? categoryId : undefined })
    );
  }, [categoryId, dispatch]);

  const detectObjects = (area) => {
    // console.log(area);
    // this.setState({ savedObject: area });
    let img = document.getElementById("image");
    let xPx = img.clientWidth * area.x * 0.01;
    let yPx = img.clientHeight * area.y * 0.01;
    let widthPx = img.clientWidth * area.width * 0.01;
    let heightPx = img.clientHeight * area.height * 0.01;

    // Inverted y-axis, because by default the origin point
    //  in the upper left corner. We do it in the lower left.
    // let reverseY = img.clientHeight - yPx;
    console.log("img.clientWidth", img.clientWidth);
    console.log("img.clientHeight", img.clientHeight);
    console.log(`Object coordinates:: 
    First point: [${xPx.toFixed(2)} px, ${yPx.toFixed(2)} px], 
    Second point: [${(xPx + widthPx).toFixed(2)} px, ${(yPx + heightPx).toFixed(
      2
    )} px]`);
    setCoords([
      +xPx.toFixed(2),
      +yPx.toFixed(2),
      +(xPx + widthPx).toFixed(2),
      +(yPx + heightPx).toFixed(2),
    ]);
  };
  const changeRegionData = (index, event) => {
    const region = regions[index];
    let color;
    detectObjects(regions[0]);
    color = "rgba(0, 0, 255, 0.2)";

    region.data.regionStyle = {
      background: color,
    };
    onChange([
      ...regions.slice(0, index),
      objectAssign({}, region, {
        data: objectAssign({}, region.data, { dataType: event.target.value }),
      }),
      ...regions.slice(index + 1),
    ]);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const regionStyle = {
    background: "rgba(0, 0, 255, 0.5)",
    // zIndex: 99,
  };

  const onChange = (regions) => {
    // console.log(regions);
    setRegions(regions);
  };

  const regionRenderer = (regionProps) => {
    console.log(regionProps);
    if (!regionProps.isChanging) {
      return (
        <div style={{ position: "absolute", right: 0, bottom: "-1.5em" }}>
          <Button
            aria-describedby={"btn-popper"}
            variant="contained"
            color="primary"
            style={{ zIndex: 100, minWidth: 170 }}
            onClick={(event) => changeRegionData(regionProps.index, event)}
            value={regionProps.data.dataType}
          >
            Add product's link
          </Button>
        </div>
      );
    } else {
      console.log("ok");
    }
  };

  //
  useEffect(() => {
    console.log("Loading");
    props?.imageLink &&
      dispatch(
        storeImageItem({
          id: props?.index,
          image: props.imageLink,
          items:
            images.filter((item) => +item.id === +props?.index)[0]?.items || [],
        })
      );
  }, [dispatch, images, props.imageLink, props?.index]);

  const [width, setWidth] = useState("auto");
  const [height, setHeight] = useState("auto");
  useEffect(() => {
    console.log("here");
    var img = new Image();
    img.onload = function () {
      // alert(this.width + " " + this.height);
      setWidth(this.width);
      setHeight(this.height);
    };
    img.src = props.imageLink;
  }, [props.imageLink]);

  return (
    <Box my={2}>
      <RegionSelect
        maxRegions={1}
        regions={regions}
        regionStyle={regionStyle}
        onChange={onChange}
        regionRenderer={regionRenderer}
        style={{ border: "1px solid #bdbdbd" }}
        constraint={true}
      >
        <img
          id="image"
          alt="alt"
          src={imageObj}
          height={height}
          width={width}
        />
      </RegionSelect>
      <Popper
        id={"popper"}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={classes.paper}>
              <Box px={4} pt={4}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography
                    gutterBottom
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 16,
                    }}
                  >
                    Select your purchased products
                  </Typography>
                </Box>
                <Box
                  mb={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {" "}
                  <FormControl variant="outlined" className={classes.select}>
                    <Select
                      value={categoryId}
                      name={"category"}
                      displayEmpty
                      input={
                        <InputBase classes={{ input: classes.selectInput }} />
                      }
                      onChange={(e) => {
                        setCategoryId(e.target.value);
                      }}
                      MenuProps={{ disableScrollLock: true }}
                    >
                      <MenuItem key={"all-categories"} value={""}>
                        All Categories
                      </MenuItem>
                      {categories?.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box pb={4}>
                  {isEmpty(purchasedProducts) ? (
                    <Box display="flex" justifyContent="center">
                      <Box p={2}>No Products Yet.</Box>
                    </Box>
                  ) : (
                    purchasedProducts?.map((item, index) => (
                      <Box
                        style={{ cursor: "pointer" }}
                        key={index}
                        onClick={() => {
                          dispatch(
                            storeItem({
                              id: props?.index,
                              data: { productId: item.id, coords },
                            })
                          );
                          setAnchorEl(null);
                        }}
                      >
                        <Box
                          display={"flex"}
                          justifyContent="space-between"
                          alignItems="center"
                          style={{ minWidth: 200 }}
                        >
                          <Box mt={1} display={"flex"} alignItems="center">
                            <img
                              width={50}
                              height={50}
                              src={item?.images?.[0]?.image}
                              alt=""
                              style={{ border: "1px solid #c1b5b5" }}
                            />
                            <Box>
                              <Typography className={classes.line}>
                                {item?.name}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
