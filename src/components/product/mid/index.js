import { AppBar, Box, makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Images from "constants/image";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { getFeedbacks } from "redux/feedbackRedux";
import { feedbackSelector, productSelector } from "redux/selectors";
import UserReview from "./review/userReview";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Mid() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);

  const { product } = useSelector(productSelector);
  const { feedbacks, totalFeedbacks } = useSelector(feedbackSelector);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  useEffect(() => {
    dispatch(getFeedbacks({ id, params: { limit: 5 } }));
  }, [dispatch, id]);

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(product?.description),
  });
  return (
    <Paper>
      <Box className={classes.root} my={2}>
        <AppBar elevation={1} position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="full width tabs example"
          >
            <Tab label="Description" {...a11yProps(0)} />
            <Tab label="Review" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
          <TabPanel value={value} index={0}>
            <Box p={2} px={3}>
              <div dangerouslySetInnerHTML={sanitizedData()} />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {feedbacks?.length > 0 ? (
              <>
                {feedbacks?.map((item, index) => (
                  <UserReview feedback={item} key={index} />
                ))}
                <Box mt={2} display="flex" justifyContent="center">
                  <Pagination
                    count={Math.ceil(totalFeedbacks / 5)}
                    page={page}
                    onChange={handleChangePage}
                    variant="outlined"
                    color="primary"
                  />
                </Box>
              </>
            ) : (
              <Box
                p={2}
                px={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <img src={Images.NO_REVIEW} alt="" width={200} />
                <Box style={{ color: "#bdbdbd" }} mt={3}>
                  No Reviews Yet
                </Box>
              </Box>
            )}
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Paper>
  );
}
