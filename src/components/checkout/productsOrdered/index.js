import { Box, Grid, Paper, Typography } from "@material-ui/core";
import Icons from "constants/icons";
import React from "react";
import ShopOrdered from "./shopOrdered";
import { useStyles } from "./styles";

export default function ProductsOrdered() {
  const classes = useStyles();

  return (
    <Box>
      <Paper className={classes.root}>
        <Box p={2} mb={2}>
          <Box
            display="flex"
            alignItems="center"
            my={1}
            justifyContent="space-between"
          >
            <Grid container alignItems="center" spacing={4}>
              <Grid item xs={12} md={4}>
                <Box
                  display="flex"
                  alignItems="center"
                  style={{ color: "rgb(210, 63, 87)" }}
                >
                  <Box className={classes.icon}>
                    <img src={Icons.PACKAGE_ICON} alt="" />
                  </Box>
                  <Typography className={classes.text} style={{ fontSize: 20 }}>
                    Products Ordered
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box
                  style={{ color: "#ccc" }}
                  display="flex"
                  justifyContent={"space-between"}
                >
                  <Grid item container spacing={4}>
                    <Grid item xs={12} md={3}>
                      Version
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box ml={5}>Unit Price</Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box ml={4}>Amount</Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box ml={2}>Item Subtotal</Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      <Grid container>
        <Grid item xs={12} md={12}>
          <ShopOrdered />
        </Grid>
      </Grid>
    </Box>
  );
}
