import { Box } from "@material-ui/core";
import React from "react";
import Invoice from "./invoice";
import Status from "./status";

export default function Detail() {
  return (
    <Box>
      <Status />
      <Invoice />
    </Box>
  );
}
