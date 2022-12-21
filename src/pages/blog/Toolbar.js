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
import SearchIcon from "@material-ui/icons/Search";
import ViewListIcon from "@material-ui/icons/ViewList";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCategories } from "redux/categoryRedux";
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
  //
  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 300,
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
    borderBottom: "1px solid #eeeeee",
    "&:hover": {
      borderBottomColor: "#2B3445",
    },
  },
  searchIconButton: {
    padding: 10,
  },
}));

const MenuProps = {
  PaperProps: {
    style: {
      marginTop: 40,
      width: 200,
    },
  },
  disablescrolllock: "true",
};
export default function ToolbarBox({ showType, setShowType }) {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState(1);
  const handleChangeDropdown = (e) => {
    setCategoryValue(e.target.value);
    history.push("/products");
  };
  return (
    <Paper component="form" className={classes.root}>
      <Box className={classes.searchRoot}>
        <IconButton className={classes.searchIconButton} aria-label="menu">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.searchInput}
          placeholder="Search post ..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Box>
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
              <MenuItem key={"1"} value={"1"}>
                Newest
              </MenuItem>
              <MenuItem key={"2"} value={"2"}>
                Oldest
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
            <IconButton
              style={{ color: showType ? "#D23F57" : null }}
              onClick={() => setShowType(!showType)}
            >
              <AppsIcon />
            </IconButton>
            <IconButton
              style={{ color: !showType ? "#D23F57" : null }}
              onClick={() => setShowType(!showType)}
            >
              <ViewListIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
