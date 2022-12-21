import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {},
  icon: {
    marginRight: 8,
  },
  shop: {
    fontSize: 18,
    cursor: "pointer",
    "&:hover": { color: "#D23F57", textDecoration: "underline" },
  },
  line: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2 /* number of lines to show */,
    "line-clamp": 2,
    "-webkit-box-orient": "vertical",
    maxWidth: 300,
    fontSize: 16,
    fontWeight: "bold",
  },
}));
