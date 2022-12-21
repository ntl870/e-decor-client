import { makeStyles } from "@material-ui/core/styles";

export const useToolbarStyles = makeStyles({
  root: {
    borderBottom: `1px solid #E0E0E0`,
    borderRadius: "5px 5px 0px 0px",
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: "space-between",
  },
  leftToolbar: {
    display: "flex",
    height: 33,
    alignItems: "center",
  },
  moreBtn: {
    backgroundColor: "#FFFFFF",
    marginRight: 10,
  },
  searchbar: {
    background: "#F5F5F5",
    border: `1px solid #E0E0E0`,
    boxShadow: "none",
    height: "33px !important",
  },

  input: {
    border: `1px solid #E0E0E0`,
    height: 26,
    padding: "3px 15px",
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    "&:hover": {
      border: `1px solid #bdbdbd`,
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
    "&:active": { border: `1px solid blue` },
    "&:focus": { borderRadius: 4 },
  },
  selectInput: {
    margin: "0 10px",
  },
  formControl: {
    margin: 8,
    minWidth: 120,
  },
});

export const MenuProps = {
  PaperProps: {
    style: {
      boxShadow: "0 1px 5px 1px rgb(0 0 0 / 20%)",
    },
  },
};
