import { Box, Button, Typography } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { LoadingInvoice } from "components/common/LoadingInvoice";
import { LoadingStatus } from "components/common/LoadingStatus";
import ScrollToTop from "components/common/ScrollToTop";
import Detail from "components/user/orderDetail";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getOrder } from "redux/orderRedux";
import { orderSelector } from "redux/selectors";
import { isEmpty } from "underscore";
import { useStyles } from "./styles";

export default function OrderDetail() {
  ScrollToTop();

  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { order, isUpdating, isLoading } = useSelector(orderSelector);
  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id, isUpdating]);
  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <ShoppingCartIcon className={classes.icon} />
          <Typography className={classes.title}>Order Details</Typography>
        </Box>
        <Link to={"/orders"}>
          <Button color="primary" variant="outlined">
            Back to Order List
          </Button>
        </Link>
      </Box>
      <Box>{!isEmpty(order) && (!isLoading && !isUpdating) && <Detail />}</Box>
      <Box>
        {(isLoading || isUpdating) && <LoadingStatus />}
        {(isLoading || isUpdating) && <LoadingInvoice />}
      </Box>
      <ToastContainer autoClose={1000} style={{ marginTop: "100px" }} />
    </div>
  );
}
