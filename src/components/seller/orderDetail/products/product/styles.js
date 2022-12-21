import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  headText: {
    fontWeight: 500,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2 /* number of lines to show */,
    "line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  subText: {
    color: "#7D879C",
  },
});
