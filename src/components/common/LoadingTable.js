import React, { useState, useEffect } from "react";
import { TableCell, TableRow } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
// import { StyledTableCell } from "containers/projects/style";

const rows = [1, 2, 3, 4, 5];

export const LoadingTable = ({ colsNumber }) => {
  const [cols, setCols] = useState([1, 2, 3, 4]);
  useEffect(() => {
    if (colsNumber) setCols(Array.from(Array(colsNumber).keys()));
  }, [colsNumber]);

  return rows.map((el) => (
    <TableRow key={el} height={70}>
      {cols.map((el) => (
        <TableCell key={el}>
          <Skeleton />
        </TableCell>
      ))}
    </TableRow>
  ));
};
