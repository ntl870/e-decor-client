import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import notFound from "../assets/images/page_not_found.svg";
import { useHistory } from "react-router-dom";
export default function NotFound() {
  const history = useHistory();

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img src={notFound} alt="" height="50%" />
      <Typography variant="h6" style={{ color: "#3f3d56", marginTop: 8 }}>
        Sorry, page not found!
      </Typography>
      <Typography style={{ marginTop: 16 }}>
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
        mistyped the URL? Be sure to check your spelling.
      </Typography>
      <Button
        onClick={() => history.push(`/`)}
        style={{ marginTop: 16 }}
        variant="outlined"
        color="primary"
      >
        Go To Home
      </Button>
    </Box>
  );
}
