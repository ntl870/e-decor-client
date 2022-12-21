import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { format } from "date-fns";
import { Box, Chip, Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "redux/blogRedux";
import { userSelector } from "redux/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: 24,
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    cursor: "pointer",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
    border: "1px solid rgb(211 206 206)",
  },
}));

export default function PostCard(props) {
  const { post } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { currentUser } = useSelector(userSelector);
  const [expanded, setExpanded] = useState(false);
  const [isClicked, setIsClicked] = useState(post?.liked);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={post?.user?.avatar}
            className={classes.avatar}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post?.user?.name || "User"}
        subheader={
          post?.createdAt
            ? format(new Date(post?.createdAt), "MMM dd, yyyy")
            : "MMM dd, yyyy"
        }
      />
      <CardMedia
        className={classes.media}
        image={post?.images?.[0]?.image}
        title=""
        onClick={() => history.push(`/blog/posts/${post?.id}`)}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{ fontSize: 18, fontWeight: "bold" }}
        >
          {post?.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            if (currentUser) {
              setIsClicked(!isClicked);
              isClicked
                ? dispatch(unlikePost(post?.id)).then((data) =>
                    console.log(data)
                  )
                : dispatch(likePost(post?.id)).then((data) =>
                    console.log(data)
                  );
            } else {
              history.push("/login");
            }
          }}
        >
          <FavoriteIcon style={{ color: isClicked ? "#D23F57" : null }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Tooltip title="See more">
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box mb={2} display="flex" alignItems="center">
            <Typography style={{ fontWeight: 700, fontSize: 16 }}>
              Decor Themes:
            </Typography>
            <Box ml={2}>
              <Chip
                color="primary"
                size="small"
                label={post?.decorTheme}
                style={{
                  letterSpacing: 1.2,
                  // fontSize: 12,
                  // backgroundColor: "#D23F57",
                }}
              />
            </Box>
          </Box>
          <Box py={2}>
            <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
