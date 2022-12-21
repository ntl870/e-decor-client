import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import { orderSelector } from "redux/selectors";
import { EmptyRows } from "./common/EmptyData";
import { LoadingTable } from "./common/LoadingTable";
import TableHeader from "./header";
import EnhancedTableRow from "./row";
import { useStyles } from "./styles";
import TableToolbar from "./toolbar";

export default function OrdersTable(props) {
  const { page, handleChangePage } = props;
  const { orders, totalOrders } = useSelector(orderSelector);

  const classes = useStyles();
  const isLoading = false;

  return (
    <Paper style={{ marginBottom: 64 }}>
      <TableToolbar />
      <TableContainer component={Paper} className={classes.root} elevation={0}>
        <Table className={classes.table}>
          <TableHeader />
          <TableBody>
            {isLoading ? (
              <LoadingTable />
            ) : (
              <>
                {orders?.map((row, index) => (
                  <EnhancedTableRow key={index} row={row} />
                ))}

                <EmptyRows isEmptyTable={orders.length === 0} />
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {orders.length === 0 ? (
        <></>
      ) : (
        <Box p={2} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(totalOrders / 5)}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            color="primary"
          />
        </Box>
      )}
    </Paper>
  );
}
