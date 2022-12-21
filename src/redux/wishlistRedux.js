import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import wishlistApi from "api/wishlistApi";
import { toast } from "react-toastify";

export const getWishlists = createAsyncThunk(
  "wishlist/getAll",
  async (data) => {
    const response = await wishlistApi.getAll(data);
    return response.result;
  }
);

export const createWishlist = createAsyncThunk(
  "wishlist/create",
  async (data) => {
    const response = await wishlistApi.create(data);
    if (response.result) {
      // toast.success("SUCCESS");
      return response.result;
    } else toast.error("ERROR");
  }
);

export const removeWishlist = createAsyncThunk(
  "wishlist/remove",
  async (data) => {
    const response = await wishlistApi.delete(data);
    if (response.result.success) {
      toast.success("SUCCESS");
      return data;
    } else toast.error("ERROR");
  }
);

export const deleteWishlist = createAsyncThunk(
  "wishlist/delete",
  async (data) => {
    const response = await wishlistApi.delete(data);
    if (response.result.success) {
      toast.success("SUCCESS");
      return data;
    } else toast.error("ERROR");
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlists: [],
    totalWishlists: 0,
    currentPage: 1,
    isLoading: false,
    isUpdating: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getWishlists.pending]: (state) => {
      state.isLoading = true;
    },
    [getWishlists.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getWishlists.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.wishlists = action.payload;
    },
    [createWishlist.pending]: (state) => {
      state.isLoading = true;
      state.isUpdating = true;
    },
    [createWishlist.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.isUpdating = false;
    },
    [createWishlist.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.isUpdating = false;
    },

    [removeWishlist.pending]: (state) => {
      state.isLoading = true;
    },
    [removeWishlist.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [removeWishlist.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
    },

    [deleteWishlist.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteWishlist.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [deleteWishlist.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.wishlists.splice(
        state.wishlists.findIndex((item) => item.id === action.payload),
        1
      );
    },
  },
});

// export const {} = wishlistSlice.actions;
export default wishlistSlice.reducer;
