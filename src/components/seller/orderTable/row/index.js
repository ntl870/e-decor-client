import { Chip, IconButton, Tooltip } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React from "react";
import { Link } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../common/styles";
import { useStyles } from "./styles";
import { format } from "date-fns";
import { STATUS_COLORS, ORDER_STATUS } from "constants/index";
export default function EnhancedTableRow(props) {
  const { row } = props;
  const classes = useStyles();
  return (
    <StyledTableRow key={row.id}>
      <StyledTableCell align="center">{row?.id}</StyledTableCell>
      <StyledTableCell align="center" className={classes.chip}>
        <Chip
          color="primary"
          size="small"
          label={row?.status}
          style={{
            letterSpacing: 1.2,
            fontSize: 12,
            backgroundColor: STATUS_COLORS[ORDER_STATUS.indexOf(row?.status)],
          }}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        {format(new Date(row?.createdAt), "MMM dd, yyyy")}
      </StyledTableCell>
      <StyledTableCell align="center" style={{ color: "red" }}>
        ${(row?.amount + row?.shippingUnit?.fee)?.toFixed(1)}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Tooltip title="View detail" arrow>
          <Link to={`/shop/orders/${row?.id}`}>
            <IconButton>
              <ArrowForwardIcon className={classes.icon} />
            </IconButton>
          </Link>
        </Tooltip>
      </StyledTableCell>
    </StyledTableRow>
  );
}
