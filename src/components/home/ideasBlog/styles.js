import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  headText: {
    marginBottom: 0,
    marginTop: 0,
    fontSize: 25,
    fontWeight: 700,
    lineHeight: 1,
    textTransform: "none",
    whiteSpace: "normal",
    color: "#2B3445",
  },
  cateText: {
    marginBottom: 0,
    marginTop: 0,
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.5,
    textTransform: "none",
    whiteSpace: "normal",
    paddingLeft: "1.5rem",
    paddingBottom: "1rem",
    paddingTop: "1.5rem",
  },
}));
