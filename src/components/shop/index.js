import {
  Avatar,
  Box,
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CallIcon from "@material-ui/icons/Call";
import PlaceIcon from "@material-ui/icons/Place";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import Images from "constants/image";
import React from "react";
import { Link } from "react-router-dom";
import { getShopAddressText } from "utils/helpers";
import { useStyles } from "./styles";

export default function Shop(props) {
  const { shop } = props;
  const classes = useStyles({
    coverImageUrl: shop?.coverImage || Images.COVER_LINK,
  });

  return (
    <Card className={classes.root} style={{ minHeight: 260 }}>
      <Box className={classes.top} style={{ minHeight: 206 }}>
        <Typography className={classes.text}>{shop?.name}</Typography>
        <Rating
          value={Number(shop?.avgRatings) === 0 ? 5 : Number(shop?.avgRatings)}
          precision={0.1}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
          readOnly
          className={classes.rating}
        />
        <Box className={classes.info} display={"flex"}>
          <PlaceIcon className={classes.icon} />
          <Typography className={classes.detail} component={"span"}>
            {getShopAddressText(shop)}
          </Typography>
        </Box>
        <Box className={classes.info} display={"flex"}>
          <CallIcon className={classes.icon} />
          <Typography className={classes.detail} component={"span"}>
            {shop?.phone || "N/A"}
          </Typography>
        </Box>
      </Box>
      <Box
        py={0.5}
        pr={1}
        pl={4}
        className={classes.bottom}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Avatar alt="" src={shop?.avatar} className={classes.avatar} />
        <Tooltip title="View detail" arrow>
          <Link to={`shops/${shop?.id}`}>
            <IconButton>
              <ArrowForwardIcon />
            </IconButton>
          </Link>
        </Tooltip>
      </Box>
    </Card>
  );
}
