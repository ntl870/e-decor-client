import { Box, Button, Typography } from "@material-ui/core";
// import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { useStyles } from "./styles";

export default function PaymentMethods() {
  const classes = useStyles();

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          {/* <PersonIcon className={classes.icon} /> */}
          <Typography className={classes.title}>Payment Methods</Typography>
        </Box>
        <Button color="primary" variant="outlined">
          More
        </Button>
      </Box>
      <Box
        my={4}
        mb={20}
        p={10}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        Loading...
      </Box>
    </Box>
  );
}
