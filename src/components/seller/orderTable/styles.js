import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    "& .MuiIconButton-root": {
      color: "#000000",
    },
    borderRadius: 0,
  },
  table: { paddingLeft: 8 },

  emptyRows: {
    height: ({ emptyRows }) => emptyRows * 59,
  },
});
