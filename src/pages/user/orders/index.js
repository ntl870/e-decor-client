import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { LoadingTable } from "components/common/LoadingTable";
import OrdersTable from "components/orders/table";
import EnhancedTableHead from "components/orders/table/header";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "redux/orderRedux";
import { orderSelector } from "redux/selectors";
import { useStyles } from "./styles";

export default function Orders() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(getOrders({ limit: 5, page }));
  }, [dispatch, page]);
  const { isLoading } = useSelector(orderSelector);
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
          <Typography className={classes.title}>My Orders</Typography>
        </Box>
        <Button color="primary" variant="outlined">
          Get more
        </Button>
      </Box>
      {isLoading ? (
        <TableContainer component={Paper} style={{ marginBottom: 120 }}>
          <Table>
            <EnhancedTableHead />
            <TableBody>
              <LoadingTable colsNumber={5} />
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          <OrdersTable page={page} handleChangePage={handleChangePage} />
        </Box>
      )}
    </div>
  );
}
