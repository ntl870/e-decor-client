import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Images from "constants/image";
import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { addProductVersion } from "redux/productRedux";
import { productSelector } from "redux/selectors";
import { v4 as uuidv4 } from "uuid";
import ProductVersionForm from "../productVersion";
import { useStyles } from "./styles";

export default function ProductVersionsForm(props) {
  const { isView } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const storeProduct = useSelector(productSelector);
  const { productVersions } = storeProduct;
  return (
    <Box my={2} mx={1}>
      <Box
        mx={-1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography className={classes.headText}>Product Versions</Typography>
        <Button
          disabled={isView}
          color="primary"
          variant="outlined"
          onClick={() =>
            dispatch(
              addProductVersion({
                id: uuidv4(),
                name: "",
                price: "",
                image: "",
                quantity: "",
              })
            )
          }
        >
          <AddIcon /> Add
        </Button>
      </Box>
      <Grid container spacing={3}>
        {productVersions?.length > 0 ? (
          productVersions?.map((productVersion, index) => (
            <Grid item xs={12} md={12} key={index}>
              <ProductVersionForm
                productVersion={productVersion}
                isView={isView}
              />
              <Divider />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} md={12}>
            <Box
              mt={3}
              py={2}
              mb={1}
              m={-1}
              style={{ border: "1px solid #bdbdbd", borderRadius: 4 }}
            >
              <Box pt={4} display="flex" justifyContent="center">
                <img src={Images.PRODUCT_VERSION} alt="" width={"10%"} />
              </Box>
              <Box p={2} display="flex" justifyContent={"center"}>
                No Product Versions
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
