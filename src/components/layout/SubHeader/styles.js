import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1000,
    background: "#0c0e30",
    color: "#fff",
    height: 40,
    fontSize: 12,
    position: "fixed",
    width: "100%",
  },
  container: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
    padding: "1rem",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
    "@media (min-width: 1200px)": {
      maxWidth: 1200,
    },
  },
  box: {
    display: "flex",
    alignItems: "center",
    marginRight: -16,
    marginLeft: -16,
  },
  divider: {
    backgroundColor: "white",
  },
  link: {
    color: "white",
    margin: theme.spacing(0, 2),
    transition: "color 150ms ease-in-out",
    cursor: "pointer",
    "&:hover": { color: "#D23F57 !important", textDecoration: "none" },
  },
  input: {
    color: "white",
    paddingTop: 0,
    paddingBottom: 0,
  },
  languages: {
    display: "flex",
    alignItems: "center",
    maxHeight: 21,
    "& .MuiSelect-icon": {
      color: "white !important",
    },
  },
  icon: {
    color: "white",
    marginRight: 4,
  },
  help: {
    display: "flex",
  },
  helpIcon: {
    marginRight: -8,
  },
}));
