import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import shipmentApi from "api/shipmentApi";
import { toast } from "react-toastify";

export const getShipments = createAsyncThunk(
  "shipment/getShipments",
  async () => {
    const response = await shipmentApi.getAll();
    if (response.result) return response.result;
    return [];
  }
);

export const createShipment = createAsyncThunk(
  "shipment/create",
  async (data) => {
    const response = await shipmentApi.create(data);
    if (response.result) {
      toast.success("SUCCESS");
      return response.result;
    } else toast.error("ERROR");
  }
);

export const updateShipment = createAsyncThunk(
  "shipment/update",
  async (data) => {
    const response = await shipmentApi.update(data.id, data.shipment);
    if (response.result.success) {
      toast.success("SUCCESS");
    } else toast.error("ERROR");
  }
);
export const deleteShipment = createAsyncThunk(
  "shipment/delete",
  async (data) => {
    const response = await shipmentApi.delete(data);
    if (response.result.success) {
      toast.success("SUCCESS");
      return data;
    } else toast.error("ERROR");
  }
);

export const getShipment = createAsyncThunk(
  "shipment/getShipment",
  async (id) => {
    const response = await shipmentApi.get(id);
    return response.result;
  }
);

const shipmentSlice = createSlice({
  name: "shipment",
  initialState: {
    shipment: null,
    shipments: [],
    isLoading: false,
    isUpdating: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getShipments.pending]: (state) => {
      state.isLoading = true;
    },
    [getShipments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getShipments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.shipments = action.payload;
    },

    [createShipment.pending]: (state) => {
      state.isLoading = true;
    },
    [createShipment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [createShipment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.shipments.push(action.payload);
    },

    [getShipment.pending]: (state) => {
      state.isLoading = true;
    },
    [getShipment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getShipment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.shipment = action.payload;
    },

    [updateShipment.pending]: (state) => {
      state.isLoading = true;
      state.isUpdating = false;
    },
    [updateShipment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.isUpdating = true;
    },
    [updateShipment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.shipment = action.payload;
      state.isUpdating = true;
    },

    [deleteShipment.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteShipment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [deleteShipment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.shipments.splice(
        state.shipments.findIndex((item) => +item.id === +action.payload),
        1
      );
    },
  },
});

// export const {} = shipmentSlice.actions;
export default shipmentSlice.reducer;
