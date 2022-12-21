import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    color: "#0c0e30",
    margin: 8,
    border: "1px solid #e0e0e0",
    borderRadius: 4,
   
  },
  wrapper: {},
  text: {
    color: "#0c0e30",
    marginBottom: "0.5rem",
    marginTop: 0,
    fontSize: 25,
    fontWeight: 700,
    lineHeight: 1.2,
    textTransform: "none",
    whiteSpace: "normal",
  },
  subText: {
    marginBottom: "1.5rem",
    marginTop: 0,
    fontSize: 14,
    lineHeight: 1.2,
    textTransform: "none",
    whiteSpace: "normal",
    color: "#7D879C",
  },
  link: {
    color: "#0c0e30",
    fontSize: 12,
    lineHeight: 1.6,
    textTransform: "none",
    whiteSpace: "normal",
    fontWeight: 900,
    borderBottom: "2px solid #D23F57",
  },
  image: {
    opacity: 0.8,
    "&:hover": {
      opacity: 1,
    },
  },
}));
