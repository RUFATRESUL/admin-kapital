import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  countriesFilter: {
    data: [],
  },
  stepCount: 0,
};

export const customsOffices = createSlice({
  initialState,
  name: "customsOffices",
  reducers: {
    setCountriesFilter: (state, action) => ({
      ...state,
      countriesFilter: action.payload,
    }),
    clearPersist: () => initialState,
  },
});

export const reducer = persistReducer(
  {
    key: "MC:CustomsOffices",
    storage,
    whitelist: ["customsOffices"],
  },
  customsOffices.reducer
);

export default reducer;
export const { setCountriesFilter, clearPersist } = customsOffices.actions;
