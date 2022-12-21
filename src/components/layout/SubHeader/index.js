import {
  Box,
  Container,
  Divider,
  FormControl,
  InputBase,
  MenuItem,
  Select,
} from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import LanguageIcon from "@material-ui/icons/Language";
import React from "react";
import { Link } from "react-router-dom";
import { getToken } from "utils/helpers";
import { useStyles } from "./styles";

export default function SubHeader() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Box className={classes.box}>
          <Link className={classes.link} to="/shops">
            All Shops
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.divider}
          />
          <Link className={classes.link} to="/shop/settings">
            Setup Your Shop
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.divider}
          />
          <Link className={classes.link} to="/blog">
            Blog
          </Link>
        </Box>
        <Box className={classes.box}>
          <Box className={classes.help}>
            <HelpOutlineIcon className={classes.helpIcon} />
            <Link className={classes.link} to="/help">
              Help
            </Link>
          </Box>
          <FormControl variant="outlined" className={classes.languages}>
            <Select
              value={"EN"}
              name={"size"}
              displayEmpty
              input={
                <InputBase
                  startAdornment={<LanguageIcon className={classes.icon} />}
                  classes={{ input: classes.input }}
                  disableunderline="true"
                />
              }
            >
              {["EN", "VI"]?.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {getToken() ? (
            <>
              <Link className={classes.link} to="/about-us">
                About Us
              </Link>
            </>
          ) : (
            <>
              <Link className={classes.link} to="/sign-up">
                Sign Up
              </Link>
              <Divider
                orientation="vertical"
                flexItem
                className={classes.divider}
              />
              <Link className={classes.link} to="/login">
                Login
              </Link>
            </>
          )}
        </Box>
      </Container>
      SubHeader
    </div>
  );
}
