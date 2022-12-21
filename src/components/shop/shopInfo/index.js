import { Avatar, Box, Button, Card, Typography } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import PlaceIcon from "@material-ui/icons/Place";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import { LoadingShopInfo } from "components/common/LoadingShopInfo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { shopSelector } from "redux/selectors";
import { getShop } from "redux/shopRedux";
import { getShopAddressText } from "utils/helpers";
import { useStyles } from "./styles";
import Icons from "constants/icons";
import Images from "constants/image";

export default function ShopInfo(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { shop, isLoading } = useSelector(shopSelector);
  const classes = useStyles({
    coverImage: shop?.coverImage || Images.COVER_LINK,
  });
  useEffect(() => {
    dispatch(getShop(id));
  }, [dispatch, id]);
  return isLoading ? (
    <LoadingShopInfo />
  ) : (
    <Card className={classes.root}>
      <Box className={classes.wallpaper}></Box>
      <Box className={classes.main}>
        <Avatar
          alt={shop?.avatar}
          src={shop?.avatar}
          className={classes.avatar}
        />
        <Box className={classes.info}>
          <Box className={classes.top}>
            <Box className={classes.name}>
              <Typography className={classes.text}>{shop?.name}</Typography>
            </Box>
            <Box className={classes.link}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src={Icons.FACEBOOK_ICON}
                  alt=""
                  className={classes.linkIcon}
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src={Icons.TWITTER_ICON}
                  alt=""
                  className={classes.linkIcon}
                />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src={Icons.YOUTUBE_ICON}
                  alt=""
                  className={classes.linkIcon}
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src={Icons.INSTAGRAM_ICON}
                  alt=""
                  className={classes.linkIcon}
                />
              </a>
            </Box>
          </Box>
          <Box className={classes.bottom}>
            <Box>
              <Rating
                value={
                  Number(shop?.avgRatings) === 0 ? 5 : Number(shop?.avgRatings)
                }
                precision={0.1}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                readOnly
              />
              <Box mt={1} className={classes.subText} display={"flex"}>
                <PlaceIcon className={classes.icon} />
                <Typography className={classes.detail} component={"span"}>
                  {getShopAddressText(shop)}
                </Typography>
              </Box>
              <Box mt={1} className={classes.subText} display={"flex"}>
                <CallIcon className={classes.icon} />
                <Typography className={classes.detail} component={"span"}>
                  {shop?.phone || "N/A"}
                </Typography>
              </Box>
            </Box>
            <Button variant="outlined" color="primary">
              Contact Shop
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
