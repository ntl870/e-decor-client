import { Box, Container } from "@material-ui/core";
import FeaturedCategories from "components/home/featuredCategories";
import IdeasBlog from "components/home/ideasBlog";
import TopPicks from "components/home/topPicks";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBestSellingProducts } from "redux/productRedux";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBestSellingProducts({ page: 1, limit: 10 }));
  }, [dispatch]);
  return (
    <Box>
      <Container style={{ paddingTop: 150 }}>
        <TopPicks />
        <FeaturedCategories />
        <IdeasBlog />
      </Container>
    </Box>
  );
};

export default Home;
