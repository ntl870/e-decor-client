import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogApi from "api/blogApi";
import { toast } from "react-toastify";

export const getPosts = createAsyncThunk("blog/getPosts", async (params) => {
  const response = await blogApi.getPosts(params);
  return response.result;
});
export const getMyPosts = createAsyncThunk(
  "blog/getMyPosts",
  async (params) => {
    const response = await blogApi.getMyPosts(params);
    return response.result;
  }
);

export const createPost = createAsyncThunk("blog/create", async (data) => {
  const response = await blogApi.create(data);
  if (response.result) {
    toast.success("SUCCESS");
    return response.result;
  } else toast.error("ERROR");
});

export const updatePost = createAsyncThunk("blog/update", async (data) => {
  const response = await blogApi.update(data.id, data.body);
  if (response.result.success) {
    toast.success("SUCCESS");
    return data.id;
  } else toast.error("ERROR");
});
export const deletePost = createAsyncThunk("blog/delete", async (data) => {
  const response = await blogApi.delete(data);
  if (response.result.success) {
    toast.success("SUCCESS");
    return data;
  } else toast.error("ERROR");
});

export const getPost = createAsyncThunk("blog/getPost", async (id) => {
  const response = await blogApi.get(id);
  return response.result;
});

// like
export const likePost = createAsyncThunk("blog/like", async (data) => {
  const response = await blogApi.like(data);
  if (response.result) {
    toast.success("SUCCESS");
    return response.result;
  } else toast.error("ERROR");
});
export const unlikePost = createAsyncThunk("blog/unlike", async (data) => {
  const response = await blogApi.unlike(data);
  if (response.result) {
    toast.success("SUCCESS");
    return response.result;
  } else toast.error("ERROR");
});

export const getMyLikes = createAsyncThunk(
  "blog/getMyLikes",
  async (params) => {
    const response = await blogApi.getMyLikes(params);
    return response.result;
  }
);

export const getDecorThemes = createAsyncThunk(
  "blog/getDecorThemes",
  async () => {
    const response = await blogApi.getDecorThemes();
    return response.result;
  }
);
const blogSlide = createSlice({
  name: "blog",
  initialState: {
    post: null,
    posts: [],
    totalPosts: 0,
    currentPage: 1,
    isLoading: false,
    isUpdating: false,
    error: false,
    search: "",
    //
    imgItem: {
      image: "",
      items: [],
    },
    images: [],
    decorThemes: [],
    decorTheme: [],
    //
  },
  reducers: {
    storeSearch(state, action) {
      state.search = action.payload;
    },
    storeDecorTheme(state, action) {
      state.decorTheme = [...state.decorTheme, action.payload];
    },
    deleteDecorTheme(state, action) {
      state.decorTheme = state.decorTheme.filter((i) => i !== action.payload);
    },
    storePage(state, action) {
      state.currentPage = action.payload;
    },
    //
    storeImageItem(state, action) {
      const tmp = state.images.find((item) => +item.id === +action.payload.id);
      if (!tmp) state.images = [...state.images, action.payload];
    },
    //
    storeItem(state, action) {
      console.log("action")
      console.log(action)
      state.images = state.images.map((item) =>
        +item.id === +action.payload.id
          ? { ...item, items: [...item.items, action.payload.data] }
          : item
      );
    },
    //
    storeItemCoords(state, action) {
      state.currentPage = action.payload;
    },
    storeItemProductId(state, action) {
      state.currentPage = action.payload;
    },
    //
    storeImage(state, action) {
      state.imgItem = { ...state.imgItem, image: action.payload };
    },

    //
    resetImages(state, action) {
      state.images = [];
    },
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
      state.totalPosts = action.payload.totalPosts;
      state.currentPage = action.payload.currentPage;
    },

    [getMyPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getMyPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
      state.totalPosts = action.payload.totalPosts;
      state.currentPage = action.payload.currentPage;
    },
    [createPost.pending]: (state) => {
      state.isLoading = true;
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      console.log(action);
    },

    [getPost.pending]: (state) => {
      state.isLoading = true;
    },
    [getPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      console.log(action);
      state.post = action.payload;
    },

    [updatePost.pending]: (state) => {
      state.isLoading = true;
      state.isUpdating = true;
    },
    [updatePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.isUpdating = false;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isUpdating = false;
    },

    [deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action);

      // state.posts.splice(
      //   state.posts.findIndex((item) => +item.id === +action.payload),
      //   1
      // );
    },
    // like
    [likePost.pending]: (state) => {
      state.isLoading = true;
    },
    [likePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [likePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      console.log(action);
    },
    [unlikePost.pending]: (state) => {
      state.isLoading = true;
    },
    [unlikePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [unlikePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = false;
      console.log(action);
    },
    //
    [getMyLikes.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyLikes.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getMyLikes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
      state.totalPosts = action.payload.totalPosts;
      state.currentPage = action.payload.currentPage;
    },
    //
    [getDecorThemes.pending]: (state) => {
      state.isLoading = true;
    },
    [getDecorThemes.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getDecorThemes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.decorThemes = action.payload;
    },
  },
});

export const {
  storeSearch,
  storeDecorTheme,
  storePage,
  deleteDecorTheme,
  storeImageItem,
  storeItem,
  resetImages,
} = blogSlide.actions;
export default blogSlide.reducer;
