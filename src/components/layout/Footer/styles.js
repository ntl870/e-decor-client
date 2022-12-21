import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  footer: {
    position: "absolute",
    minWidth: "100vw",
    // bottom: 0,
  },
  root: {
    backgroundColor: "#0c0e30",
    color: "#FFFFFF",
  },
  container: {
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
    display: "block",
    padding: "1rem",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
    "@media (min-width: 1200px)": {
      maxWidth: 1200,
    },
  },
  wrapper: {
    padding: theme.spacing(10, 0),
    overflow: "hidden",
  },
  description: {
    marginBottom: 20,
    marginTop: 16,
    fontSize: 14,
    color: "#AEB4BE",
    textTransform: "none",
    whiteSpace: "normal",
  },
  download: {
    display: "flex",
    flexWrap: "wrap",
    margin: -8,
  },
  downloadItem: {
    display: "flex",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#0C2A4D",
    color: "white",
    padding: "10px 16px",
    margin: 8,
  },
  downloadText: {
    marginLeft: 8,
  },
  subText: {
    fontSize: 8,
    fontWeight: 600,
    lineHeight: 1,
  },
  mainText: {
    fontSize: 14,
    fontWeight: 900,
  },
  text: {
    fontSize: 25,
    fontWeight: 600,
    marginBottom: 20,
    lineHeight: 1,
    color: "white",
  },

  link: {
    position: "relative",
    display: "block",
    padding: "0.3rem 0rem",
    color: "#AEB4BE",
    cursor: "pointer",
    borderRadius: 4,
    "&:hover": {
      color: "#F6F9FC",
    },
  },
  address: {
    paddingTop: 4.8,
    paddingBottom: 4.8,
    color: "#AEB4BE",
  },
  email: {
    paddingTop: 4.8,
    paddingBottom: 4.8,
    color: "#AEB4BE",
  },
  phone: {
    paddingTop: 4.8,
    paddingBottom: 4.8,
    marginBottom: 16,
    color: "#AEB4BE",
  },
  socialMedia: {
    marginLeft: -14,
    marginRight: -5,
  },
  icon: {
    color: "white",
  },
}));
