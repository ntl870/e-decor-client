import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import statisticApi from "api/statisticApi";

export const getStatistics = createAsyncThunk(
  "statistic/getStatistics",
  async (data) => {
    const response = await statisticApi.getStatistics(data);
    return response.result;
  }
);
export const getChart = createAsyncThunk(
  "statistic/getChart",
  async (data) => {
    const response = await statisticApi.getChart(data);
    return response.result;
  }
);

const statisticsSlice = createSlice({
  name: "statistic",
  initialState: {
    earning: 0,
    productSold: 0,
    pendingOrders: 0,
    chart: {},
    isLoading: false,
    isUpdating: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getStatistics.pending]: (state) => {
      state.isLoading = true;
    },
    [getStatistics.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getStatistics.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.earning = action.payload.earning;
      state.productSold = action.payload.productSold;
      state.pendingOrders = action.payload.pendingOrders;
    },

    [getChart.pending]: (state) => {
      state.isLoading = true;
    },
    [getChart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getChart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.chart = action.payload;
    },
  },
});

// export const {} = statisticsSlice.actions;
export default statisticsSlice.reducer;
