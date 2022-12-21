import React from "react";
import { TableRow, Typography } from "@material-ui/core";
import { StyledTableCell, useStyles } from "./styles";

const EMPTY_TABLE = "No orders yet.";

export const EmptyRows = ({ isEmptyTable, type }) => {
  const classes = useStyles();
  return isEmptyTable ? (
    <TableRow className={classes.height}>
      <StyledTableCell colSpan={6}>
        <Typography color="primary" align="center">
          {isEmptyTable ? (type ? `No ${type} yet.` : EMPTY_TABLE) : ""}
        </Typography>
      </StyledTableCell>
    </TableRow>
  ) : (
    <></>
  );
};
