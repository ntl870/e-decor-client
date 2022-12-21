import { grey } from "@material-ui/core/colors";
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
  rating: {
    "& .MuiRating-root": { marginBottom: 8, marginLeft: -4 },
    "& .MuiSvgIcon-root": { width: 32, height: 32 },
    "& .MuiRating-decimal": { padding: 4 },
    // "& .MuiRating-iconEmpty": { color: "rgb(255 255 255 / 72%) !important" },
  },

  //
  avatarWrapper: {
    backgroundColor: "white",
    width: 150,
    height: 150,
    border: `1px solid ${grey[100]}`,
    padding: 5,
    boxShadow: `0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]}`,
    marginBottom: 8,

    transition: ".5s ease",
    backfaceVisibility: "hidden",
  },

  container: {
    position: "relative",
  },

  btn: {
    transition: ".5s ease",
    position: "absolute",
    top: 50,
    left: 50,
  },
});
