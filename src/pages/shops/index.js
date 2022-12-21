import { Box, Container, Grid, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { LoadingCard } from "components/common/LoadingCard";
import ScrollToTop from "components/common/ScrollToTop";
import Shop from "components/shop";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shopSelector } from "redux/selectors";
import { getShops } from "redux/shopRedux";
import { useStyles } from "./styles";

export default function Shops() {
  ScrollToTop();

  const classes = useStyles();
  const [page, setPage] = useState(1);
  const limit = 9;
  const [pageText, setPageText] = useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };

  const dispatch = useDispatch();
  const storeShops = useSelector(shopSelector);
  const { isLoading } = useSelector(shopSelector);

  useEffect(() => {
    dispatch(getShops({ limit, page }));
  }, [dispatch, limit, page]);

  useEffect(() => {
    if (page === 1) {
      setPageText(`1 - ${storeShops.shops.length}`);
    } else {
      if (storeShops.shops.length === 1) {
        setPageText(`${(page - 1) * limit + 1}`);
      } else {
        let start = (page - 1) * limit + 1;
        let end = limit * page;
        if (storeShops.shops.length !== limit)
          end = start + (storeShops.shops.length - 1);
        setPageText(`${start} - ${end}`);
      }
    }
  }, [limit, page, storeShops.shops.length]);

  return (
    <Container className={classes.container}>
      <Box py={4}>
        <Typography className={classes.headText}>All Shops</Typography>
      </Box>
      <Grid container spacing={3}>
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <Grid key={item} item xs={12} sm={6} lg={4}>
                <LoadingCard type="shop" />
              </Grid>
            ))
          : storeShops.shops?.map((shop, index) => (
              <Grid key={index} item xs={12} sm={6} lg={4}>
                <Shop shop={shop} />
              </Grid>
            ))}
      </Grid>
      <Box
        py={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          Showing {pageText} of {storeShops.totalShops} Shops
        </Box>
        <Box>
          <Pagination
            count={Math.ceil(storeShops.totalShops / limit)}
            page={page}
            onChange={handleChange}
            variant="outlined"
            color="primary"
          />
        </Box>
      </Box>
    </Container>
  );
}
