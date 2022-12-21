import { Box, Paper } from "@material-ui/core";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import React from "react";
import { NavLink } from "react-router-dom";
import { useStyles } from "./styles";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";

export default function Sidebar() {
  const classes = useStyles();

  return (
    <Paper>
      <Box pt={4} pb={2}>
        <Box display="flex" flexDirection="column">
          <NavLink
            className={classes.navLink}
            to="/shop/dashboard"
            activeClassName={classes.active}
          >
            <DashboardOutlinedIcon className={classes.icon} />
            Dashboard
          </NavLink>
          <NavLink
            className={classes.navLink}
            to="/shop/products"
            activeClassName={classes.active}
          >
            <AssignmentOutlinedIcon className={classes.icon} />
            Products
          </NavLink>
          <NavLink
            className={classes.navLink}
            to="/shop/add-product"
            activeClassName={classes.active}
          >
            <NoteAddOutlinedIcon className={classes.icon} />
            Add new product
          </NavLink>
          <NavLink
            className={classes.navLink}
            to="/shop/orders"
            activeClassName={classes.active}
          >
            <ShoppingCartOutlinedIcon className={classes.icon} />
            Orders
          </NavLink>
          <NavLink
            className={classes.navLink}
            to="/shop/settings"
            activeClassName={classes.active}
          >
            <SettingsOutlinedIcon className={classes.icon} />
            Settings
          </NavLink>
          <NavLink
            className={classes.navLink}
            to="/shop/promotions"
            activeClassName={classes.active}
          >
            <LocalOfferOutlinedIcon className={classes.icon} />
            Promotions
          </NavLink>
        </Box>
      </Box>
    </Paper>
  );
}
