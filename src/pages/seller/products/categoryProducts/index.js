import { Box, Breadcrumbs, Button, Link, Typography } from "@material-ui/core";
import ScrollToTop from "components/common/ScrollToTop";
import ProductsTable from "components/seller/products/table";
import Icons from "constants/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function CategoryProducts() {
  ScrollToTop();
  const classes = useStyles();
  const history = useHistory();
  const { categoryName } = useParams();
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <Box className={classes.icon}>
            <img src={Icons.PACKAGE_ICON} alt="" />
          </Box>

          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon />}
          >
            <Link
              color="inherit"
              href="/shop/products"
              onClick={() => {}}
              className={classes.link}
            >
              <Typography className={classes.title}>Products</Typography>
            </Link>

            <Typography color="primary" style={{ fontSize: 18 }}>
              {categoryName}
            </Typography>
          </Breadcrumbs>
        </Box>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => history.push("/shop/products")}
        >
          View all categories
        </Button>
      </Box>
      <Box>
        <ProductsTable />
      </Box>
    </Box>
  );
}
