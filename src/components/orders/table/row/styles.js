import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  icon: { color: "rgba(0, 0, 0, 0.54)" },
  chip: {
    "& .MuiChip-label": {
      letterSpacing: 1.2,
      fontSize: 12,
      paddingLeft: 8,
      paddingRight: 8,
    },
    "& .MuiChip-root": {
      paddingLeft: 4,
      paddingRight: 4,
    },
  },
});
