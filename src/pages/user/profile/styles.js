import { blue, grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  title: {
    color: "#2b3445",
    fontSize: 25,
    marginBottom: 0,
    marginTop: 0,
    fontWeight: 700,
    lineHeight: 1,
    marginLeft: 12,
    whiteSpace: "normal",
  },
  icon: {
    fontSize: 24,
    color: "#D23F57",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    border: `1px solid ${grey[500]}`,
    boxShadow: `0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]}`,
  },
  buttonProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -200,
  },
}));
