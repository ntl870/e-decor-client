import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 120,
  },
  container: {
    margin: "0 auto",
    width: "100%",

    "@media (min-width: 1200px)": {
      maxWidth: 1200,
    },
  },
}));
