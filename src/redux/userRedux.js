import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "api/authApi";
import { toast } from "react-toastify";
import { setToken } from "utils/helpers";
import { reset } from "./cartRedux";

// async action
// await async action tren component
// unwrapResult => get payload and catch error
export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  // thunkAPI.dispatch(...)
  const response = await authApi.login(data);
  if (response.success) {
    setToken(response.token);
    await thunkAPI.dispatch(getInfo());
    return response.success;
  } else {
    toast.error("Login Failed!");
    return response;
  }
});

export const signUp = createAsyncThunk(
  "user/signUp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.signUp(data);
      console.log(response);
      if (response.result.success) return data.email;
      return response;
    } catch (error) {
      console.log(error);
      toast.error("ERROR");
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyEmail(data);
      return response;
    } catch (error) {
      console.log(error);
      toast.error("ERROR");
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPass = createAsyncThunk("user/forgotPass", async (data) => {
  const response = await authApi.forgotPass(data);
  if (response.result.success) return data.email;
  else return response;
});

export const resetPass = createAsyncThunk("user/resetPass", async (data) => {
  const response = await authApi.resetPass(data);
  if (response.result.success) return response.result.success;
  return response;
});

export const updatePass = createAsyncThunk("user/updatePass", async (data) => {
  const response = await authApi.updatePass(data);
  if (response?.success) {
    toast.success("SUCCESS");
    return response?.success;
  } else {
    toast.error("ERROR");
    return response;
  }
});

export const getInfo = createAsyncThunk("user/getInfo", async (data) => {
  const response = await authApi.getInfo();
  return response.result;
});
export const updateInfo = createAsyncThunk("user/updateInfo", async (data) => {
  const response = await authApi.updateInfo(data);
  if (response.result.success) {
    toast.success("SUCCESS");
    return data;
  } else toast.error("ERROR");
});

export const logOut = createAsyncThunk(
  "user/logOut",
  async (data, thunkAPI) => {
    thunkAPI.dispatch(reset());
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isLoading: false,
    error: "",
    email: "",
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
    },

    [signUp.pending]: (state) => {
      state.isLoading = true;
    },
    [signUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [signUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.email = action.payload;
    },

    [verifyEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [verifyEmail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [verifyEmail.fulfilled]: (state, action) => {
      state.isLoading = false;
    },

    [forgotPass.pending]: (state) => {
      state.isLoading = true;
    },
    [forgotPass.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [forgotPass.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.email = action.payload;
    },

    [resetPass.pending]: (state) => {
      state.isLoading = true;
    },
    [resetPass.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [resetPass.fulfilled]: (state, action) => {
      state.isLoading = false;
    },

    [updatePass.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePass.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [updatePass.fulfilled]: (state, action) => {
      state.isLoading = false;
    },

    [getInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    [updateInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [updateInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [updateInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentUser = {
        ...state.currentUser,
        name: action.payload.name,
        email: action.payload.email,
        avatar: action.payload.avatar,
        phone: action.payload.phone,
        gender: action.payload.gender,
      };
    },

    [logOut.pending]: (state) => {
      state.isLoading = true;
    },
    [logOut.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [logOut.fulfilled]: (state, action) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = false;
    },
  },
});

// export const {  } = userSlice.actions;
export default userSlice.reducer;
