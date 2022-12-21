import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import feedbackApi from "api/feedbackApi";
import { toast } from "react-toastify";

export const getFeedbacks = createAsyncThunk(
  "feedback/getAll",
  async (data) => {
    const response = await feedbackApi.getAll(data.id, data.params);
    return response.result;
  }
);

export const createFeedback = createAsyncThunk(
  "feedback/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await feedbackApi.create(data.id, data.body);
      if (response.result) {
        toast.success("SUCCESS");
        return response.result;
      } else toast.error("ERROR");
    } catch (err) {
      console.log(err);
      toast.error("ERROR");
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  "feedback/delete",
  async (data) => {
    const response = await feedbackApi.delete(data);
    if (response.result.success) {
      toast.success("SUCCESS");
      return data;
    } else toast.error("ERROR");
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbacks: [],
    totalFeedbacks: 0,
    currentPage: 1,
    isLoading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getFeedbacks.pending]: (state) => {
      state.isLoading = true;
    },
    [getFeedbacks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getFeedbacks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.feedbacks = action.payload.feedbacks;
      state.totalFeedbacks = action.payload.totalFeedbacks;
      state.currentPage = action.payload.currentPage;
    },
    [createFeedback.pending]: (state) => {
      state.isLoading = true;
    },
    [createFeedback.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [createFeedback.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
    },

    [deleteFeedback.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteFeedback.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [deleteFeedback.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.feedbacks.splice(
        state.feedbacks.findIndex((item) => item.id === action.payload),
        1
      );
    },
  },
});

// export const {} = feedbackSlice.actions;
export default feedbackSlice.reducer;
