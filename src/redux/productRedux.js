import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import { toast } from "react-toastify";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (data) => {
    const response = await productApi.getProducts(data);
    return response.result;
  }
);
export const getShopProducts = createAsyncThunk(
  "product/getShopProducts",
  async (data) => {
    const response = await productApi.getShopProducts(data.id, data.params);
    return response.result;
  }
);

export const createProduct = createAsyncThunk(
  "product/create",
  async (data) => {
    const response = await productApi.create(data);
    if (response.result) {
      toast.success("SUCCESS");
      return response.result;
    } else toast.error("ERROR");
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async (data) => {
    const response = await productApi.update(data.id, data.body);
    if (response.result.success) {
      toast.success("SUCCESS");
      return data.id;
    } else toast.error("ERROR");
  }
);
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (data) => {
    const response = await productApi.delete(data);
    if (response.result.success) {
      toast.success("SUCCESS");
      return data;
    } else toast.error("ERROR");
  }
);

export const getProduct = createAsyncThunk("product/getProduct", async (id) => {
  const response = await productApi.get(id);
  return response.result;
});

export const getBestSellingProducts = createAsyncThunk(
  "product/getBestSellingProducts",
  async (data) => {
    const response = await productApi.getBestSellingProducts(data);
    return response.result;
  }
);
//
export const getPurchasedProducts = createAsyncThunk(
  "product/getPurchasedProducts",
  async (data) => {
    const response = await productApi.getPurchasedProducts(data);
    return response.result;
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    products: [],
    productVersions: [],
    totalProducts: 0,
    currentPage: 1,
    isLoading: false,
    isUpdating: false,
    error: false,
    //
    bestSellingProducts: [],
  },
  reducers: {
    getProductVersions: (state, action) => {
      state.productVersions = action.payload;
    },
    addProductVersion: (state, action) => {
      state.productVersions.push(action.payload);
    },
    updateProductVersion: (state, action) => {
      state.productVersions = state.productVersions?.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeProductVersion: (state, action) => {
      state.productVersions = state.productVersions.filter(
        (item) => item.id !== action.payload
      );
    },
    resetProductVersion: (state, action) => {
      state.productVersions = [];
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      state.currentPage = action.payload.currentPage;
    },
    [getShopProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getShopProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getShopProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      state.currentPage = action.payload.currentPage;
    },
    [createProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [createProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.product = action.payload;
    },
    [getProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.product = action.payload;
      state.productVersions = action.payload.productVersions;
    },

    [updateProduct.pending]: (state) => {
      state.isLoading = true;
      state.isUpdating = true;
    },
    [updateProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.isUpdating = false;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isUpdating = false;
    },

    [deleteProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products.splice(
        state.products.findIndex((item) => +item.id === +action.payload),
        1
      );
    },

    //
    [getBestSellingProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getBestSellingProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getBestSellingProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bestSellingProducts = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      state.currentPage = action.payload.currentPage;
    },
    //
    [getPurchasedProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getPurchasedProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getPurchasedProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.purchasedProducts = action.payload;
    },
  },
});

export const {
  getProductVersions,
  addProductVersion,
  updateProductVersion,
  removeProductVersion,
  resetProductVersion,
} = productSlice.actions;
export default productSlice.reducer;
