import { AppBar, Toolbar } from "@material-ui/core";
import Logo from "components/common/Logo";
import React from "react";
import { useStyles } from "./styles";

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Logo />
      </Toolbar>
    </AppBar>
  );
}
