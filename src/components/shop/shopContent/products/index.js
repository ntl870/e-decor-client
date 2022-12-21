import { Grid } from "@material-ui/core";
import { LoadingCard } from "components/common/LoadingCard";
import { useSelector } from "react-redux";
import { productSelector } from "redux/selectors";
import Product from "./product";

export default function Products(props) {
  const { isLoading } = useSelector(productSelector);
  const { products } = props;
  return (
    <Grid container spacing={3}>
      {isLoading
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <Grid item xs={12} md={4} key={item}>
              <LoadingCard />
            </Grid>
          ))
        : products?.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} lg={4}>
              <Product product={product} />
            </Grid>
          ))}
    </Grid>
  );
}
