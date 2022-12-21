import { Box, Chip, Grid, Paper, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Product from "components/shop/shopContent/products/product";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { storeDecorTheme } from "redux/blogRedux";
import { blogSelector, productSelector } from "redux/selectors";

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  product: {},
}));

export default function PostSidebar(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { social } = props;
  const { decorThemes } = useSelector(blogSelector);
  const { bestSellingProducts } = useSelector(productSelector);

  return (
    <Grid item xs={12} md={3}>
      <Box>
        <Box mb={2}>
          <Typography
            variant="h6"
            gutterBottom
            className={classes.sidebarSection}
            style={{
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1,
              textTransform: "none",
              whiteSpace: "normal",
              color: "#2B3445",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Featured Decor Themes
          </Typography>
          <Box display="flex" style={{ flexWrap: "wrap" }}>
            {decorThemes?.map((theme, index) => (
              <Link
                display="block"
                variant="body1"
                onClick={() => {
                  dispatch(storeDecorTheme(theme?.decorTheme));
                  history.push("/blog/posts");
                }}
                key={index}
                style={{ cursor: "pointer", margin: 4 }}
              >
                <Chip
                  color="primary"
                  size="small"
                  label={theme?.decorTheme}
                  style={{
                    letterSpacing: 1.2,
                    cursor: "pointer",
                    // fontSize: 12,
                    // backgroundColor: "#D23F57",
                  }}
                />
              </Link>
            ))}
          </Box>
        </Box>
        <Box
          mb={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            mb={2}
            style={{
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1,
              textTransform: "none",
              whiteSpace: "normal",
              color: "#2B3445",
            }}
          >
            Featured Products
          </Box>
          <Carousel
            className={classes.product}
            animation="slide"
            duration="5000"
            interval={5000}
          >
            {bestSellingProducts?.map((product, i) => (
              <Product key={i} noHover={true} product={product} />
            ))}
          </Carousel>
        </Box>
        <Paper elevation={0} className={classes.sidebarAboutBox}>
          <Typography variant="h6" gutterBottom>
            About
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Paper>
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            className={classes.sidebarSection}
          >
            Social
          </Typography>
          {social?.map((network, index) => (
            <Link display="block" variant="body1" href="#" key={index}>
              <Grid container direction="row" spacing={1} alignItems="center">
                <Grid item>
                  <network.icon />
                </Grid>
                <Grid item>{network.name}</Grid>
              </Grid>
            </Link>
          ))}
        </Box>
      </Box>
    </Grid>
  );
}
