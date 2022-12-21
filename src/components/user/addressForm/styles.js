import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {},
  headText: {
    margin: 0,
    fontWeight: 400,
    lineHeight: 1.5,
    padding: "26px 30px 1.5rem",
    color: "rgb(125, 135, 156)",
    fontSize: 16,
  },
  navLink: {
    letterSpacing: 1.2,
    display: "flex",
    alignItems: "center",
    transition: "color 150ms ease-in-out 0s",
    borderLeft: "4px solid transparent",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    marginBottom: "1.25rem",
    color: "#2b3445",
    // color: "rgb(125, 135, 156)",

    "&:hover": {
      borderLeft: "4px solid rgb(210, 63, 87)",
      color: "rgb(210, 63, 87)",
    },
  },
  icon: {
    marginRight: 8,
  },

  active: {
    color: "rgb(210, 63, 87)",
    borderLeft: "4px solid rgb(210, 63, 87)",
  },
}));
