import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    categories: [],
    selectedShopCategories: [],
    max: "",
    min: "",
    limit: 9,
    page: 1,
    ratings: "",
    keyword: "",
    shopKeyword: "",
    isLoading: false,
    error: false,
    //
    sort: "",
    order: "",
  },
  reducers: {
    storeKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    storeShopKeyword: (state, action) => {
      state.shopKeyword = action.payload;
    },
    storeCategories: (state, action) => {
      state.categories = action.payload;
    },
    storeSelectedShopCategories: (state, action) => {
      state.selectedShopCategories = action.payload;
    },
    storeRatings: (state, action) => {
      state.ratings = action.payload;
    },
    storeMin: (state, action) => {
      state.min = action.payload;
    },
    storeMax: (state, action) => {
      state.max = action.payload;
    },
    storePage: (state, action) => {
      state.page = action.payload;
    },
    resetFilter: (state, action) => {
      state.max = "";
      state.min = "";
      state.keyword = "";
      state.categories = [];
      state.ratings = [];
      state.page = 1;
      state.sort = "";
      state.order = "";
    },

    storeSortNOrder: (state, action) => {
      state.sort = action.payload.sort;
      state.order = action.payload.order;
    },
  },
  extraReducers: {},
});

export const {
  storeKeyword,
  storeCategories,
  storeMin,
  storeMax,
  storeRatings,
  resetFilter,
  storeShopKeyword,
  storeSelectedShopCategories,
  storePage,
  //
  storeSortNOrder,
} = filterSlice.actions;
export default filterSlice.reducer;
