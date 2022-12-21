import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import RemoveIcon from "@material-ui/icons/Remove";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import React, { useEffect, useState } from "react";
import ItemsCarousel from "react-items-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCartItem } from "redux/cartRedux";
import { storeOrderItems, storeShopInfo } from "redux/orderRedux";
import { cartSelector, productSelector } from "redux/selectors";
import {
  getImagesFromProductVersion,
  getPriceText,
  getToken,
} from "utils/helpers";
import { useStyles } from "./styles";

export default function Top(props) {
  const history = useHistory();

  const dispatch = useDispatch();
  const { product } = useSelector(productSelector);
  const { isLoading } = useSelector(cartSelector);
  const [showedImage, setShowedImage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    setShowedImage(
      product?.images?.concat(
        getImagesFromProductVersion(product?.productVersions)
      )?.[0]?.image
    );
  }, [product]);

  const [active, setActive] = useState(0);
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);

  const [showedPrice, setShowedPrice] = useState(
    getPriceText(product?.productVersions)
  );

  const [value, setValue] = useState("");

  useEffect(() => {
    const item = product?.productVersions.find((item) => +item.id === +value);
    if (item?.quantity < quantity) setIsDisabled(true);
    else setIsDisabled(false);
  }, [product?.productVersions, quantity, value]);

  const handleChange = (event) => {
    setValue(event.target.value);

    const item = product?.productVersions.find(
      (item) => +item.id === +event.target.value
    );

    const orderItem = {
      name: item?.name,
      price: item?.price,
      productVersionName: item?.name,
      image: item?.image,
      productVersionId: item?.id,
      quantity,
    };
    dispatch(storeOrderItems([orderItem]));
    setShowedImage(item.image);
    setShowedPrice(item.price);
    setIsDisabled(!item.quantity);
  };

  const addToCart = (e) => {
    if (!getToken()) history.push("/login");
    else if (value)
      dispatch(addCartItem({ quantity, productVersionId: value })).then(
        (data) => {
          if (data.payload.new)
            toast.success("Item has been added to your shopping cart!");
          else toast.warn("Item has been added to your shopping cart before!");
        }
      );
    else {
      toast.warn("Please select product variation first");
      console.error("Please select product variation first");
    }
  };
  const handleBuyNow = (e) => {
    if (!getToken()) history.push("/login");
    else if (value) {
      const item = product?.productVersions.find((item) => +item.id === +value);

      const orderItem = {
        name: item?.name,
        price: item?.price,
        productVersionName: item?.name,
        image: item?.image,
        productVersionId: item?.id,
        quantity,
      };
      dispatch(storeOrderItems([orderItem]));
      dispatch(storeShopInfo({ id: product?.shop?.id, name: product?.shop?.name }));

      history.push("/checkout");
    } else {
      toast.warn("Please select product variation first");
      console.error("Please select product variation first");
    }
  };

  return (
    <Paper>
      <Box my={4} pb={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box px={2}>
              <Box
                display="flex"
                justifyContent="center"
                mb={2}
                style={{ border: "1px solid #ddd" }}
              >
                <img
                  width={400}
                  height={400}
                  src={showedImage}
                  alt=""
                  style={{ padding: 4 }}
                />
              </Box>

              {product?.images?.concat(
                getImagesFromProductVersion(product?.productVersions)
              ).length > 5 ? (
                <Box mx={-1}>
                  <ItemsCarousel
                    infiniteLoop={true}
                    alwaysShowChevrons={true}
                    chevronWidth={50}
                    numberOfCards={5}
                    slidesToScroll={1}
                    outsideChevron={false}
                    activeItemIndex={active}
                    requestToChangeActive={(value) => setActive(value)}
                    rightChevron={
                      <IconButton
                      // style={{ color: "white" }}
                      >
                        <ArrowForwardIosIcon />
                      </IconButton>
                    }
                    leftChevron={
                      <IconButton
                      // style={{ color: "white" }}
                      >
                        <ArrowBackIosIcon />
                      </IconButton>
                    }
                  >
                    {product?.images
                      ?.concat(
                        getImagesFromProductVersion(product?.productVersions)
                      )
                      ?.map((item, index) => (
                        <Box
                          mx={1}
                          className={classes.img}
                          key={index}
                          style={{
                            border: "1px solid #ddd",
                            cursor: "pointer",
                          }}
                          onClick={() => setShowedImage(item.image)}
                        >
                          <img
                            width={100}
                            height={100}
                            src={item.image}
                            alt=""
                            style={{ padding: 4 }}
                          />
                        </Box>
                      ))}
                  </ItemsCarousel>
                </Box>
              ) : (
                <>
                  <Box
                    display="flex"
                    alignItems="centers"
                    justifyContent="center"
                  >
                    {product?.images
                      ?.concat(
                        getImagesFromProductVersion(product?.productVersions)
                      )
                      ?.map((item, index) => (
                        <Box
                          mx={1}
                          className={classes.img}
                          key={index}
                          style={{
                            border: "1px solid #ddd",
                            cursor: "pointer",
                          }}
                          onClick={() => setShowedImage(item.image)}
                        >
                          <img
                            width={100}
                            height={100}
                            src={item.image}
                            alt=""
                            style={{ padding: 4 }}
                          />
                        </Box>
                      ))}
                  </Box>
                </>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} style={{ position: "relative" }}>
            <Box py={4} pr={0.5}>
              <Box py={2}>
                <Typography className={classes.headText}>
                  {product?.name}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                {product?.avgRatings ? (
                  <Box display="flex">
                    <Rating
                      value={
                        product?.avgRatings ? Number(product?.avgRatings) : 0
                      }
                      precision={0.5}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      readOnly
                    />
                    <Divider
                      orientation="vertical"
                      flexItem
                      className={classes.divider}
                    />
                    <Box>{product?.totalRatings} Ratings</Box>
                  </Box>
                ) : (
                  "No Ratings Yet"
                )}
                <Divider
                  orientation="vertical"
                  flexItem
                  className={classes.divider}
                />
                <Box>
                  {product?.soldQuantity ? product?.soldQuantity : 0} Sold
                </Box>
              </Box>
              <Box py={1}>
                <Typography className={classes.price}>
                  ${showedPrice}
                </Typography>
              </Box>
              <Box display="flex" pb={1}>
                <Box mr={5} mt={1}>
                  Type
                </Box>
                <RadioGroup
                  aria-label="gender"
                  name="type"
                  // defaultValue={""}
                  value={value}
                  onChange={handleChange}
                >
                  {product?.productVersions?.map((product, index) => (
                    <FormControlLabel
                      key={index}
                      value={product?.id.toString()}
                      control={<Radio />}
                      label={`${product?.name} ${
                        product?.quantity
                          ? `(${product?.quantity} piece available)`
                          : "(Out of stock)"
                      } `}
                    />
                  ))}
                </RadioGroup>
              </Box>
              <Box display="flex" alignItems="center" pb={1}>
                <Box>Quantity</Box>
                <Box className={classes.test} mx={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.qtyBtn}
                    onClick={() => {
                      if (quantity > 1) setQuantity(quantity - 1);
                    }}
                  >
                    <RemoveIcon />
                  </Button>
                  <Box component={"span"} px={2}>
                    {quantity}
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.qtyBtn}
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <AddIcon />
                  </Button>
                </Box>
              </Box>
              <Box display="flex" my={1}>
                <Box style={{ position: "relative" }}>
                  <Button
                    color="primary"
                    variant="outlined"
                    className={classes.actionBtn}
                    onClick={addToCart}
                    disabled={isDisabled || isLoading}
                  >
                    <AddShoppingCartIcon />
                    Add To Cart
                  </Button>
                  {isLoading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Box>
                <Box style={{ position: "relative" }}>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.buyBtn}
                    onClick={handleBuyNow}
                    disabled={isDisabled || isLoading}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Box>
            </Box>

            <Box
              style={{ width: "100%" }}
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              <Divider style={{ width: 535, height: 1, marginBottom: 24 }} />

              <Box display="flex" style={{ width: "100%" }}>
                <Box mr={2}>
                  <Avatar
                    alt=""
                    src={product?.shop?.coverImage}
                    className={classes.avatar}
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" width="80%">
                  <Box display="flex" flexDirection="column">
                    <Box mb={1}>
                      <Typography style={{ fontWeight: 600 }}>
                        {product?.shop?.name}
                      </Typography>
                      <Rating
                        value={5}
                        precision={0.1}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        readOnly
                        className={classes.rating}
                      />
                    </Box>
                    <Box mb={2}>{product?.shop?.description}</Box>
                  </Box>
                  <Box
                    style={{ width: 130 }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-evenly"
                  >
                    <Button variant="outlined" color="primary">
                      Chat
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        history.push(`/shops/${product?.shop?.id}`)
                      }
                    >
                      View shop
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer autoClose={1000} style={{ marginTop: "100px" }} />
    </Paper>
  );
}
