import { Container, Paper, Typography, Box } from "@material-ui/core";
import DeliveryAddress from "components/checkout/deliveryAddress";
import PaymentMethod from "components/checkout/paymentMethod";
import ProductsOrdered from "components/checkout/productsOrdered";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "redux/addressRedux";
import { setOrderShipping } from "redux/orderRedux";
import { getPromotions } from "redux/promotionRedux";
import { Skeleton } from "@material-ui/lab";
import PlaceIcon from "@material-ui/icons/Place";

import {
  addressSelector,
  orderSelector,
  shipmentSelector,
} from "redux/selectors";
import { getShipments } from "redux/shipmentRedux";
import { getMinFeeShipping } from "utils/helpers";
import { useStyles } from "./styles";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "components/common/ScrollToTop";

export default function Checkout() {
  ScrollToTop();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const { shopId } = useSelector(orderSelector);
  const { isUpdating } = useSelector(addressSelector);
  const { shipments } = useSelector(shipmentSelector);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getAddresses());
    shopId && dispatch(getPromotions(shopId));
    dispatch(getShipments());
    setIsLoading(false);
  }, [dispatch, shopId, isUpdating]);

  useEffect(() => {
    shipments?.length > 0 &&
      dispatch(setOrderShipping(getMinFeeShipping(shipments)));
  }, [dispatch, shipments]);

  return (
    <Container className={classes.container}>
      {isLoading ? (
        <Paper>
          <Box p={2} mb={4}>
            <Box
              display="flex"
              alignItems="center"
              style={{ color: "rgb(210, 63, 87)" }}
              my={1}
            >
              <PlaceIcon style={{ marginRight: 4 }} />
              <Typography className={classes.text} style={{ fontSize: 20 }}>
                Delivery Address
              </Typography>
            </Box>
            <Box m={2}>
              <Skeleton animation="wave" height={20} />
              <Skeleton animation="wave" height={20} width={"80%"} />
            </Box>
          </Box>
        </Paper>
      ) : (
        <DeliveryAddress />
      )}
      {/* <DeliveryAddress /> */}
      <ProductsOrdered />
      <PaymentMethod />
      <ToastContainer autoClose={1000} style={{ marginTop: "100px" }} />
    </Container>
  );
}
