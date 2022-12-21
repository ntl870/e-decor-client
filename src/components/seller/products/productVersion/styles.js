import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  avatarWrapper: {
    backgroundColor: "white",
    width: 200,
    height: 200,
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
    top: 100,
    left: 80,
  },
}));
