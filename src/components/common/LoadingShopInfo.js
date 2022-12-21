import { Card, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 1172,
    marginBottom: 32,
  },
  media: {
    height: 150,
  },
}));
export const LoadingShopInfo = ({ type }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Skeleton animation="wave" variant="rect" className={classes.media} />
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circle"
            width={100}
            height={100}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={20}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={20} width="40%" />}
      />
    </Card>
  );
};
