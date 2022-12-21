import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wishlistSelector } from "redux/selectors";
import { getWishlists } from "redux/wishlistRedux";
import { useStyles } from "./styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "./product";
import { isEmpty } from "underscore";
import Images from "constants/image";
import { LoadingCard } from "components/common/LoadingCard";
export default function Wishlist() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { wishlists, isLoading } = useSelector(wishlistSelector);
  useEffect(() => {
    dispatch(getWishlists());
  }, [dispatch]);

  return (
    <Box>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <FavoriteIcon className={classes.icon} style={{ color: "#D23F57" }} />
          <Typography className={classes.title}>My Wish List</Typography>
        </Box>
        <Button color="primary" variant="outlined">
          Add All To Cart
        </Button>
      </Box>
      {isLoading ? (
        <Box my={4}>
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid key={item} item xs={12} sm={6} lg={4}>
                <LoadingCard />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box my={4}>
          <Grid container spacing={3}>
            {isEmpty(wishlists) ? (
              <Grid key={"key"} item xs={12}>
                <Paper>
                  <Box
                    p={15}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <img src={Images.NO_WISHLIST} alt="" width={200} />
                    <Box style={{ color: "#bdbdbd", fontSize: 16 }} mt={3}>
                      No Wishlists Yet.
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ) : (
              wishlists?.map((product, index) => (
                <Grid key={index} item xs={12} sm={6} lg={4}>
                  <Product product={product} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      )}
      <ToastContainer autoClose={2000} style={{ marginTop: "100px" }} />
    </Box>
  );
}
