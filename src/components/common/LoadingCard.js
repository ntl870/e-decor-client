import { Card, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 150,
  },
}));
export const LoadingCard = ({ type }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Skeleton animation="wave" variant="rect" className={classes.media} />
      <CardHeader
        avatar={
          type === "shop" ? (
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          ) : null
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
    </Card>
  );
};
