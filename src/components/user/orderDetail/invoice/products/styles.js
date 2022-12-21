import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  head: {
    backgroundColor: "#F3F5F9",
  },
  title: {
    color: "#7D879C",
    marginRight: 4,
  },
  shop: {
    fontSize: 16,
    cursor: "pointer",
    "&:hover": { color: "#D23F57", textDecoration: "underline" },
  },
});
