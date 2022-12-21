import { Box, IconButton, Tooltip } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DeleteIcon from "@material-ui/icons/Delete";
import { useConfirm } from "material-ui-confirm";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteProduct } from "redux/productRedux";
import * as _ from "underscore";
import { getPrice } from "utils/helpers";
import { StyledTableCell, StyledTableRow } from "../common/styles";
import { useStyles } from "./styles";

export default function EnhancedTableRow(props) {
  const { row } = props;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const handleDelete = (item) => {
    confirm({ description: `This will permanently delete this product.` })
      .then(() => {
        dispatch(deleteProduct(item));
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  return (
    <StyledTableRow key={row.id}>
      <StyledTableCell>{_.get(row, "id")}</StyledTableCell>
      <StyledTableCell>{_.get(row, "name")}</StyledTableCell>
      <StyledTableCell style={{ paddingLeft: 30 }}>
        {_.get(row, "totalVersions")}
      </StyledTableCell>
      <StyledTableCell style={{ color: "red", paddingLeft: 30 }}>
        ${getPrice(_.get(row, "minPrice"), _.get(row, "maxPrice"))}
      </StyledTableCell>
      <StyledTableCell>
        <Box display="flex">
          <Tooltip title="View detail" arrow>
            <Link to={`${history.location.pathname}/${row.id}`}>
              <IconButton>
                <ArrowForwardIcon className={classes.icon} />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton
              onClick={() => {
                handleDelete(row.id);
              }}
            >
              <DeleteIcon className={classes.icon} />
            </IconButton>
          </Tooltip>
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
}
