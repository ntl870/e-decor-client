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
    width: 24,
    height: 24,
    color: "#D23F57",
    "& .MuiSvgIcon-root": {
      width: 24,
      height: 24,
    },
    
  },
}));
