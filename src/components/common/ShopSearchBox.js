import {
  Box,
  FormControl,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import AppsIcon from "@material-ui/icons/Apps";
import ViewListIcon from "@material-ui/icons/ViewList";
import SearchBar from "material-ui-search-bar";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCategories } from "redux/categoryRedux";
import { storeShopKeyword } from "redux/filterRedux";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 32,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 40,
  },
  selectInput: {
    height: 26,
    padding: "8px 15px",
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    width: "100%",
  },
  select: {
    marginLeft: 16,
    border: "1px solid rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  },
  text: { fontSize: 16, fontWeight: 600 },
  subText: { color: "#7D879C" },

  searchbar: {
    background: "#F5F5F5",
    border: `1px solid #E0E0E0`,
    boxShadow: "none",
    height: "42px !important",
  },
}));

const MenuProps = {
  PaperProps: {
    style: {
      marginTop: 40,
      width: 200,
    },
  },
};
export default function ShopSearchBox() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const classes = useStyles();
  const [shopKeyword, setShopKeyword] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const handleChangeDropdown = (e) => {
    setCategoryValue(e.target.value);
    history.push("/products");
  };

  return (
    <Paper component="form" className={classes.root}>
      <SearchBar
        value={shopKeyword}
        className={classes.searchbar}
        onCancelSearch={() => dispatch(storeShopKeyword(""))}
        onKeyUp={() => {}}
        onChange={(newValue) => {
          // setShopKeyword(newValue);
          // dispatch(storeShopKeyword(newValue));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setShopKeyword(e.target.value);
            dispatch(storeShopKeyword(e.target.value));
          }
        }}
        placeholder={"Search in this shop ..."}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          mx={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography className={classes.subText}>Short By:</Typography>
          <FormControl variant="outlined" className={classes.select}>
            <Select
              value={categoryValue}
              name={"category"}
              displayEmpty
              MenuProps={MenuProps}
              input={<InputBase classes={{ input: classes.selectInput }} />}
              onChange={handleChangeDropdown}
              inputProps={{ MenuProps: { disableScrollLock: true } }}
            >
              <MenuItem key={"0"} value={""}>
                Popular
              </MenuItem>
              <MenuItem key={"1"} value={"1"}>
                Price Low To High
              </MenuItem>
              <MenuItem key={"2"} value={"2"}>
                Price High To Low
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          mx={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography className={classes.subText}>View:</Typography>
          <Box ml={1}>
            <IconButton style={{ color: "#D23F57" }}>
              <AppsIcon />
            </IconButton>
            <IconButton>
              <ViewListIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
