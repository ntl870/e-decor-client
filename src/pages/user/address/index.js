import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import RoomIcon from "@material-ui/icons/Room";
import { LoadingTable } from "components/common/LoadingTable";
import { EmptyRows } from "components/orders/table/common/EmptyData";
import AddressForm from "components/user/addressForm";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteAddress, getAddresses } from "redux/addressRedux";
import { addressSelector } from "redux/selectors";
import { getAddressText } from "utils/helpers";
import { useStyles } from "./styles";

export default function Address() {
  const history = useHistory();
  const { addresses, isUpdating, isLoading } = useSelector(addressSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  //

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch, isUpdating]);

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <RoomIcon className={classes.icon} />
          <Typography className={classes.title}>My Addresses</Typography>
        </Box>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            id ? history.push("/address") : history.push("/address/add");
          }}
        >
          {id ? "Back To Address" : "Add New Address"}
        </Button>
      </Box>
      <Box my={2} mb={20}>
        {id ? (
          <AddressForm />
        ) : (
          <TableContainer component={Paper} style={{ marginBottom: 64 }}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Receiver's Name</TableCell>
                  <TableCell>Address Detail</TableCell>
                  <TableCell align="center">Phone Number</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <LoadingTable />
                ) : (
                  <>
                    {addresses?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {row?.name ? row?.name : "Vu Thu"}
                        </TableCell>
                        <TableCell>{getAddressText(row)}</TableCell>
                        <TableCell align="center">
                          {row?.phone ? row?.phone : "0123456789"}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Edit">
                            <IconButton
                              aria-label="edit"
                              onClick={() => {
                                history.push(`address/${row?.id}`);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              aria-label="delete"
                              onClick={() => {
                                dispatch(deleteAddress(row?.id));
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                    <EmptyRows
                      isEmptyTable={addresses?.length === 0}
                      type={"addresses"}
                    />
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {/* {!addresses?.length && !isLoading && !id && !isUpdating && (
          <Paper>
            <Box
              style={{ height: 350 }}
              p={1}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <img alt="" src={Images.NO_DATA} />
              <Box mt={2} style={{ color: "#3f51b5" }}>
                No Data
              </Box>
            </Box>
          </Paper>
        )} */}
      </Box>
      <ToastContainer autoClose={2000} style={{ marginTop: "100px" }} />
    </Box>
  );
}
