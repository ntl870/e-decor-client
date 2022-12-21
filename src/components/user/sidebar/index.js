import { Box, Paper, Typography } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import React from "react";
import { NavLink } from "react-router-dom";
import { useStyles } from "./styles";
export default function Sidebar() {
  const classes = useStyles();

  return (
    <Paper>
      <Box pb={2}>
        <Box>
          <Typography className={classes.headText}>DASHBOARD</Typography>
          <Box display="flex" flexDirection="column">
            <NavLink
              className={classes.navLink}
              to="/orders"
              activeClassName={classes.active}
            >
              <ShoppingCartOutlinedIcon className={classes.icon} />
              Orders
            </NavLink>
            <NavLink
              className={classes.navLink}
              to="/wishlist"
              activeClassName={classes.active}
            >
              <FavoriteBorderIcon className={classes.icon} />
              Wishlist
            </NavLink>
            <NavLink
              className={classes.navLink}
              to="/support"
              activeClassName={classes.active}
            >
              <HelpOutlineOutlinedIcon className={classes.icon} />
              Support
            </NavLink>
          </Box>
        </Box>
        <Box>
          <Typography className={classes.headText}>ACCOUNT SETTINGS</Typography>
          <Box display="flex" flexDirection="column">
            <NavLink
              className={classes.navLink}
              to="/profile"
              activeClassName={classes.active}
            >
              <PersonOutlineOutlinedIcon className={classes.icon} />
              Profile Info
            </NavLink>
            <NavLink
              className={classes.navLink}
              to="/address"
              activeClassName={classes.active}
            >
              <RoomOutlinedIcon className={classes.icon} />
              Addresses
            </NavLink>
            <NavLink
              className={classes.navLink}
              to="/change-password"
              activeClassName={classes.active}
            >
              <LockOutlinedIcon className={classes.icon} />
              Change Password
            </NavLink>
            <NavLink
              className={classes.navLink}
              to="/payment-methods"
              activeClassName={classes.active}
            >
              <PaymentOutlinedIcon className={classes.icon} />
              Payment Methods
            </NavLink>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
