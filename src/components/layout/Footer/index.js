import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Logo from "components/common/Logo";
import Icons from "constants/icons";
import React from "react";
import { useStyles } from "./styles";

export default function Footer(props) {
  const { isBlog = false } = props;
  const classes = useStyles();
  return (
    <footer className={classes.footer} style={{ bottom: isBlog ? 0 : "none" }}>
      <Box className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Box className={classes.wrapper}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Logo />
                <Typography
                  // variant="body"
                  component="p"
                  color="inherit"
                  className={classes.description}
                  gutterBottom
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Auctor libero id et, in gravida. Sit diam duis mauris nulla
                  cursus. Erat et lectus vel ut sollicitudin elit at amet.
                </Typography>
                <Box className={classes.download}>
                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Box className={classes.downloadItem}>
                      <img src={Icons.CH_PLAY_ICON} alt="" />

                      <Box className={classes.downloadText}>
                        <Box className={classes.subText}> Get it on</Box>
                        <Box className={classes.mainText}> Google Play</Box>
                      </Box>
                    </Box>
                  </a>
                  <a
                    href="https://www.apple.com/vn/app-store/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Box className={classes.downloadItem}>
                      <img src={Icons.APP_STORE_ICON} alt="" />

                      <Box className={classes.downloadText}>
                        <Box className={classes.subText}> Download on the</Box>
                        <Box className={classes.mainText}> App Store</Box>
                      </Box>
                    </Box>
                  </a>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <Box className={classes.text}>About Us</Box>
                <div>
                  <a href="/" className={classes.link}>
                    Careers
                  </a>
                  <a href="/" className={classes.link}>
                    Our Stores
                  </a>
                  <a href="/" className={classes.link}>
                    Our Cares
                  </a>
                  <a href="/" className={classes.link}>
                    Terms & Conditions
                  </a>
                  <a href="/" className={classes.link}>
                    Privacy Policy
                  </a>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <Box className={classes.text}> Customer Care</Box>
                <div>
                  <a href="/" className={classes.link}>
                    Help Center
                  </a>
                  <a href="/" className={classes.link}>
                    How to Buy
                  </a>
                  <a href="/" className={classes.link}>
                    Track Your Order
                  </a>
                  <a href="/" className={classes.link}>
                    Corporate & Bulk Purchasing
                  </a>
                  <a href="/" className={classes.link}>
                    Returns & Refunds
                  </a>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <Box className={classes.text}> Contact Us</Box>

                <Box className={classes.address}>
                  70 Washington Square South, New York, NY 10012, United States
                </Box>
                <Box className={classes.email}>Email: e.decor.sys.care@gmail.com</Box>
                <Box className={classes.phone}> Phone: +1 1123 456 780</Box>
                <Box display="flex" className={classes.socialMedia}>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton aria-label="delete" className={classes.icon}>
                      <FacebookIcon />
                    </IconButton>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton aria-label="delete" className={classes.icon}>
                      <InstagramIcon />
                    </IconButton>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton aria-label="delete" className={classes.icon}>
                      <TwitterIcon />
                    </IconButton>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton aria-label="delete" className={classes.icon}>
                      <YouTubeIcon />
                    </IconButton>
                  </a>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
