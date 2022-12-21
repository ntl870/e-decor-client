import { Box } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "./styles";
export default function Pick(props) {
  const { item } = props;
  const history = useHistory();
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      onClick={() => history.push(`/product/${item.id}`)}
    >
      {/* <h2 className={classes.text}>{props.event.name}</h2>
        <p className={classes.subText}>{props.event.description}</p> */}
      <Link to="/" className={classes.image}>
        <Box>
          <img
            width={"100%"}
            src={item.images?.[0]?.image}
            height={150}
            alt=""
            display="block"
            className={classes.image}
          />
        </Box>
      </Link>
      <Box pt={2} p={1} style={{ backgroundColor: "white" }}>
        <Box>
          <h4
            style={{
              overflowX: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item?.name}
          </h4>
          <Box>
            <Rating
              value={5}
              precision={0.1}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              readOnly
              className={classes.rating}
            />
          </Box>
          <span style={{ color: "#D23F57" }}>
            ${item?.minPrice} - {item?.maxPrice}
          </span>
        </Box>
      </Box>
    </Box>
  );
}
