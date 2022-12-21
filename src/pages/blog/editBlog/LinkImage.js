import { Box, Button } from "@material-ui/core";
import objectAssign from "object-assign";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import RegionSelect from "react-region-select";

export default function LinkImage(props) {
  const { imageObj } = props;

  const [regions, setRegions] = useState([]);

  const detectObjects = (area) => {
    // this.setState({ savedObject: area });
    let img = document.getElementById("image");
    let xPx = img.clientWidth * area.x * 0.01;
    let yPx = img.clientHeight * area.y * 0.01;
    let widthPx = img.clientWidth * area.width * 0.01;
    let heightPx = img.clientHeight * area.height * 0.01;
    /*Перевернутая ось y, т.к по дефолту точка начала координат 
    в левом верхнем углу. Делаем его в нижнем левом. */
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
  };
  const changeRegionData = (index, event) => {
    const region = regions[index];
    let color;
    detectObjects(regions[0]);
    color = "rgba(0, 255, 0, 0.5)";

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
  };
  const regionStyle = {
    background: "rgba(0, 0, 255, 0.5)",
    zIndex: 99,
  };

  const onChange = (regions) => {
    setRegions(regions);
  };
  const regionRenderer = (regionProps) => {
    if (!regionProps.isChanging) {
      return (
        <div style={{ position: "absolute", right: 0, bottom: "-1.5em" }}>
          <Button
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
    }
  };

  return (
    <Box my={2}>
      <RegionSelect
        maxRegions={1}
        regions={regions}
        regionStyle={regionStyle}
        onChange={onChange}
        regionRenderer={regionRenderer}
        style={{ border: "1px solid black" }}
        constraint={true}
      >
        <img id="image" alt="alt" src={imageObj} />
      </RegionSelect>
    </Box>
  );
}
