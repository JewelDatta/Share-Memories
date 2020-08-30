import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addError } from "./errors";
import { createMessage } from "./messages";
import { tokenConfig } from "./auth";

const slice = createSlice({
  name: "post",
  initialState: {
    isLoading: false,
    list: [],
  },
  reducers: {
    postAdded: (post, action) => {
      post.list.push(action.payload);
    },

    postsLoaded: (post, action) => {
      post.list = action.payload;
    },
  },
});

const { postAdded, postsLoaded } = slice.actions;
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
      type: postAdded.type,
      payload: response.data,
    });

    dispatch(createMessage({ success: "New Post Added." }));
  } catch (error) {
    dispatch(addError(error.response.data, error.response.status));
  }
};

export const loadPosts = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/post/",
      tokenConfig(getState)
    );

    dispatch({
      type: postsLoaded.type,
      payload: response.data,
    });
  } catch (error) {
    dispatch(createMessage({ fail: "Failed to load Posts." }));
  }
};
