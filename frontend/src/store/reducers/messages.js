import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "messages",
  initialState: { data: {} },
  reducers: {
    messagesRecevied: (messages, action) => {
      messages.data = action.payload;
    },
  },
});

const { messagesRecevied } = slice.actions;
export default slice.reducer;

export const createMessage = (message) => (dispatch) => {
  dispatch({
    type: messagesRecevied.type,
    payload: message,
  });
};
