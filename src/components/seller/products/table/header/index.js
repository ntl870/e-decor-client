import { TableCell, TableHead } from "@material-ui/core";
import React from "react";
import { StyledTableRow } from "../common/styles";
import { useStyles } from "./styles";

export default function EnhancedTableHead(props) {
  const classes = useStyles();
  const { order, orderBy } = props;

  const headCells = [
    { id: "productId", label: "ID" },
    { id: "name", label: "Name" },
    { id: "stock", label: "Stock" },
    { id: "price", label: "Price Range" },
  ];
  return (
    <TableHead>
      <StyledTableRow>
        {headCells?.map((headCell, index) => (
          <TableCell
            key={index}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.tableCell}
            width={index === 3 ? "15%" : null}
          >
            {headCell.label}
          </TableCell>
        ))}
        <TableCell className={classes.tableCell} align="center" width={"10%"}>
          Action
        </TableCell>
      </StyledTableRow>
    </TableHead>
  );
}
