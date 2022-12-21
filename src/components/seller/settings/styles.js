import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  avatar: {
    position: "relative",
    height: 80,
    width: 80,
    border: "4px solid rgb(246, 249, 252)",
  },
  uploadInput: {
    display: "none",
  },
  label: {
    "& .MuiIconButton-root": {
      backgroundColor: "#E3E9EF",
      "&:hover": {
        backgroundColor: "rgba(15, 52, 96, 0.04)",
      },
    },
  },

  wallInput: {
    display: "none",
  },
  wallLabel: {
    "& .MuiIconButton-root": {
      backgroundColor: "#E3E9EF",
      "&:hover": {
        backgroundColor: "rgba(15, 52, 96, 0.04)",
      },
    },
  },

  input: {
    height: 37.65,
  },
  selectInput: { margin: "0 5px" },
  formControl: {
    // margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  menuPaper: {
    maxHeight: 300,
  },

  dialogActions: {
    background: "#F5F5F5",
    borderTop: `1px solid "#E0E0E0"`,
    padding: "24px 24px",
  },

  buttonProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: 0,
    marginTop: -12,
    marginLeft: 50,
  },
}));
