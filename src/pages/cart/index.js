import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import CartItems from "components/cart";
import ScrollToTop from "components/common/ScrollToTop";
import Bottom from "components/product/bottom";
import Images from "constants/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCartItems } from "redux/cartRedux";
import { cartSelector, userSelector } from "redux/selectors";
import { size } from "underscore";
import { useStyles } from "./styles";

export default function Cart() {
  ScrollToTop();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(userSelector);
  const { products, isUpdated, isLoading } = useSelector(cartSelector);

  useEffect(() => {
    currentUser && dispatch(getCartItems());
  }, [currentUser, dispatch, isUpdated]);

  return (
    <Container className={classes.container}>
      <Paper className={classes.root}>
        <Box p={2} mb={2}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid container alignItems="center" spacing={4}>
              <Grid item xs={12} md={4}>
                <Box
                  display="flex"
                  alignItems="center"
                  style={{ color: "rgb(210, 63, 87)" }}
                >
                  <Checkbox
                    defaultChecked={false}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <Typography
                    className={classes.text}
                    style={{ marginLeft: 30, fontSize: 20 }}
                  >
                    Product
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
                    <Grid item xs={12} md={2}>
                      <Box ml={9}> Version</Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box ml={11}>Unit Price</Box>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Box ml={10}>Quantity</Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box ml={15}>Total Price</Box>
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <Box ml={-2}>Actions</Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      {size(products) ? (
        <>
          {products?.map((item, index) => (
            <CartItems item={item} key={index} />
          ))}
          <Bottom type={true} />
        </>
      ) : isLoading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box p={10} style={{ fontSize: 20 }}>
            Loading...
          </Box>
        </Box>
      ) : (
        <Box
          mt={8}
          p={2}
          px={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <img src={Images.EMPTY_CART} alt="" width={200} />
          <Box m={2} style={{ color: "#bdbdbd" }}>
            Your shopping cart is empty
          </Box>
          <Box mb={16}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/")}
            >
              Go Shopping Now
            </Button>
          </Box>
        </Box>
      )}
      <ToastContainer
        hideProgressBar
        autoClose={1000}
        style={{ marginTop: "100px" }}
      />
    </Container>
  );
}
