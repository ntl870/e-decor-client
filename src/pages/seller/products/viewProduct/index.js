import { Box, Button, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { LoadingProduct } from "components/common/LoadingProduct";
import ViewProductForm from "components/seller/products/viewProduct";
import Icons from "constants/icons";
import { useConfirm } from "material-ui-confirm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { deleteProduct, getProduct } from "redux/productRedux";
import { categorySelector, productSelector } from "redux/selectors";
import { getCategoryName } from "utils/helpers";
import { useStyles } from "./styles";

export default function ViewProduct() {
  const classes = useStyles();
  const history = useHistory();
  let match = useRouteMatch();
  const dispatch = useDispatch();
  const { product } = useSelector(productSelector);
  const storeCategory = useSelector(categorySelector);
  const { productId } = useParams();
  const { isLoading, isUpdating } = useSelector(productSelector);
  const [isView, setIsView] = useState(true);
  const confirm = useConfirm();
  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId, isUpdating]);
  const handleDelete = (item) => {
    confirm({ description: `This will permanently delete this product.` })
      .then(() => {
        dispatch(deleteProduct(item)).then((data) =>
          history.push({
            pathname: `/shop/products/${getCategoryName(
              product.category.id,
              storeCategory.categories
            )}`,
            state: {
              categoryId: product.category.id,
            },
          })
        );
      })
      .catch(() => console.log("Deletion cancelled."));
  };
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Box className={classes.icon}>
            <img src={Icons.PACKAGE_ICON} alt="" />
          </Box>
          <Typography className={classes.title}>Products</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box pr={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsView(!isView)}
            >
              {isView ? <EditIcon /> : <SaveIcon />}
            </Button>
          </Box>
          <Box pr={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                handleDelete(productId);
              }}
            >
              <DeleteIcon />
            </Button>
          </Box>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              history.push({
                pathname: `/shop/products/${match.params.categoryName}`,
                state: { categoryId: product?.category?.id },
              });
            }}
          >
            Back To Product List
          </Button>
        </Box>
      </Box>
      <Box>
        {isLoading ? (
          <LoadingProduct />
        ) : (
          +productId === +product?.id && (
            <ViewProductForm isView={isView} setIsView={setIsView} />
          )
        )}
      </Box>
    </Box>
  );
}
