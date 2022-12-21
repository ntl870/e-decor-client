import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import addressApi from "api/addressApi";
import { toast } from "react-toastify";

export const getCities = createAsyncThunk("address/getCities", async () => {
  const response = await addressApi.getCities();
  return response.result;
});

export const getDistricts = createAsyncThunk(
  "address/getDistricts",
  async (params) => {
    const response = await addressApi.getDistricts({ cityId: params });
    return response.result;
  }
);

export const getWards = createAsyncThunk("address/getWards", async (params) => {
  const response = await addressApi.getWards({ districtId: params });
  return response.result;
});

//
export const getAddresses = createAsyncThunk("address/getAll", async () => {
  const response = await addressApi.getAll();
  return response.result;
});

export const addAddress = createAsyncThunk("address/add", async (data) => {
  const response = await addressApi.add(data);
  if (response.result) {
    toast.success("SUCCESS");
    return response.result;
  } else toast.error("ERROR");
});

export const updateAddress = createAsyncThunk(
  "address/update",
  async (data) => {
    const response = await addressApi.update(data.id, data.address);
    if (response.result.success) {
      toast.success("SUCCESS");
      return response.result.success;
    } else toast.error("ERROR");
  }
);
export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (data) => {
    const response = await addressApi.delete(data);
    if (response.result.success) {
      toast.success("SUCCESS");
      return data;
    } else toast.error("ERROR");
  }
);
const addressSlice = createSlice({
  name: "address",
  initialState: {
    cities: [],
    districts: [],
    wards: [],
    addresses: [],
    isLoading: false,
    isUpdating: false,
    error: false,
    defaultAddressId: null,
  },
  reducers: {
    reset: (state, action) => {
      state.districts = [];
      state.wards = [];
    },
  },
  extraReducers: {
    [getCities.pending]: (state) => {
      // state.isLoading = true;
    },
    [getCities.rejected]: (state, action) => {
      // state.isLoading = false;
      state.error = action.error;
    },
    [getCities.fulfilled]: (state, action) => {
      state.cities = action.payload;
      // state.isLoading = false;
    },
    [getDistricts.pending]: (state) => {
      // state.isLoading = true;
    },
    [getDistricts.rejected]: (state, action) => {
      // state.isLoading = false;
      state.error = action.error;
    },
    [getDistricts.fulfilled]: (state, action) => {
      state.districts = action.payload;
      // state.isLoading = false;
    },
    [getWards.pending]: (state) => {
      // state.isLoading = true;
    },
    [getWards.rejected]: (state, action) => {
      // state.isLoading = false;
      state.error = action.error;
    },
    [getWards.fulfilled]: (state, action) => {
      state.wards = action.payload;
      // state.isLoading = false;
    },
    //
    [getAddresses.pending]: (state) => {
      state.isLoading = true;
    },
    [getAddresses.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getAddresses.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.addresses = action.payload;
      state.defaultAddressId = action.payload?.[0]?.id;
    },

    [addAddress.pending]: (state) => {
      state.isLoading = true;
      state.isUpdating = true;
    },
    [addAddress.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [addAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isUpdating = false;
    },

    [updateAddress.pending]: (state) => {
      state.isLoading = true;
      state.isUpdating = true;
    },
    [updateAddress.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [updateAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isUpdating = false;
    },

    [deleteAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteAddress.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [deleteAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.addresses.splice(
        state.addresses.findIndex((item) => item.id === action.payload),
        1
      );
    },
  },
});

export const { reset } = addressSlice.actions;
export default addressSlice.reducer;
