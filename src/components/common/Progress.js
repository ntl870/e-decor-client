 import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "white",
    background: "rgba(0,0,0,0.2)",
  },
}));

export const Progress = ({ isOpen }) => {
  const classes = useStyles();
  return (
    <Backdrop open={isOpen} className={classes.backdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
