import { Box, Button, Paper, Typography } from "@material-ui/core";
import Images from "constants/image";
import React from "react";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function NoShop() {
  const history = useHistory();

  return (
    <Box mb={4}>
      <Paper>
        <Box pt={10} display="flex" justifyContent="center">
          <img src={Images.NO_SHOP} alt="" width={"35%"} />
        </Box>
        <Box
          pt={3}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography style={{ fontSize: 25, fontWeight: 600 }}>
            Be a Power Seller
          </Typography>
          <Typography style={{ fontSize: 16 }}>
            Manage your shop efficiently on E-Decor Website
          </Typography>
        </Box>
        <Box
          pt={2}
          pb={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.push("/shop/settings")}
          >
            Create your own shop
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
