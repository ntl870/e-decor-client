import React, { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { commonStyle } from "assets/css/Common";

const useStyles = makeStyles((theme) => ({
  text: {
    color: "black",
  },
  action: {
    borderTop: "1px solid lightgray",
    padding: 20,
  },
}));

export default function AlertDialog({
  open,
  content,
  handleCloseDialog,
  handelActionDialog,
  btnText,
}) {
  const commonClasses = commonStyle();
  const classes = useStyles();
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          <i
            className={`${commonClasses.warning} fas fa-exclamation-triangle`}
          ></i>
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className={classes.text}
          >
            {`${content}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.action}>
          <Button
            onClick={handleCloseDialog}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handelActionDialog}
            color="secondary"
            variant="contained"
            autoFocus
            disableElevation
          >
            {btnText ? btnText : "DELETE"}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
