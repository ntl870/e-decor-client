import { Box, Card, IconButton, Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import noImage from "assets/images/no-image.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createWishlist, removeWishlist } from "redux/wishlistRedux";
import { getPrice } from "utils/helpers";
import { useStyles } from "./styles";

export default function Product(props) {
  const { product, noHover = false } = props;
  const classes = useStyles();
  const [state, setState] = useState({
    raised: false,
    shadow: 0.5,
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const [isWishlist, setIsWishlist] = useState(product?.inWishlist);

  return (
    <Card
      className={classes.root}
      classes={{ root: state.raised ? classes.cardHovered : "" }}
      onMouseOver={() => !noHover && setState({ raised: true, shadow: 1 })}
      onMouseOut={() => !noHover && setState({ raised: false, shadow: 0.5 })}
      raised={state.raised}
      zdepth={state.shadow}
      style={{ cursor: "pointer" }}
    >
      <Box
        style={{
          minHeight: 275,
          maxHeight: 275,
          borderBottom: "1px solid #eee",
        }}
        display="flex"
        justifyContent="center"
        onClick={() => {
          history.push(`/product/${product?.id}`);
        }}
      >
        <img src={product?.images?.[0]?.image || noImage} alt="" />
      </Box>
      <Box display="flex" p={2} flexDirection="column">
        <Typography gutterBottom className={classes.name} component="div">
          {product?.name}
        </Typography>
        <Typography className={classes.price}>
          ${getPrice(product?.minPrice, product?.maxPrice)}
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Box display="flex" alignItems="center">
            <Rating
              value={product?.avgRatings ? Number(product?.avgRatings) : 0}
              precision={0.5}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              readOnly
            />
            <Typography style={{ marginLeft: 4, color: "#757575" }}>
              {product?.totalRatings === 0
                ? ""
                : `(${product?.totalRatings ? product?.totalRatings : 0})`}
            </Typography>
          </Box>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              if (isWishlist) {
                // setCallApi(true);
                setIsWishlist(false);
                dispatch(removeWishlist(product?.wishlistItemId));
              } else {
                // setCallApi(true);
                setIsWishlist(true);
                dispatch(createWishlist({ productId: product?.id }));
              }
            }}
          >
            {isWishlist ? (
              <FavoriteIcon style={{ color: "#D23F57" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
