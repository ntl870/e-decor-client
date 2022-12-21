import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#0c0e30",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: 1200,
    margin: "0 auto",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
  },
}));
