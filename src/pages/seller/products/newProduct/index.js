import { Box, Button, Typography } from "@material-ui/core";
import NoShop from "components/common/NoShop";
import NewProductForm from "components/seller/products/newProduct";
import Icons from "constants/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { resetProductVersion } from "redux/productRedux";
import { shopSelector } from "redux/selectors";
import { useStyles } from "./styles";

export default function NewProduct() {
  const classes = useStyles();
  const history = useHistory();
  const storeShop = useSelector(shopSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetProductVersion());
  }, [dispatch]);
  
  return (
    <Box>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Box className={classes.icon}>
            <img src={Icons.PACKAGE_ICON} alt="" />
          </Box>
          <Typography className={classes.title}>Products</Typography>
        </Box>
        {storeShop?.currentShop && (
          <Button
            color="primary"
            variant="outlined"
            onClick={() => history.push(`/shop/products`)}
          >
            Back To Product List
          </Button>
        )}
      </Box>
      {storeShop?.currentShop ? (
        <Box>
          <NewProductForm />
        </Box>
      ) : (
        <NoShop />
      )}
    </Box>
  );
}
