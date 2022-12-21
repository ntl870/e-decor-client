import { Box, Button, Paper, Typography } from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { cancelOrder, confirmOrder } from "redux/orderRedux";
import { isEmpty } from "underscore";
import Product from "./product";
import { useStyles } from "./styles";

export default function Products({ order }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Paper>
      <Box my={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          className={classes.head}
          p={2}
        >
          <Box display="flex" alignItems="center" ml={1}>
            <Box display="flex">
              <Typography className={classes.title}>Order ID: </Typography>
              <Typography>{order?.id}</Typography>
            </Box>
            <Box display="flex" pl={2}>
              <Typography className={classes.title}>Placed on: </Typography>
              <Typography>
                {!isEmpty(order)
                  ? format(new Date(order?.createdAt), "MMM dd, yyyy")
                  : "xxx"}
              </Typography>
            </Box>
            <Box display="flex" pl={2} alignItems="center">
              <Typography className={classes.title}>Shop Name: </Typography>
              <Typography
                className={classes.shop}
                onClick={() => history.push(`/shops/${order?.shop?.id}`)}
              >
                {order?.shop?.name}
              </Typography>
            </Box>
          </Box>
          <Box>
            {/* status: pending - processing */}
            {order?.status === "shipped" ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  history.push(`/orders/${order.id}`);
                  dispatch(confirmOrder(order.id));
                }}
              >
                Confirm
              </Button>
            ) : (
              order?.status !== "shipped" &&
              order?.status !== "delivered" &&
              order?.status !== "canceled" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history.push(`/orders/${order.id}`);
                    dispatch(cancelOrder(order.id));
                  }}
                >
                  Cancel
                </Button>
              )
            )}

            {/* status: shipped */}
            {order?.status === "canceled" && (
              <Button variant="contained" color="primary">
                Order Again
              </Button>
            )}
          </Box>
        </Box>
        <Box p={2}>
          {order?.orderItems?.map((product, index) => (
            <Product
              orderItemId={product?.id}
              product={product}
              key={index}
              isDelivered={order?.status === "delivered"}
              hasFeedback={product?.feedback}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
