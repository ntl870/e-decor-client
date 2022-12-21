import React from "react";
import { TableRow } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { StyledTableCell } from "./styles";

const COLS = [1, 2, 3, 4, 5, 6];
const ROWS = [1, 2, 3, 4, 5];

export const LoadingTable = () => {
  return ROWS?.map((el) => (
    <TableRow key={el} height={59}>
      {COLS?.map((el) => (
        <StyledTableCell key={el}>
          <Skeleton />
        </StyledTableCell>
      ))}
    </TableRow>
  ));
};
