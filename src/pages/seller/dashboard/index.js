import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import earningsImg from "assets/images/earnings.png";
import pendingImg from "assets/images/pending.png";
import soldImg from "assets/images/sold.png";
import NoShop from "components/common/NoShop";
import {
  addMonths,
  addYears,
  endOfISOWeek,
  endOfMonth,
  endOfYear,
  format,
  getDay,
  nextDay,
  previousDay,
  startOfISOWeek,
  startOfMonth,
  startOfYear,
  subMonths,
  subYears,
} from "date-fns";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { shopSelector, statisticSelector } from "redux/selectors";
import { getMyShop } from "redux/shopRedux";
import { getChart, getStatistics } from "redux/statisticRedux";
import { useStyles } from "./styles";

export const VIEWS = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
];
export default function Dashboard() {
  const statisticStore = useSelector(statisticSelector);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [view, setView] = useState("week");
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(startOfISOWeek(new Date()));
  const [endDate, setEndDate] = useState(endOfISOWeek(new Date()));
  const storeShop = useSelector(shopSelector);

  useEffect(() => {
    if (view === "week") {
      setStartDate(startOfISOWeek(date));
      setEndDate(endOfISOWeek(date));
    }
    if (view === "month") {
      setStartDate(startOfMonth(date));
      setEndDate(endOfMonth(date));
    }
    if (view === "year") {
      setStartDate(startOfYear(date));
      setEndDate(endOfYear(date));
    }
  }, [date, view]);

  useEffect(() => {
    dispatch(getMyShop());
  }, [dispatch]);
  useEffect(() => {
    storeShop?.currentShop &&
      dispatch(
        getStatistics({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        })
      );
    storeShop?.currentShop &&
      dispatch(
        getChart({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        })
      );
  }, [dispatch, endDate, startDate, storeShop?.currentShop]);

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <DashboardIcon className={classes.icon} />
          <Typography className={classes.title}>Dashboard</Typography>
        </Box>
        {storeShop?.currentShop ? (
          <Box className={`${classes.flexBasic} ${classes.header}`}>
            <Box className={classes.actionBox}>
              <IconButton
                className={`fas fa-angle-left ${classes.moveIcon}`}
                onClick={() => {
                  setDate(
                    view === "week"
                      ? previousDay(date, getDay(date))
                      : view === "month"
                      ? subMonths(date, 1)
                      : subYears(date, 1)
                  );
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <Box mx={1}>
                <Typography>
                  {format(startDate, "MMM dd, yyyy")} <span> - </span>
                  {format(endDate, "MMM dd, yyyy")}
                </Typography>
              </Box>

              <IconButton
                className={`fas fa-angle-right ${classes.moveIcon}`}
                onClick={() => {
                  setDate(
                    view === "week"
                      ? nextDay(date, getDay(date))
                      : view === "month"
                      ? addMonths(date, 1)
                      : addYears(date, 1)
                  );
                }}
              >
                <ChevronRightIcon />
              </IconButton>
              <FormControl
                margin="dense"
                variant="outlined"
                className={classes.formControl}
                size="small"
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  View
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={view}
                  onChange={(e) => {
                    setView(e.target.value);
                  }}
                  label="View"
                  MenuProps={{ disableScrollLock: true }}
                  // SelectDisplayProps={{
                  //   style: { paddingTop: 4, paddingBottom: 10 },
                  // }}
                >
                  {VIEWS?.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        ) : (
          <></>
        )}
        {storeShop?.currentShop ? (
          <Button color="primary" variant="contained">
            Export
          </Button>
        ) : (
          <></>
        )}
      </Box>
      {storeShop?.currentShop ? (
        <Box>
          <Grid container spacing={2}>
            <Grid item sm={6} md={4} lg={4}>
              <Card style={{ minHeight: 150 }}>
                <Box p={2} display="flex" alignItems="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Box
                      style={{
                        fontWeight: 600,
                        lineHeight: 1.57143,
                        fontSize: 16,
                        color: "#7D879C",
                      }}
                    >
                      Earnings
                    </Box>
                    <Box
                      style={{
                        fontWeight: 700,
                        lineHeight: 1.57143,
                        fontSize: 24,
                      }}
                    >
                      ${statisticStore?.earning?.toFixed(1) || 0}
                    </Box>
                  </Box>
                  <Box>
                    <img src={earningsImg} alt="" width="120px" />
                  </Box>
                </Box>
              </Card>
            </Grid>
            <Grid item sm={6} md={4} lg={4}>
              <Card style={{ minHeight: 150 }}>
                <Box p={2} display="flex" alignItems="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Box
                      style={{
                        fontWeight: 600,
                        lineHeight: 1.57143,
                        fontSize: 16,
                        color: "#7D879C",
                      }}
                    >
                      Product Sold
                    </Box>
                    <Box
                      style={{
                        fontWeight: 700,
                        lineHeight: 1.57143,
                        fontSize: 24,
                      }}
                    >
                      {statisticStore?.productSold}
                    </Box>
                  </Box>
                  <Box>
                    <img src={soldImg} alt="" width="150px" />
                  </Box>
                </Box>
              </Card>
            </Grid>
            <Grid item sm={6} md={4} lg={4}>
              <Card style={{ minHeight: 150 }}>
                <Box p={2} display="flex" alignItems="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Box
                      style={{
                        fontWeight: 600,
                        lineHeight: 1.57143,
                        fontSize: 16,
                        color: "#7D879C",
                      }}
                    >
                      Pending Orders
                    </Box>
                    <Box
                      style={{
                        fontWeight: 700,
                        lineHeight: 1.57143,
                        fontSize: 24,
                      }}
                    >
                      {statisticStore?.pendingOrders}
                    </Box>
                  </Box>
                  <Box>
                    <img src={pendingImg} alt="" width="120px" />
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
          <Box my={4}>
            <Paper>
              {statisticStore?.isLoading ? (
                <Box
                  style={{ height: 250 }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Chart
                  options={{
                    xaxis: {
                      categories:
                        view === "year"
                          ? [
                              "Jan",
                              "Feb",
                              "Mar",
                              "Apr",
                              "May",
                              "June",
                              "July",
                              "Aug",
                              "Sept",
                              "Oct",
                              "Nov",
                              "Dec",
                            ]
                          : statisticStore?.chart?.categories,
                    },
                  }}
                  series={[
                    {
                      name: "Earnings ($)",
                      data: statisticStore?.chart?.data || [],
                    },
                  ]}
                  type="line"
                  width="100%"
                />
              )}
            </Paper>
          </Box>
        </Box>
      ) : storeShop?.isLoading ? (
        <Paper>
          <Box
            mb={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={22}
          >
            <CircularProgress />
          </Box>
        </Paper>
      ) : (
        <NoShop />
      )}

      <ToastContainer autoClose={2000} style={{ marginTop: "100px" }} />
    </Box>
  );
}
