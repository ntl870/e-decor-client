import { TableCell, TableHead, TableSortLabel } from "@material-ui/core";
import React from "react";
import { StyledTableRow } from "../common/styles";
import { useStyles } from "./styles";

export default function EnhancedTableHead(props) {
  const classes = useStyles();

  const headCells = [
    { id: "order", label: "Order #" },
    { id: "status", label: "Status" },
    { id: "datePurchased", label: "Date purchased" },
    { id: "total", label: "Total" },
  ];
  return (
    <TableHead>
      <StyledTableRow>
        {headCells?.map((headCell, index) => (
          <TableCell
            key={index}
            align="center"
            padding={"normal"}
            className={classes.tableCell}
          >
            {headCell.label}
          </TableCell>
        ))}
        <TableCell className={classes.tableCell} width={"10%"}>
          <TableSortLabel>Action</TableSortLabel>
        </TableCell>
      </StyledTableRow>
    </TableHead>
  );
}
