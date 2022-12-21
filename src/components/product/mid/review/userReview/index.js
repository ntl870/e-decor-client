import { Avatar, Box, Typography } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import React from "react";

export default function UserReview(props) {
  const { feedback } = props;
  return (
    <Box mb={2} ml={3} mt={1}>
      <Box display="flex" alignItems="flex-start">
        <Box mr={2}>
          <Avatar alt="" src={feedback?.user?.avatar} />
        </Box>
        <Box display="flex" flexDirection="column">
          <Box mb={2}>
            <Typography style={{ fontWeight: 600 }}>
              {feedback?.user?.name}
            </Typography>
            <Rating
              value={feedback?.rating ? Number(feedback?.rating) : 0}
              precision={0.1}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              readOnly
            />
          </Box>
          <Box mb={2}>{feedback?.content}</Box>
          <Box display="flex" alignItems="center">
            {feedback?.feedbackImages?.map((item, index) => (
              <Box key={index} m={0.5}>
                <img
                  width={150}
                  height={150}
                  src={item.image}
                  alt={item.image}
                  style={{ padding: 4, border: "1px solid rgb(221 215 215)" }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
