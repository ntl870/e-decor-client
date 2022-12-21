import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
  },
  top: {
    padding: "17px 30px 56px ",
    color: "white",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundImage: ({ coverImageUrl }) =>
      `linear-gradient(rgba(43, 52, 69, 0.8), rgba(43, 52, 69, 0.8)), url(${coverImageUrl})`,
  },
  text: {
    marginBottom: 4,
    marginTop: 0,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.5,
  },
  avatar: {
    position: "relative",
    fontSize: "1.25rem",
    lineHeight: 1,
    height: 64,
    width: 64,
    marginTop: -32,
    border: "4px solid rgb(246, 249, 252)",
  },
  icon: {
    marginRight: 8,
  },
  rating: {
    "& .MuiRating-root": { marginBottom: 8, marginLeft: -4 },
    "& .MuiSvgIcon-root": { width: 18, height: 18 },
    "& .MuiRating-decimal": { padding: 4 },
    "& .MuiRating-iconEmpty": { color: "rgb(255 255 255 / 72%) !important" },
  },
}));
