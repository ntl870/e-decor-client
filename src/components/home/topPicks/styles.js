import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(6),
  },
  topPicks: {
    color: "#2B3445",
    fontSize: 25,
    fontWeight: 700,
    marginLeft: 16,
    marginBottom: -16,
  },
  blog: {
    color: "#2B3445",
    fontSize: 25,
    fontWeight: 700,
  },
  paper: {
    marginTop: 20,
    paddingTop: 20,
  },
}));
