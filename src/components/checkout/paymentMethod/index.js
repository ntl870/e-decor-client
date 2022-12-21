import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import React, { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { createOrder, resetOrder, storeIsPurchased } from "redux/orderRedux";
import { orderSelector } from "redux/selectors";
import { useStyles } from "./styles";

export default function PaymentMethod() {
  const {
    amount,
    voucherPrice,
    shipping,
    isPurchased,
    addressId,
    shopId,
    shippingUnitId,
  } = useSelector(orderSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const orderStore = useSelector(orderSelector);
  const classes = useStyles();
  //
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    dispatch(storeIsPurchased(!isPurchased));
    setAnchorEl(null);
  };
  return (
    <Paper className={classes.root}>
      <Box p={2} mb={4}>
        <Box
          display="flex"
          alignItems="center"
          my={1}
          justifyContent={"space-between"}
        >
          <Box
            display="flex"
            alignItems="center"
            style={{ color: "rgb(210, 63, 87)" }}
          >
            <PaymentOutlinedIcon className={classes.icon} />
            <Typography className={classes.text} style={{ fontSize: 20 }}>
              Payment Method
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mr={9}>
            <Typography className={classes.text}>
              {isPurchased ? "Pay with Paypal" : "Cash on Delivery"}
            </Typography>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              color="primary"
              style={{ marginLeft: 16 }}
              onClick={handleClick}
            >
              Change
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              disableScrollLock={true}
            >
              <MenuItem onClick={handleClose}>
                {!isPurchased && (
                  <CheckIcon style={{ marginRight: 4, color: "blue" }} />
                )}
                <Box pl={isPurchased ? 3 : 0}>Cash on Delivery</Box>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {isPurchased && (
                  <CheckIcon style={{ marginRight: 4, color: "blue" }} />
                )}
                <Box pl={!isPurchased ? 3 : 0}>Pay with Paypal</Box>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          my={2}
          style={{ borderTop: "1px solid #ccc", borderTopStyle: "dashed" }}
          pt={2}
        >
          <Box width="25%" mr={10}>
            <Box
              py={0.5}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className={classes.subText}>
                Merchandise Subtotal:
              </Typography>
              <Typography className={classes.text}>${amount}</Typography>
            </Box>
            <Box
              py={0.5}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className={classes.subText}>
                Shipping Total:
              </Typography>
              <Typography className={classes.text}>${shipping.fee}</Typography>
            </Box>
            <Box
              py={0.5}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className={classes.subText}>
                Voucher Discount:
              </Typography>
              <Typography className={classes.text}>
                - ${voucherPrice}
              </Typography>
            </Box>
            <Divider
              style={{ borderColor: "#ccc", marginBottom: 8, marginTop: 4 }}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className={classes.totalText}>
                Total Payment:
              </Typography>
              <Typography
                className={classes.text}
                style={{
                  color: "rgb(210, 63, 87)",
                  fontSize: 18,
                }}
              >
                ${(amount - voucherPrice + shipping.fee).toFixed(1)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          pt={2}
          display="flex"
          alignItems={isPurchased ? "flex-start" : "center"}
          justifyContent="space-between"
          my={2}
          style={{ borderTop: "1px solid #ccc", borderTopStyle: "dashed" }}
        >
          <Typography className={classes.text}>
            By clicking {isPurchased ? "for payment" : `"Place Order"`}, you are
            agreeing to Our General Transaction Terms
          </Typography>

          {isPurchased ? (
            <Box mr={10}>
              <PayPalButton
                amount={amount - voucherPrice + shipping.fee}
                shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details, data) => {
                  dispatch(resetOrder());
                  return dispatch(
                    createOrder({
                      isPurchased,
                      addressId,
                      shopId,
                      shippingUnitId,
                      senderPayPalMail: details.payer.email_address,
                      promotionId: orderStore.promotionId
                        ? orderStore.promotionId
                        : undefined,
                      orderItems: orderStore.orderItems.map((item) => ({
                        productVersionId: item.productVersionId,
                        quantity: item.quantity,
                      })),
                    })
                  ).then((res) => {
                    console.log(res);
                    if (!res?.error) {
                      toast.success("SUCCESS");
                      history.push(`/orders/${res.payload.id}`);
                    }
                  });
                }}
                options={{
                  clientId: process.env.REACT_APP_PRODUCTION_CLIENT_ID,
                }}
                onError={(err) => {
                  console.log("onError: err=", err);
                }}
              />
            </Box>
          ) : (
            <Box style={{ position: "relative" }}>
              <Button
                color="primary"
                variant="contained"
                style={{ marginRight: 80, marginLeft: 16 }}
                disabled={orderStore?.isLoading}
                onClick={() => {
                  dispatch(
                    createOrder({
                      isPurchased,
                      addressId,
                      shopId,
                      shippingUnitId,
                      promotionId: orderStore.promotionId
                        ? orderStore.promotionId
                        : undefined,
                      orderItems: orderStore.orderItems.map((item) => ({
                        productVersionId: item.productVersionId,
                        quantity: item.quantity,
                      })),
                    })
                  ).then((res) => {
                    console.log(res);
                    if (!res?.error) {
                      history.push(`/orders/${res.payload.id}`);
                    }
                  });
                }}
              >
                Place Order
              </Button>
              {orderStore?.isLoading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
