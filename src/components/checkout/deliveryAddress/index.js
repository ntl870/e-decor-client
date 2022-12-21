import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Radio,
  Typography,
} from "@material-ui/core";
import PlaceIcon from "@material-ui/icons/Place";
import AddressForm from "components/user/addressForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderAddress } from "redux/orderRedux";
import { addressSelector, orderSelector } from "redux/selectors";
import { isEmpty } from "underscore";
import { getAddressText } from "utils/helpers";
import { useStyles } from "./styles";

export default function DeliveryAddress() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { address } = useSelector(orderSelector);
  const { addresses, defaultAddressId, isUpdating } =
    useSelector(addressSelector);
  const [addressId, setAddressId] = useState(defaultAddressId);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
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
    setAddressId(e);
    dispatch(setOrderAddress(addresses.find((item) => +item.id === +e)));
  };

  useEffect(() => {
    isEmpty(addresses) && setIsOpenDialog(true);
  }, [addresses, dispatch, isUpdating]);

  useEffect(() => {
    !isEmpty(addresses) && setIsOpenDialog(false);
    !isEmpty(addresses) && dispatch(setOrderAddress(addresses[0]));
  }, [addresses, dispatch]);

  useEffect(() => {
    !isEmpty(addresses) && setAddressId(defaultAddressId);
  }, [addresses, defaultAddressId, dispatch]);
  
  return (
    <Paper className={classes.root}>
      <Box p={2} mb={4}>
        <Box
          display="flex"
          alignItems="center"
          style={{ color: "rgb(210, 63, 87)" }}
          my={1}
        >
          <PlaceIcon style={{ marginRight: 4 }} />
          <Typography className={classes.text} style={{ fontSize: 20 }}>
            Delivery Address
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Box
            display="flex"
            alignItems="center"
            mx={1}
            style={{ fontSize: 18 }}
          >
            <Typography
              className={classes.name}
              style={{ marginRight: 8, fontWeight: 600, fontSize: 18 }}
            >
              {address?.name}
            </Typography>
            <Typography
              className={classes.phone}
              style={{ marginRight: 16, fontWeight: 600, fontSize: 18 }}
            >
              {address?.phone}
            </Typography>
            <Typography
              className={classes.address}
              style={{ marginRight: 8, fontSize: 18 }}
            >
              {address && getAddressText(address)}
            </Typography>
          </Box>
          <Box>
            <Button
              style={{ marginRight: 8 }}
              color="primary"
              variant="outlined"
              onClick={() => {
                setIsOpenDialog(true);
              }}
            >
              ADD NEW
            </Button>
            <Button color="primary" variant="outlined" onClick={handleClick}>
              CHANGE
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              disableScrollLock={true}
            >
              {addresses?.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.id}
                  onClick={() => handleCloseMenuItem(item.id)}
                >
                  <Radio checked={+addressId === +item.id} />
                  <ListItemText primary={getAddressText(item)} />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Box>
      {
        <Dialog open={isOpenDialog} onClose={() => {}} fullWidth maxWidth="xs">
          <DialogTitle
            style={{ marginLeft: 8 }}
            id="form-dialog-title"
            onClose={() => {}}
          >
            Add New Address
          </DialogTitle>
          <AddressForm isCheckout={true} setIsOpenDialog={setIsOpenDialog} />
        </Dialog>
      }
    </Paper>
  );
}
