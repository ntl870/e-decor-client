import { Box, Divider, Paper, Typography } from "@material-ui/core";
import React from "react";
import { getPriceTotalFromOrderItems } from "utils/helpers";
import { useStyles } from "./styles";

export default function Total({ order }) {
  const classes = useStyles();

  return (
    <Paper>
      <Box p={3} mb={4}>
        <Box>
          <Typography className={classes.head}>Total Summary</Typography>
        </Box>
        <Box my={2}>
          <Box display="flex" justifyContent="space-between">
            <Typography className={classes.subText}>Subtotal:</Typography>
            <Typography className={classes.boldText}>
              ${getPriceTotalFromOrderItems(order?.orderItems)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography className={classes.subText}>Shipping fee:</Typography>
            <Typography className={classes.boldText}>
              ${order?.shippingUnit?.fee}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography className={classes.subText}>Discount:</Typography>
            <Typography className={classes.boldText}>
              - $
              {order?.promotion
                ? (getPriceTotalFromOrderItems(order?.orderItems) *
                    order?.promotion?.discount) /
                  100
                : 0}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box my={1} display="flex" justifyContent="space-between">
          <Typography className={classes.boldText}>Total </Typography>
          <Typography className={classes.boldText}>
            ${order?.amount + order?.shippingUnit?.fee}
          </Typography>
        </Box>
        <Divider />

        <Box my={1} display="flex" justifyContent="space-between">
          <Typography className={classes.boldText}>Payment Method </Typography>
          <Typography>
            {order.isPurchased ? "Pay With Paypal" : "Payment On Delivery"}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
