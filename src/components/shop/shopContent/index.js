import { Box, Grid, Paper } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Images from "constants/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter, storePage } from "redux/filterRedux";
import {
  categorySelector,
  filterSelector,
  productSelector,
} from "redux/selectors";
import { isEmpty } from "underscore";
import Filter from "./filter";
import Products from "./products";
import { useStyles } from "./styles";
export default function ShopContent(props) {
  const classes = useStyles();
  const limit = 9;
  const dispatch = useDispatch();
  const storeProducts = useSelector(productSelector);
  const { page } = useSelector(filterSelector);
  const [pageText, setPageText] = useState("");
  useEffect(() => {
    if (page === 1) {
      setPageText(`1 - ${storeProducts?.products?.length}`);
    } else {
      if (storeProducts?.products?.length === 1) {
        setPageText(`${(page - 1) * limit + 1}`);
      } else {
        let start = (page - 1) * limit + 1;
        let end = limit * page;
        if (storeProducts?.products?.length !== limit)
          end = start + (storeProducts?.products?.length - 1);
        setPageText(`${start} - ${end}`);
      }
    }
  }, [limit, page, storeProducts?.products?.length]);

  const storeCategory = useSelector(categorySelector);

  useEffect(() => {
    console.log("reset shop");
    return () => {
      dispatch(resetFilter());
    };
  }, [dispatch]);
  
  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} md={3} className={classes.sidebar}>
        <Filter shopCategories={storeCategory?.shopCategories} />
      </Grid>
      {isEmpty(storeProducts?.products) ? (
        <Grid item xs={12} md={9} className={classes.list}>
          <Paper>
            <Box
              p={15}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <img
                src={
                  isEmpty(storeCategory.shopCategories)
                    ? Images.NO_PRODUCT
                    : Images.NO_SEARCH
                }
                alt=""
                width={200}
              />
              <Box style={{ color: "#bdbdbd", fontSize: 16 }} mt={3}>
                {isEmpty(storeCategory.shopCategories)
                  ? "No Products Yet."
                  : "No Results Yet."}
              </Box>
            </Box>
          </Paper>
        </Grid>
      ) : (
        <Grid item xs={12} md={9} className={classes.list}>
          <Products products={storeProducts?.products} />
          <Box
            py={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              Showing {pageText} of {storeProducts.totalProducts} Products
            </Box>
            <Box>
              <Pagination
                count={Math.ceil(storeProducts.totalProducts / limit)}
                page={page}
                onChange={(event, value) => {
                  dispatch(storePage(value));
                }}
                variant="outlined"
                color="primary"
              />
            </Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
