import {
  Avatar,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import Logo from "components/common/Logo";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDecorThemes, storeSearch } from "redux/blogRedux";
import { blogSelector, userSelector } from "redux/selectors";
import { logOut } from "redux/userRedux";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid rgb(116, 116, 116)`,
    backgroundColor: "#0c0e30",
    color: "white",
  },
  toolbarTitle: {
    flex: 1,
    cursor: "pointer",
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  custom: {
    borderColor: "rgb(116, 116, 116) !important",
  },
  link: {
    flexShrink: 0,
    color: "white",
    transition: "color 150ms ease-in-out",
    cursor: "pointer",
    "&:hover": { color: "#D23F57 !important", textDecoration: "none" },
  },
}));

export default function Header(props) {
  const { currentUser } = useSelector(userSelector);
  const { search } = useSelector(blogSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { title } = props;
  const [keyword, setKeyword] = useState(search);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logOut());
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={"menuId"}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ marginTop: 40 }}
      MenuListProps={{ onMouseLeave: handleMenuClose }}
      disableScrollLock={true}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link
          to={"/blog/my-posts"}
          className={classes.link}
          style={{ color: "#2B3445" }}
        >
          My blog
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link
          to={"/blog/my-favorite"}
          className={classes.link}
          style={{ color: "#2B3445" }}
        >
          My favorite
        </Link>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <Link
          to={"/home"}
          className={classes.link}
          style={{ color: "#2B3445" }}
        >
          Log out
        </Link>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    dispatch(getDecorThemes());
  }, [dispatch]);
  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Logo />

        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
          onClick={() => history.push("/blog")}
        >
          {title}
        </Typography>
        <FormControl>
          <TextField
            id="outlined-number"
            type="text"
            variant="outlined"
            placeholder="Search Post"
            size="small"
            value={keyword}
            InputProps={{
              classes: { notchedOutline: classes.custom },
              inputProps: {
                min: 0,
                step: 10,
                style: {
                  color: "white",
                  "& .MuiOutlinedInputRoot": {
                    borderColor: "red !important",
                  },
                  borderColor: "white !important",
                },
              },
              endAdornment: <SearchIcon style={{ color: "#747474" }} />,
            }}
            style={{ color: "white" }}
            onChange={(e) => {
              setKeyword(e.target.value);
              if (!e.target.value) dispatch(storeSearch(e.target.value));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                dispatch(storeSearch(e.target.value));
                history.push("/blog/posts");
              }
            }}
          />
        </FormControl>

        {currentUser ? (
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={"menuId"}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            onMouseOver={handleProfileMenuOpen}
            style={{ cursor: "pointer" }}
          >
            <Avatar
              alt=""
              src={currentUser?.avatar}
              style={{ cursor: "pointer" }}
            />
          </IconButton>
        ) : (
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={"menuId"}
            aria-haspopup="true"
            onClick={() => {
              history.push("/login");
            }}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        )}
      </Toolbar>

      {renderMenu}
    </>
  );
}
