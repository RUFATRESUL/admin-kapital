import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  continentFilter: {
    data: [],
  },
  stepCount: 0,
};

export const continents = createSlice({
  initialState,
  name: "continents",
  reducers: {
    setContinentFilter: (state, action) => ({
      ...state,
      continentFilter: action.payload,
    }),
    clearPersist: () => initialState,
  },
});

export const reducer = persistReducer(
  {
    key: "MC:Continents",
    storage,
    whitelist: ["continentFilter"],
  },
  continents.reducer
);

export default reducer;
export const { setContinentFilter, clearPersist } = continents.actions;
