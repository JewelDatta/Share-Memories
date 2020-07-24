import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./rootReducer";

export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware()],
  });
}
