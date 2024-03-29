import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tokenConfig } from "./auth";
import { addError } from "./errors";

const slice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    data: null,
    list: [],
    followers: [],
    followings: [],
  },
  reducers: {
    userLoadRequested: (state, action) => {
      state.isLoading = true;
    },

    userLoadSucceed: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    userSearchSucceed: (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    },
    userLoadFailed: (state, action) => {
      state.isLoading = false;
      state.data = null;
    },

    friendsLoadSucceed: (state, action) => {
      state.followers = action.payload.followers;
      state.followings = action.payload.followings;
    },
  },
});

const {
  userLoadRequested,
  userLoadSucceed,
  userLoadFailed,
  userSearchSucceed,
  friendsLoadSucceed,
} = slice.actions;

export default slice.reducer;

// Get current logged in user info
// export const getCurrentUserInfo = () => async (dispatch, getState) => {
//   dispatch({
//     type: userLoadRequested.type,
//   });

//   try {
//     const response = await axios.get(
//       "http://localhost:8000/api/user/",
//       tokenConfig(getState)
//     );

//     dispatch({
//       type: userLoadSucceed.type,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: userLoadFailed.type,
//     });
//   }
// };

export const getUserInfoByUsername = (username) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: userLoadRequested.type,
  });

  try {
    const response = await axios.get(
      `http://localhost:8000/api/user/${username}`,
      tokenConfig(getState)
    );

    dispatch({
      type: userLoadSucceed.type,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: userLoadFailed.type,
    });
  }
};

export const searchUser = (keyword) => async (dispatch, getState) => {
  dispatch({
    type: userLoadRequested.type,
  });

  try {
    const response = await axios.get(
      `http://localhost:8000/api/user/search/${keyword}`,
      tokenConfig(getState)
    );

    dispatch({
      type: userSearchSucceed.type,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: userLoadFailed.type,
    });
  }
};

export const followUser = (username) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/user/follow/${username}`,
      tokenConfig(getState)
    );
  } catch (error) {
    dispatch(addError("Failed to follow", error.response.status));
  }
};

export const unfollowUser = (username) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/user/unfollow/${username}`,
      tokenConfig(getState)
    );
  } catch (error) {
    dispatch(addError("Failed to unfollow", error.response.status));
  }
};

export const getFriends = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/user/friends",
      tokenConfig(getState)
    );

    dispatch({
      type: friendsLoadSucceed.type,
      payload: response.data,
    });
  } catch (error) {
    dispatch(addError("Failed to get friends", error.response.status));
  }
};
