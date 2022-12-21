import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";

export default function Product(props) {
  const classes = useStyles();
  const { product } = props;
  const history = useHistory();

  return (
    <Box display="flex" p={1} className={classes.root}>
      <Box
        mr={1}
        style={{ cursor: "pointer" }}
        onClick={() => {
          history.push(`/product/${product?.productVersion?.product?.id}`);
        }}
      >
        <img
          width={64}
          height={64}
          src={product?.productVersion?.image}
          alt=""
        />
      </Box>

      <Grid container spacing={1} alignItems="center">
        <Grid item md={5}>
          <Box
            display="flex"
            m={2}
            flexDirection="column"
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/product/${product?.productVersion?.product?.id}`);
            }}
          >
            <Typography className={classes.headText}>
              {product?.productVersion?.product?.name}
            </Typography>
            <Typography className={classes.subText}>
              ${product?.productVersion?.price} x {product?.quantity}
            </Typography>
          </Box>
        </Grid>
        <Grid item md={5}>
          <Box display="flex" m={2}>
            <Typography>{product?.productVersion?.name}</Typography>
          </Box>
        </Grid>
        <Grid item md={2}>
          <Box display="flex" m={2} justifyContent="flex-end">
            <Typography>
              ${product?.productVersion?.price * product?.quantity}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
