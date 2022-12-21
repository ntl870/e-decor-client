import { makeStyles } from "@material-ui/core/styles";

export const useFooterStyles = makeStyles({
  root: {
    padding: 15,
    borderRadius: "0px 0px 5px 5px",
    borderTop: "none",
  },

  pagination: {
    "& .Mui-selected": {
      backgroundColor: `#000 !important`,
      color: "#FFF",
    },
  },
});
