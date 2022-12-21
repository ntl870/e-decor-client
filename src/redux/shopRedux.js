import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import shopApi from "api/shopApi";
import { toast } from "react-toastify";

export const getMyShop = createAsyncThunk(
  "shop/getMyShop",
  async (data) => {
    const response = await shopApi.getMyShop();
    return response.result;
  }
);

export const createShop = createAsyncThunk(
  "shop/createShop",
  async (data) => {
    const response = await shopApi.createShop(data);
    if (response.result) {
      toast.success("SUCCESS");
    } else toast.error("ERROR");
  }
);

export const updateShop = createAsyncThunk(
  "shop/updateShop",
  async (data) => {
    const response = await shopApi.updateShop(data);
    if (response.result.success) {
      toast.success("SUCCESS");
    } else toast.error("ERROR");
  }
);

export const getShops = createAsyncThunk(
  "shop/getShops",
  async (params) => {
    const response = await shopApi.getShops(params);
    return response.result;
  }
);

export const getShop = createAsyncThunk(
  "shop/getShop",
  async (id) => {
    const response = await shopApi.getShop(id);
    return response.result;
  }
);
const shopSlice = createSlice({
  name: "shop",
  initialState: {
    currentShop: null,
    shop: null,
    shops: [],
    totalShops: 0,
    currentPage: 1,
    isLoading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getMyShop.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyShop.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getMyShop.fulfilled]: (state, action) => {
      state.currentShop = action.payload;
      state.error = false;
      state.isLoading = false;
    },
    [createShop.pending]: (state) => {
      state.isLoading = true;
    },
    [createShop.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [createShop.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },

    [getShops.pending]: (state) => {
      state.isLoading = true;
    },
    [getShops.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getShops.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.shops = action.payload.shops;
      state.totalShops = action.payload.totalShops;
      state.currentPage = action.payload.currentPage;
    },

    [updateShop.pending]: (state) => {
      state.isLoading = true;
    },
    [updateShop.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [updateShop.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },

    [getShop.pending]: (state) => {
      state.isLoading = true;
    },
    [getShop.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getShop.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.shop = action.payload;
    },
  },
});

// export const {} = shopSlice.actions;
export default shopSlice.reducer;
