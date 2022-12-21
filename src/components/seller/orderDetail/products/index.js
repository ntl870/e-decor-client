import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import { format } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateOrderStatus } from "redux/orderRedux";
import { orderSelector } from "redux/selectors";
import { isEmpty } from "underscore";
import Product from "./product";
import { useStyles } from "./styles";

export default function Products({ order }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const defaultStatus = order?.status;
  const [status, setStatus] = useState(order?.status);
  const { isLoading } = useSelector(orderSelector);

  const handleChange = (event) => {
    setStatus(event?.target?.value);
  };

  return (
    <Box>
      {defaultStatus !== status && (
        <Box style={{ width: "100%" }}>
          <Button
            style={{ width: "100%" }}
            variant="contained"
            color="secondary"
            onClick={() => {
              dispatch(
                updateOrderStatus({ id: order?.id, status: { status } })
              );
              history.push(`/shop/orders/${order?.id}`);
            }}
          >
            Save Changes
          </Button>
        </Box>
      )}
      <Paper>
        <Box my={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            className={classes.head}
            p={1}
          >
            <Box display="flex" alignItems="center" ml={1}>
              <Box display="flex">
                <Typography className={classes.title}>Order ID: </Typography>
                <Typography>{order?.id}</Typography>
              </Box>
              <Box display="flex" pl={1}>
                <Typography className={classes.title}>Placed on: </Typography>
                <Typography>
                  {!isEmpty(order)
                    ? format(new Date(order?.createdAt), "MMM dd, yyyy")
                    : "xxx"}
                </Typography>
              </Box>
            </Box>
            <Box>
              {defaultStatus === "processing" && (
                <FormControl
                  margin="dense"
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Order Status
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={status}
                    onChange={handleChange}
                    label="Order Status"
                    MenuProps={{ disableScrollLock: true }}
                  >
                    <MenuItem key={"1"} value={"pending"} disabled>
                      Pending
                    </MenuItem>
                    <MenuItem key={"2"} value={"processing"}>
                      Processing
                    </MenuItem>
                    <MenuItem key={"3"} value={"shipped"}>
                      Shipped
                    </MenuItem>
                    <MenuItem key={"4"} value={"delivered"} disabled>
                      Delivered
                    </MenuItem>
                    <MenuItem key={"5"} value={"canceled"}>
                      Cancel
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              {defaultStatus === "pending" && (
                <FormControl
                  margin="dense"
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Order Status
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={status}
                    onChange={handleChange}
                    label="Order Status"
                    MenuProps={{ disableScrollLock: true }}
                  >
                    <MenuItem key={"1"} value={"pending"}>
                      Pending
                    </MenuItem>
                    <MenuItem key={"2"} value={"processing"}>
                      Processing
                    </MenuItem>
                    <MenuItem key={"3"} value={"shipped"}>
                      Shipped
                    </MenuItem>
                    <MenuItem key={"4"} value={"delivered"} disabled>
                      Delivered
                    </MenuItem>
                    <MenuItem key={"5"} value={"canceled"}>
                      Cancel
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              {defaultStatus === "canceled" && (
                <FormControl
                  margin="dense"
                  variant="outlined"
                  className={classes.formControl}
                  disabled
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Order Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={status}
                    onChange={handleChange}
                    label="Order Status"
                    MenuProps={{ disableScrollLock: true }}
                  >
                    <MenuItem key={"5"} value={"canceled"}>
                      Cancel
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              {defaultStatus === "delivered" && (
                <FormControl
                  margin="dense"
                  variant="outlined"
                  className={classes.formControl}
                  disabled
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Order Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={status}
                    onChange={handleChange}
                    label="Order Status"
                    MenuProps={{ disableScrollLock: true }}
                  >
                    <MenuItem key={"5"} value={"delivered"}>
                      Delivered
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              {defaultStatus === "shipped" && (
                <FormControl
                  margin="dense"
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Order Status
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={status}
                    onChange={handleChange}
                    label="Order Status"
                    MenuProps={{ disableScrollLock: true }}
                  >
                    <MenuItem key={"1"} value={"pending"} disabled>
                      Pending
                    </MenuItem>
                    <MenuItem key={"2"} value={"processing"} disabled>
                      Processing
                    </MenuItem>
                    <MenuItem key={"3"} value={"shipped"}>
                      Shipped
                    </MenuItem>
                    <MenuItem key={"4"} value={"delivered"} disabled>
                      Delivered
                    </MenuItem>
                    <MenuItem key={"5"} value={"canceled"} disabled>
                      Cancel
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            </Box>
          </Box>
          {!isLoading && (
            <Box p={2}>
              {order?.orderItems?.map((product, index) => (
                <Product product={product} key={index} />
              ))}
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
