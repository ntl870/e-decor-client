import {
  Box,
  Button,
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from "@material-ui/icons/Remove";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteCartItem, updateQuantity } from "redux/cartRedux";
export default function CartItem(props) {
  const {
    isItemSelected,
    labelId,
    classes,
    handleClick,
    row,
    handleClickDelete,
  } = props;

  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    setQuantity(row?.version.cartItems?.[0].quantity);
  }, [row]);
  return (
    <TableRow
      className={classes.row}
      classes={{
        root: classes.tableRowRoot,
        selected: classes.tableRowSelected,
      }}
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
    >
      <TableCell align="center" width="5%">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{ "aria-labelledby": labelId }}
          onClick={(event) => handleClick(event, row?.version.id)}
          disabled={row?.version?.isOutOfStock}
        />
      </TableCell>

      <TableCell
        style={{ cursor: "pointer" }}
        id={labelId}
        scope="row"
        width="35%"
      >
        <Box
          display="flex"
          alignItems="center"
          onClick={() => {
            history.push(`/product/${row?.id}`);
          }}
        >
          <img
            style={{ marginRight: 16 }}
            width={80}
            height={80}
            src={row?.version.image}
            alt=""
          />
          <Box className={classes.line}>{row?.name}</Box>
        </Box>
      </TableCell>
      <TableCell
        style={{ cursor: "pointer" }}
        onClick={() => {
          history.push(`/product/${row?.id}`);
        }}
        width="15%"
      >
        {row?.version.name}
      </TableCell>
      <TableCell width="10%">${row?.version.price}</TableCell>
      <TableCell width="20%">
        <Box className={classes.test} mx={2}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.qtyBtn}
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
                dispatch(
                  updateQuantity({
                    id: row?.cartItemId,
                    body: { quantity: quantity - 1 },
                  })
                );
              }
            }}
          >
            <RemoveIcon />
          </Button>
          <Box component={"span"} px={2}>
            {quantity}
          </Box>
          <Button
            variant="outlined"
            color="primary"
            className={classes.qtyBtn}
            onClick={() => {
              setQuantity(quantity + 1);
              dispatch(
                updateQuantity({
                  id: row?.cartItemId,
                  body: { quantity: quantity + 1 },
                })
              );
            }}
          >
            <AddIcon />
          </Button>
        </Box>
      </TableCell>
      <TableCell width="10%" className={classes.price}>
        ${row?.version.price * quantity}
      </TableCell>
      <TableCell width="5%">
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={(event) => {
              handleClickDelete(event, row?.version.id);
              dispatch(deleteCartItem(row?.cartItemId));
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
