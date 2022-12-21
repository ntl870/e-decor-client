import { Box, Grid, Paper, Typography } from "@material-ui/core";
import calendar from "assets/images/categories/calendar.png";
import candle from "assets/images/categories/candle.png";
import clock from "assets/images/categories/clock.png";
import lamp from "assets/images/categories/lamp.png";
import pinBoard from "assets/images/categories/pin-board.png";
import React from "react";
import { useStyles } from "./styles";

export default function FeaturedCategories() {
  const classes = useStyles();
  return (
    <section>
      <Box mb={4}>
        <Typography className={classes.headText}>
          Featured Categories
        </Typography>
      </Box>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box display="flex" justifyContent="center">
              <img src={pinBoard} alt="" height={490} />
            </Box>
            <Typography className={classes.cateText}>Stationary</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={4}>
            <Grid item md={6}>
              <Paper>
                <Box mb={2}>
                  <Box display="flex" justifyContent="center">
                    <img src={clock} alt="" height={200} />
                  </Box>
                  <Typography className={classes.cateText}>Clocks</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item md={6}>
              <Paper>
                <Box mb={2}>
                  <Box display="flex" justifyContent="center">
                    <img src={lamp} alt="" height={200} />
                  </Box>
                  <Typography className={classes.cateText}>Lighting</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item md={6}>
              <Paper>
                <Box mb={2}>
                  <Box display="flex" justifyContent="center">
                    <img src={candle} alt="" height={200} />
                  </Box>
                  <Typography className={classes.cateText}>Candles</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item md={6}>
              <Paper>
                <Box mb={2}>
                  <Box display="flex" justifyContent="center">
                    <img src={calendar} alt="" height={200} />
                  </Box>
                  <Typography className={classes.cateText}>
                    Calendars
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
}
