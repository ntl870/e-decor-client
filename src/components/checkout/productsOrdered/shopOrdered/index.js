import {
  Box,
  Button,
  Divider,
  Grid,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Radio,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import ForumIcon from "@material-ui/icons/Forum";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import StorefrontIcon from "@material-ui/icons/Storefront";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  setOrderShipping,
  storePromotionId,
  storeVoucherPrice,
} from "redux/orderRedux";
import {
  orderSelector,
  promotionSelector,
  shipmentSelector,
} from "redux/selectors";
import { getDiscount, hasSuitableVoucher } from "utils/helpers";
import { useStyles } from "./styles";
const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

export default function ShopOrdered(props) {
  const { shopId, shopName, orderItems, amount, shippingUnitId, shipping } =
    useSelector(orderSelector);
  //
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [voucherValue, setVoucherValue] = useState(null);
  const { promotions } = useSelector(promotionSelector);
  //
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };
  const handleCloseMenuItem = (e) => {
    setAnchorEl(null);
    setVoucherValue(e);
    dispatch(
      storeVoucherPrice((amount * getDiscount(promotions, e)?.discount) / 100)
    );
    dispatch(storePromotionId(e));
  };

  // shipment
  const [anchorElShip, setAnchorElShip] = useState(null);

  const handleClickShip = (event) => {
    setAnchorElShip(event.currentTarget);
  };

  const handleCloseShip = (e) => {
    setAnchorElShip(null);
  };
  const handleCloseMenuItemShip = (e) => {
    setAnchorElShip(null);
    dispatch(setOrderShipping(shipments.find((item) => +item.id === +e)));
  };
  const { shipments } = useSelector(shipmentSelector);

  return (
    <Paper className={classes.root}>
      <Box p={2} mb={4}>
        <Box display="flex" alignItems="center" my={1}>
          <StorefrontIcon style={{ marginRight: 8 }} />
          <Typography
            className={classes.shop}
            onClick={() => history.push(`/shops/${shopId}`)}
          >
            {shopName}
          </Typography>
          <Divider
            orientation="vertical"
            style={{
              marginRight: 8,
              marginLeft: 8,
              // color: "black",
              // backgroundColor: "black",
              height: 20,
            }}
          />

          <ForumIcon style={{ marginRight: 8 }} />
          <Typography className={classes.text}>Chat Now</Typography>
        </Box>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {orderItems?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    width="30%"
                    size="small"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      history.push(`/product/${row?.id}`);
                    }}
                  >
                    <Box ml={2} display="flex" alignItems="center">
                      <img
                        style={{ marginRight: 16 }}
                        width={50}
                        height={50}
                        src={row?.image}
                        alt=""
                      />
                      <Box className={classes.line}>{row?.name}</Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    style={{ cursor: "pointer" }}
                    width="20%"
                    onClick={() => {
                      history.push(`/product/${row?.id}`);
                    }}
                  >
                    {row?.productVersionName}
                  </TableCell>
                  <TableCell width="15%">${row?.price}</TableCell>
                  <TableCell width="15%">{row?.quantity}</TableCell>
                  <TableCell width="10%" className={classes.price}>
                    ${row?.quantity * row?.price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          py={1}
          style={{ borderTop: "1px solid #ccc", borderTopStyle: "dashed" }}
        >
          <Box display="flex" alignItems="center">
            <LocalOfferOutlinedIcon style={{ marginRight: 8 }} />
            <Typography className={classes.text} style={{ fontSize: 18 }}>
              Shop Voucher
            </Typography>
          </Box>

          <Box mr={10} display="flex" alignItems="center">
            {hasSuitableVoucher(promotions, amount) ? (
              <Button color="primary" onClick={handleClick}>
                {voucherValue ? "Change Voucher" : "Select Voucher"}
              </Button>
            ) : (
              <Box>No Suitable Vouchers</Box>
            )}

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              disableScrollLock={true}
            >
              {promotions?.map(
                (item, index) =>
                  amount >= item.standarFee && (
                    <MenuItem
                      key={index}
                      value={item?.id}
                      onClick={() => handleCloseMenuItem(item?.id)}
                    >
                      <Radio checked={+voucherValue === +item?.id} />
                      <ListItemText
                        primary={item.content}
                        secondary={`Discount ${item.discount} % for order from $${item.standarFee}`}
                      />
                    </MenuItem>
                  )
              )}
            </Menu>
            {voucherValue ? (
              <Typography
                className={classes.text}
                style={{
                  color: "rgb(210, 63, 87)",
                  marginLeft: 8,
                  marginRight: 8,
                }}
              >
                - $
                {(amount * getDiscount(promotions, voucherValue)?.discount) /
                  100}
              </Typography>
            ) : (
              <></>
            )}
          </Box>
        </Box>
        <Box
          py={2}
          display="flex"
          justifyContent="space-between"
          style={{ borderTop: "1px solid #ccc", borderTopStyle: "dashed" }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center">
                <Typography className={classes.text} style={{ marginRight: 8 }}>
                  Message:
                </Typography>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="(Optional) Leave a message to seller"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                mr={11}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography className={classes.text}>
                  Shipping Option:
                </Typography>

                <Typography className={classes.text}>
                  {shipping?.name}
                </Typography>
                <Button
                  color="primary"
                  style={{ marginRight: 16 }}
                  onClick={handleClickShip}
                >
                  Change
                </Button>
                <Menu
                  id="simple-menu-ship"
                  anchorEl={anchorElShip}
                  keepMounted
                  open={Boolean(anchorElShip)}
                  onClose={handleCloseShip}
                  disableScrollLock={true}
                >
                  {shipments?.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={item?.id}
                      onClick={() => handleCloseMenuItemShip(item?.id)}
                    >
                      <Radio checked={+shippingUnitId === +item?.id} />
                      <ListItemText
                        primary={item.name}
                        secondary={item.workingTime}
                        style={{ marginRight: 16 }}
                      />
                      <ListItemSecondaryAction>
                        <Box
                          style={{ color: "#D23F57" }}
                          pl={2}
                          edge="end"
                          aria-label="comments"
                        >
                          $ {item?.fee}
                        </Box>
                      </ListItemSecondaryAction>
                    </MenuItem>
                  ))}
                </Menu>
                <Typography className={classes.text}>
                  ${shipping?.fee}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          py={2}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          style={{ borderTop: "1px solid #ccc", borderTopStyle: "dashed" }}
        >
          <Box
            mr={10}
            width="25%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              className={classes.text}
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "rgba(0,0,0,.54)",
              }}
            >
              Order Total ( {orderItems.length} items):
            </Typography>
            <Typography
              style={{
                color: "rgb(210, 63, 87)",
                fontSize: 18,
              }}
            >
              ${amount}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
