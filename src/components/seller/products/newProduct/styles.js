import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  input: {
    height: 37.65,
  },
  selectInput: { margin: "0 5px" },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  divider: {
    width: 170,
    padding: theme.spacing(0, 1),
  },
  dividerText: {
    color: "#9396b9",
    padding: theme.spacing(0, 1),
  },

  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(24),
    height: theme.spacing(24),
  },

  avatarWrapper: {
    backgroundColor: "white",
    width: 200,
    height: 200,
    border: `1px solid ${grey[100]}`,
    padding: 5,
    boxShadow: `0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]}`,
    marginBottom: 8,
  },

  editorToolbar: {
    backgroundColor: `rgb(250, 250, 250)`,
  },
  // editor: {
  //   border: `1px solid #cccccc`,
  //   padding: 8,
  //   borderRadius: 4,
  // },
  editor: {
    "& .ql-container": {
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      // background: "#fefcfc",
      height: 200,
    },
    "& .ql-toolbar": {
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      background: "#f5f5f5",
    },
  },
  paper: {
    marginTop: 50,
  },
}));
