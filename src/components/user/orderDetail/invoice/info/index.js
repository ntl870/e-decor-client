import { Box, Paper, Typography } from "@material-ui/core";
import React from "react";
import { getAddressText } from "utils/helpers";
import { useStyles } from "./styles";

export default function Infor({ order }) {
  const classes = useStyles();

  return (
    <Paper>
      <Box p={2}>
        <Box pl={1} py={1}>
          <Typography gutterBottom className={classes.headText}>
            Shipping Address
          </Typography>
          <Typography>{getAddressText(order?.address)}</Typography>
        </Box>
        <Box pl={1} py={1}>
          <Typography gutterBottom className={classes.headText}>
            Shipping Unit
          </Typography>
          <Typography>{order?.shippingUnit?.name}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}
