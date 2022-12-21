import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {},
  qtyBtn: {
    minWidth: 20,
    padding: 5,
  },
  headText: {
    fontSize: 30,
    fontWeight: 700,
    color: "#2b3445",
  },
  divider: {
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: "black",
  },
  price: {
    color: "rgb(210, 63, 87)",
    fontSize: 25,
    fontWeight: 700,
  },
  buyBtn: {
    marginLeft: 8,
  },

  img: {
    "& :hover": {
      border: "1px solid black",
    },
  },
  buttonProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});
