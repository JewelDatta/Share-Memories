import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addError } from "./errors";
import { createMessage } from "./messages";

const slice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
  },
  reducers: {
    authRequested: (state, action) => {
      state.isLoading = true;
    },

    authSucceed: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    authFailed: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.user = null;
    },

    loginSucceed: (state, action) => {
      localStorage.setItem("token", action.payload.key);
      state.isAuthenticated = true;
      state.isLoading = false;
      state.token = action.payload.key;
    },

    loginFailed: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.user = null;
    },

    logoutSucceed: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.user = null;
    },

    registerSucceed: (state, action) => {
      localStorage.setItem("token", action.payload.key);
      state.isAuthenticated = true;
      state.isLoading = false;
      state.token = action.payload.key;
    },

    registerFailed: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.user = null;
    },
  },
});

const {
  authRequested,
  authSucceed,
  authFailed,
  loginSucceed,
  loginFailed,
  logoutSucceed,
  registerSucceed,
  registerFailed,
} = slice.actions;

export default slice.reducer;

// GET USER INFO
export const getCurrentUser = () => async (dispatch, getState) => {
  dispatch({
    type: authRequested.type,
  });

  try {
    const response = await axios.get(
      "http://localhost:8000/api/auth/user/",
      tokenConfig(getState)
    );

    dispatch({
      type: authSucceed.type,
      payload: response.data,
    });
  } catch (error) {
    // dispatch(addError(error.response.data, error.response.status));

    dispatch({
      type: authFailed.type,
    });
  }
};

// LOGIN USER
export const login = (username, password) => async (dispatch) => {
  try {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request Body
    const body = JSON.stringify({ username, password });
    const response = await axios.post(
      "http://localhost:8000/api/auth/login/",
      body,
      config
    );

    dispatch({
      type: loginSucceed.type,
      payload: response.data,
    });

    dispatch(getCurrentUser());
  } catch (error) {
    dispatch(addError(error.response.data, error.response.status));

    dispatch({
      type: loginFailed.type,
    });
  }
};

// LOGOUT USER
export const logout = () => async (dispatch, getState) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/logout/",
      null,
      tokenConfig(getState)
    );

    dispatch({
      type: logoutSucceed.type,
    });
  } catch (error) {
    dispatch(addError(error.response.data, error.response.status));
  }
};

// REGISTER USER
export const register = ({ username, password1, password2, email }) => async (
  dispatch
) => {
  try {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request Body
    const body = JSON.stringify({ username, email, password1, password2 });

    const response = await axios.post(
      "http://localhost:8000/api/auth/registration/",
      body,
      config
    );

    dispatch({
      type: registerSucceed.type,
      payload: response.data,
    });

    dispatch(
      createMessage({ successfulRegistration: "User registered successfully." })
    );

    dispatch(getCurrentUser());
  } catch (error) {
    dispatch(addError(error.response.data, error.response.status));

    dispatch({
      type: registerFailed.type,
    });
  }
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
