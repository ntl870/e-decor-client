import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    color: "#2b3445",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "0px 1px 3px rgb(3 0 71 / 9%)",
    overflow: "auto",
    borderRadius: 8,
    padding: "18px 27px",
  },
  rating: {
    // marginTop: 8,
  },
  headText: {
    fontSize: 16,
    fontWeight: 600,
  },
}));
