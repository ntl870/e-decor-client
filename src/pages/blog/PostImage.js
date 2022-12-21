import { Box, makeStyles } from "@material-ui/core";
import ScrollToTop from "components/common/ScrollToTop";
import React, { useEffect, useState } from "react";
import ImageMapper from "react-image-mapper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { isEmpty } from "underscore";
const useStyles = makeStyles((theme) => ({
  tooltip: {
    position: "absolute",
    color: "#fff",
    padding: 10,
    background: "rgba(0,0,0,0.8)",
    transform: "translate3d(-50%, 100%, 0)",
    // transform: "translateY(100%)",
    // transform: "translateY(100%)",

    pointerEvents: "none",
    zIndex: 1000,

    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    // display: "-webkit-box",
    // "-webkit-line-clamp": 1 /* number of lines to show */,
    // "line-clamp": 1,
    // "-webkit-box-orient": "vertical",
    maxWidth: 300,
    fontSize: 16,
  },
}));
export default function PostImage(props) {
  ScrollToTop();
  const classes = useStyles();
  const { image } = props;
  const history = useHistory();
  const [hoveredArea, setHoveredArea] = useState("");
  const [msg, setMsg] = useState("");
  const [moveMsg, setMoveMsg] = useState("");

  const [map, setMap] = useState({
    name: "my-map",
    areas: [],
  });
  useEffect(() => {
    console.log("here");
    image?.items?.length > 0 &&
      setMap({
        ...map,
        areas: image?.items?.map((i) => ({
          name: i.productId,
          shape: "rect",
          coords: i.coords,
          productName: i?.product?.name,
        })),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

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
    img.src = image?.image;
  }, [image?.image]);

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {isEmpty(image?.items) ? (
        <img src={image?.image} alt="" />
      ) : (
        <>
          <ImageMapper
            id="image-map"
            src={image?.image}
            fillColor={"rgba(255, 255, 255, 0.5)"}
            map={map}
            width={width}
            height={height}
            imgWidth={width}
            onLoad={() => load()}
            onClick={(area) => {
              clicked(area);
              history.push(`/product/${area?.name}`);
            }}
            onMouseEnter={(area) => enterArea(area)}
            onMouseLeave={(area) => leaveArea(area)}
            onMouseMove={(area, _, evt) => moveOnArea(area, evt)}
            onImageClick={(evt) => clickedOutside(evt)}
            onImageMouseMove={(evt) => moveOnImage(evt)}
          />
          {hoveredArea && (
            <span
              className={classes.tooltip}
              style={{ ...getTipPosition(hoveredArea) }}
            >
              {hoveredArea && hoveredArea.productName}
            </span>
          )}
        </>
      )}
    </Box>
  );
}
