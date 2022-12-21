import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
    paddingTop: 150,
  },
  root: {
    backgroundColor: "rgb(255, 255, 255)",
    color: "rgb(43, 52, 69)",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
    overflow: "hidden",
    borderRadius: 8,
    marginBottom: 32,
    paddingBottom: 20,
  },
  wallpaper: {
    height: 202,
    background:
      "url(https://bazar-react.vercel.app/assets/images/banners/shop-cover.png) center center / cover",
  },
  main: {
    display: "flex",
    marginTop: -64,
    paddingLeft: 30,
    paddingRight: 30,
    flexWrap: "wrap",
  },

  avatar: {
    position: "relative",
    height: 120,
    width: 120,
    marginRight: 37,
    border: "4px solid rgb(246, 249, 252)",
  },
  info: { flex: "1 1 0px", minWidth: 250 },

  top: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 3,
    marginBottom: 24,
  },
  bottom: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    backgroundColor: "rgb(15, 52, 96)",
    borderRadius: 4,
    padding: "4px 16px",
    display: "inline-block",
    marginTop: 8,
    marginBottom: 8,
  },
  text: {
    marginBottom: 0,
    marginTop: 0,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.5,
    color: "rgb(246, 249, 252)",
  },

  link: {
    display: "flex",
    marginTop: 8,
    marginBottom: 8,
  },
  subText: {
    display: "flex",
    color: "rgb(125, 135, 156)",
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
    marginLeft: 8,
  },

  linkIcon: {
    width: 30,
    height: 30,
    fontSize: "1.875rem",
    marginRight: 10,
  },
}));
