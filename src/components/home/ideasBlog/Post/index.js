import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
export default function Post(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.area}>
        <CardMedia
          component="img"
          alt="blog"
          height="300"
          // image="https://i.pinimg.com/564x/87/24/e6/8724e6a6a072d07a214212ac5065f274.jpg"
          image="https://i.pinimg.com/564x/68/7e/be/687ebed47faa6963896c628b836046cc.jpg"
          title="blog"
        />
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            className={classes.headText}
            gutterBottom
          >
            Art of Keeping Home Minimal & Organised.
          </Typography>
          <Box mb={3}>
            <Grid container spacing={1}>
              <Grid item md={4}>
                <Box display="flex" alignItems="center">
                  <AccessTimeIcon className={classes.icon} />
                  <Typography component="span">24 February, 2020</Typography>
                </Box>
              </Grid>
              <Grid item md={8}>
                <Box display="flex" alignItems="center">
                  <CommentOutlinedIcon className={classes.icon} />
                  <Typography component="span">3 comments</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Typography variant="body2" color="textSecondary" component="p">
            Maecenas leo ante, gravida vel lectus ac, iaculis lobortis enim.
            Proin nec orci nec nisl consequat molestie quis sit amet elit. Ut
            venenatis dignissim diam in auctor.
          </Typography>
        </CardContent>
        <Link className={classes.link} to="">
          CONTINUE READING
        </Link>
      </CardActionArea>
    </Card>
  );
}
