import { Avatar, Box, Paper, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

export const LoadingStatus = ({ type }) => {
  return (
    <Paper>
      <Box p={8} mb={2} display="flex" alignItems="center" px={15}>
        <Box margin={1}>
          <Skeleton variant="circle">
            <Avatar style={{ width: 64, height: 64 }} />
          </Skeleton>
        </Box>
        <Box width="100%">
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        </Box>
        <Box margin={1}>
          <Skeleton variant="circle">
            <Avatar style={{ width: 64, height: 64 }} />
          </Skeleton>
        </Box>
        <Box width="100%">
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        </Box>
        <Box margin={1}>
          <Skeleton variant="circle">
            <Avatar style={{ width: 64, height: 64 }} />
          </Skeleton>
        </Box>
      </Box>
    </Paper>
  );
};
