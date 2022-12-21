import {
  Divider,
  FormControl,
  InputBase,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "redux/categoryRedux";
import { useHistory } from "react-router-dom";
import { categorySelector, filterSelector } from "redux/selectors";
import { getCategoryId, getCategoryName } from "utils/helpers";
import { storeCategories, storeKeyword } from "redux/filterRedux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 40,
    display: "flex",
    alignItems: "center",
    width: 550,
    margin: theme.spacing(0, 3),
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
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
}));

export default function SearchInput() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [categoryValue, setCategoryValue] = useState("");
  const storeCategory = useSelector(categorySelector);
  const { keyword, categories } = useSelector(filterSelector);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  
  useEffect(() => {
    categories.length > 1 && setCategoryValue("");
  }, [categories.length, dispatch]);

  useEffect(() => {
    if (
      history.location.pathname.split("/").length === 3 &&
      history.location.pathname.split("/")[1] === "products" &&
      history.location.pathname.split("/")[2]
    )
      setCategoryValue(
        getCategoryId(
          history.location.pathname.split("/")[2],
          storeCategory.categories
        )
      );
    else setCategoryValue("");
  }, [dispatch, history.location.pathname, storeCategory.categories]);

  const handleChangeDropdown = (e) => {
    setCategoryValue(e.target.value);
    dispatch(storeCategories([e.target.value]));

    if (e.target.value)
      history.push(
        `/products/${getCategoryName(e.target.value, storeCategory.categories)}`
      );
    else history.push(`/products/`);
  };
  const handleChangeSearch = (e) => {
    dispatch(storeKeyword(e.target.value));
  };
  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        value={keyword}
        className={classes.input}
        placeholder="Searching for ..."
        inputProps={{ "aria-label": "search" }}
        onChange={handleChangeSearch}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            keyword && history.push("/products");
          }
        }}
      />

      <Divider className={classes.divider} orientation="vertical" />

      <FormControl variant="outlined" className={classes.select}>
        <Select
          value={categoryValue}
          name={"category"}
          displayEmpty
          input={<InputBase classes={{ input: classes.selectInput }} />}
          onChange={handleChangeDropdown}
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem key={"all-categories"} value={""}>
            All Categories
          </MenuItem>
          {storeCategory?.categories?.map((option, index) => (
            <MenuItem key={index} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}
