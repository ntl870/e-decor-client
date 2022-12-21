import { Box, Button, Typography } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import NoShop from "components/common/NoShop";
import OrdersTable from "components/seller/orderTable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopOrders } from "redux/orderRedux";
import { shopSelector } from "redux/selectors";
import { useStyles } from "./styles";

export default function SellerOrders() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const storeShop = useSelector(shopSelector);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(getShopOrders({ limit: 5, page }));
  }, [dispatch, page]);

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
          <Typography className={classes.title}>Orders</Typography>
        </Box>
        {storeShop?.currentShop && (
          <Button color="primary" variant="outlined">
            Get more
          </Button>
        )}
      </Box>
      {storeShop?.currentShop ? (
        <Box>
          <OrdersTable page={page} handleChangePage={handleChangePage} />
        </Box>
      ) : (
        <NoShop />
      )}
    </div>
  );
}
