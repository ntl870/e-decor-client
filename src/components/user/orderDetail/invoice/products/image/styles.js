import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  headText: {
    fontWeight: 500,
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
    width: 154,
    height: 154,
    border: `1px solid ${grey[100]}`,
    // padding: 4,
    boxShadow: `0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]}`,
    marginBottom: 4,

    transition: ".5s ease",
    backfaceVisibility: "hidden",
  },

  container: {
    position: "relative",
  },

  btn: {
    transition: ".5s ease",
    position: "absolute",
    top: 60,
    left: 60,
  },
});
