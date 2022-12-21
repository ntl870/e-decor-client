import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 596,
    marginTop: 16,
    marginBottom: 16,
  },
  area: {
    paddingBottom: 32,
  },
  headText: {
    marginBottom: 8,
    marginTop: 0,
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.3,
    color: "#0c0e30",
    textTransform: "none",
    whiteSpace: "normal",
  },
  link: {
    marginLeft: 16,
    color: "#2B3445",
    fontSize: 12,
    lineHeight: 1.5,
    fontWeight: 900,
    borderBottom: "2px solid #E63E58",
    textTransform: "none",
    whiteSpace: "normal",
  },
  icon: {
    marginRight: 4,
    color: "#7D879C",
  },
}));
