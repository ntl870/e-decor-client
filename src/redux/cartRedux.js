import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartApi from "api/cartApi";
import { getToken } from "utils/helpers";
import { toast } from "react-toastify";

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  const response = await cartApi.getAll();
  return response.result;
});

export const getRecentCartItems = createAsyncThunk(
  "cart/getRecentCartItems",
  async () => {
    if (getToken()) {
      const response = await cartApi.get();
      return response.result;
    } else return [];
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (data) => {
    const response = await cartApi.add(data);
    if (response.result) {
      // toast.success("SUCCESS");
      return response.result;
    } else toast.error("ERROR");
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (data) => {
    const response = await cartApi.update(data.id, data.body);
    if (response.result.success) {
      // toast.success("SUCCESS");
      return response.result.success;
    } else toast.error("ERROR");
  }
);
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (data) => {
    const response = await cartApi.delete(data);
    if (response.result.success) {
      // toast.success("SUCCESS");
      return response.result.success;
    } else toast.error("ERROR");
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    recentProducts: [],
    isUpdated: 0,
    isNew: false,
    quantity: 0,
    isLoading: false,
    error: false,
  },
  reducers: {
    reset: (state) => {
      state.quantity = 0;
    },
  },
  extraReducers: {
    [addCartItem.pending]: (state) => {
      state.isLoading = true;
    },
    [addCartItem.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [addCartItem.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.isNew = action.payload.new;
      state.quantity += 1;
      state.isUpdated = state.isUpdated + 1;
    },
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [updateQuantity.pending]: (state) => {
      state.isLoading = true;
    },
    [updateQuantity.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [updateQuantity.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isUpdated = state.isUpdated + 1;
    },

    [deleteCartItem.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCartItem.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    [deleteCartItem.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isUpdated = state.isUpdated + 1;

      // state.products.splice(
      //   state.products.findIndex((item) => item._id === action.payload.id),
      //   1
      // );
    },
    [getRecentCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecentCartItems.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getRecentCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.recentProducts = action.payload.recentItems;
      state.quantity = action.payload.totalItem;
    },
  },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
