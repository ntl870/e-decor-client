import { Box, Grid, IconButton, Paper, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import Carousel from "react-material-ui-carousel";
import Skeleton from "@material-ui/lab/Skeleton";

import { useSelector } from "react-redux";
import { productSelector } from "redux/selectors";
import FeaturedEvents from "./FeaturedEvents";
import Pick from "./Pick";
import { useStyles } from "./styles";
export default function TopPicks() {
  const classes = useStyles();
  const events = [
    {
      name: "Happy WOMAN's Day",
      description:
        "Women’s Day is celebrated to make every woman realize how special they are, not only today but every day, in every way!",
      image:
        "https://i.pinimg.com/originals/fb/d6/72/fbd672e5ef419b6b35d24f772046a7e4.jpg",
    },
    {
      name: "Happy New Year",
      description:
        "New year is the glittering light to brighten the dream-lined pathway of future.",
      image:
        "https://i0.wp.com/www.homedecordesigns.com/wp-content/uploads/2014/12/nydecor6.jpg?resize=500%2C503",
    },
    {
      name: "Happy Valentine Day",
      description: "Life is Loving, Love is giving",
      image:
        "https://img.joomcdn.net/785af504e58575891e76e8ddcd256f6248dbb987_original.jpeg",
    },
    {
      name: "Merry Christmas",
      description:
        "Christmas is the perfect time of year to celebrate family, joy, and coming together. It’s a time to be merry and indulge in plenty of food and drink to keep warm during the cold winter. ",
      image:
        "https://image.made-in-china.com/44f3j00rQWfbdkEYpoF/Christmas-Tapestry-Christmas-Art-Ornaments-Christmas-Home-Decoration-New-Year-Wall-Covering-Tapestry-Decoration.jpg",
    },
    {
      name: "Birthday Party Decor",
      description: "Create a special birthday event",
      image: "https://m.media-amazon.com/images/I/81lT7qKa6hL._AC_SL1500_.jpg",
    },
  ];

  const { bestSellingProducts, isLoading } = useSelector(productSelector);
  const [active, setActive] = useState(0);

  return (
    <section className={classes.root}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <Carousel animation="slide" duration="5000" interval={5000}>
            {events?.map((event, i) => (
              <FeaturedEvents key={i} event={event} />
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box mb={3} ml={-1}>
            <Typography variant="h2" className={classes.topPicks}>
              Top Picks
            </Typography>
          </Box>
          <ItemsCarousel
            infiniteLoop={true}
            alwaysShowChevrons={true}
            chevronWidth={30}
            numberOfCards={4}
            slidesToScroll={1}
            outsideChevron={true}
            activeItemIndex={active}
            requestToChangeActive={(value) => setActive(value)}
            rightChevron={
              <IconButton>
                <ArrowForwardIosIcon />
              </IconButton>
            }
            leftChevron={
              <IconButton>
                <ArrowBackIosIcon />
              </IconButton>
            }
          >
            {isLoading
              ? [1, 2, 3, 4, 5, 6].map((item, index) => (
                  <Box m={0.5} key={index}>
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      width={150}
                      height={230}
                    />
                  </Box>
                ))
              : bestSellingProducts?.map((item, index) => (
                  <Pick key={index} item={item} />
                ))}
          </ItemsCarousel>
          <Paper variant="outlined" className={classes.paper}>
            <Box m={2} display="flex">
              <Grid container spacing={2}>
                <Grid
                  item
                  md={6}
                  display="flex"
                  // justifyContent="center"
                  // alignItems="center"
                >
                  <img
                    src="https://media.designcafe.com/wp-content/uploads/2020/09/12125557/study-table-decoration.jpg"
                    alt="blog"
                    // width={200}
                  />
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="h2"
                    className={classes.blog}
                    gutterBottom
                  >
                    Get inspirations
                  </Typography>
                  <Typography
                    // variant="body"
                    className={classes.subBlog}
                    gutterBottom
                  >
                    Go to blog
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </section>
  );
}
