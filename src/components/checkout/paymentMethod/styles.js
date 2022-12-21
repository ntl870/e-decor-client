import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {},
  icon: {
    marginRight: 8,
  },
  subText: {
    color: "rgba(0,0,0,.54)",
  },
  totalText: {
    fontWeight: "bold",
    color: "rgba(0,0,0,.54)",
    fontSize: 18,
  },
  buttonProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -42,
  },
}));
