import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addError } from "./errors";
import { createMessage } from "./messages";
import { tokenConfig } from "./auth";

const slice = createSlice({
  name: "post",
  initialState: {
    profilePost: {
      isLoading: false,
      list: [],
      next: null,
      previous: null,
    },
    feedPost: {
      isLoading: false,
      list: [],
      next: null,
      previous: null,
    },
  },
  reducers: {
    postCreated: (post, action) => {
      post.profilePost.list.unshift(action.payload);
      post.feedPost.list.unshift(action.payload);
    },

    profilePostsLoaded: (post, action) => {
      post.profilePost.list = action.payload.results;
      post.profilePost.previous = action.payload.previous;
      post.profilePost.next = action.payload.next;
    },
    moreProfilePostsLoaded: (post, action) => {
      post.profilePost.list.push(...action.payload.results);
      post.profilePost.previous = action.payload.previous;
      post.profilePost.next = action.payload.next;
    },
    profilePostFetchFailed: (post, action) => {
      post.profilePost.isLoading = false;
      post.profilePost.list = [];
      post.profilePost.next = null;
      post.profilePost.previous = null;
    },

    feedPostsLoaded: (post, action) => {
      post.feedPost.list = action.payload.results;
      post.feedPost.previous = action.payload.previous;
      post.feedPost.next = action.payload.next;
    },
    morefeedPostsLoaded: (post, action) => {
      post.feedPost.list.push(...action.payload.results);
      post.feedPost.previous = action.payload.previous;
      post.feedPost.next = action.payload.next;
    },
    feedPostFetchFailed: (post, action) => {
      post.feedPost.isLoading = false;
      post.feedPost.list = [];
      post.feedPost.next = null;
      post.feedPost.previous = null;
    },
  },
});

const {
  postCreated,
  profilePostsLoaded,
  moreProfilePostsLoaded,
  profilePostFetchFailed,

  feedPostsLoaded,
  morefeedPostsLoaded,
  feedPostFetchFailed,
} = slice.actions;
export default slice.reducer;

export const addPost = (data) => async (dispatch, getState) => {
  try {
    // Headers
    const token = getState().auth.token;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    };

    const response = await axios.post(
      "http://localhost:8000/api/post/",
      data,
      config
    );
    dispatch({
      type: postCreated.type,
      payload: response.data,
    });

    dispatch(createMessage({ success: "New Post Added." }));
  } catch (error) {
    dispatch(addError(error.response.data, error.response.status));
  }
};

export const loadPostsByUsername = (username) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/post/${username}`,
      tokenConfig(getState)
    );

    dispatch({
      type: profilePostsLoaded.type,
      payload: response.data,
    });
  } catch (error) {
    dispatch(createMessage({ fail: "Failed to load Posts." }));
    dispatch({ type: profilePostFetchFailed.type });
  }
};

export const loadMorePostsByUsername = (url) => async (dispatch, getState) => {
  try {
    const response = await axios.get(url, tokenConfig(getState));

    dispatch({
      type: moreProfilePostsLoaded.type,
      payload: response.data,
    });
  } catch (error) {
    dispatch(createMessage({ fail: "Failed to load Posts." }));
    dispatch({ type: profilePostFetchFailed.type });
  }
};

export const loadFeedPosts = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/post/feed",
      tokenConfig(getState)
    );

    dispatch({
      type: feedPostsLoaded.type,
      payload: response.data,
    });
  } catch (error) {
    dispatch(createMessage({ fail: "Failed to load Posts." }));
    dispatch({ type: feedPostFetchFailed.type });
  }
};

export const loadMoreFeedPosts = (url) => async (dispatch, getState) => {
  try {
    const response = await axios.get(url, tokenConfig(getState));

    dispatch({
      type: morefeedPostsLoaded.type,
      payload: response.data,
    });
  } catch (error) {
    dispatch(createMessage({ fail: "Failed to load Posts." }));
    dispatch({ type: feedPostFetchFailed.type });
  }
};
