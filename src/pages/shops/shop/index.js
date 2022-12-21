import { Container } from "@material-ui/core";
import ScrollToTop from "components/common/ScrollToTop";
import ShopSearchBox from "components/common/ShopSearchBox";
import ShopContent from "components/shop/shopContent";
import ShopInfo from "components/shop/shopInfo";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getShopCategories } from "redux/categoryRedux";
import { getShopProducts } from "redux/productRedux";
import { filterSelector } from "redux/selectors";
import { useStyles } from "./styles";
export default function ShopDetail() {
  ScrollToTop();
  const classes = useStyles();
  const { id } = useParams();

  // const { isLoading } = useSelector(shopSelector);
  const dispatch = useDispatch();
  const {
    selectedShopCategories,
    limit,
    page,
    min,
    max,
    ratings,
    shopKeyword,
  } = useSelector(filterSelector);

  useEffect(() => {
    dispatch(
      getShopProducts({
        id,
        params: {
          limit,
          page,
          categories: selectedShopCategories,
          min: min ? min : undefined,
          max: max ? max : undefined,
          ratings,
          keyword: shopKeyword,
        },
      })
    );
  }, [
    selectedShopCategories,
    dispatch,
    limit,
    max,
    min,
    page,
    ratings,
    shopKeyword,
    id,
  ]);

  useEffect(() => {
    dispatch(getShopCategories(id));
  }, [dispatch, id]);

  return (
    <Container className={classes.container}>
      {/* {isLoading ? <LoadingShopInfo /> : <ShopInfo />} */}
      <ShopInfo />
      <ShopSearchBox />
      <ShopContent />
      <ToastContainer autoClose={2000} style={{ marginTop: "100px" }} />
    </Container>
  );
}
