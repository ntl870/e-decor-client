import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styles";

export default function Category(props) {
  const { category } = props;

  const classes = useStyles();
  const [state, setState] = useState({
    raised: false,
    shadow: 1,
  });

  const history = useHistory();
  return (
    <Card
      className={classes.root}
      classes={{ root: state.raised ? classes.cardHovered : "" }}
      onMouseOver={() => setState({ raised: true, shadow: 3 })}
      onMouseOut={() => setState({ raised: false, shadow: 1 })}
      raised={state.raised}
      zdepth={state.shadow}
      onClick={() =>
        history.push({
          pathname: `/shop/products/${category.category.name}`,
          state: {
            categoryId: category.categoryId,
          },
        })
      }
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt=""
          height="140"
          image={category.category.image}
          title=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {category.category.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {category.countProducts} Products
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
