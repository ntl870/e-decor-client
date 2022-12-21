import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
    display: "block",
    padding: "1rem",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
    "@media (min-width: 1200px)": {
      maxWidth: 1200,
    },
    paddingTop: 150,
  },
}));
