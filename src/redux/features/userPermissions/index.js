import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  stepOneUser: {
    userName: "",
    name: "",
    surname: "",
    father: "",
    countryId: "",
    genderId: "",
    email: "",
    phone: "",
    customOfficeId: "",
    password: "",
    file: null,
  },
  imgFile: null,
  stepTwoUser: {
    userRoles: [],
    Gömrük: false,
    Tərəzi: false,
    Plomb: false,
    əməliyatının: false,
    bəyannaməsinin: false,
  },
  userEdit: {
    userName: "",
    name: "",
    surname: "",
    father: "",
    countryId: "",
    genderId: "",
    email: "",
    phone: "",
    customOfficeId: "",
    photoUrl: null,
    password: "",
  },
  stepCount: 0,
};

export const stepperSlice = createSlice({
  initialState,
  name: "stepperAttorneySlice",
  reducers: {
    setStepOneUser: (state, action) => ({
      ...state,
      stepOneUser: action.payload,
    }),
    setUserEdit: (state, action) => ({
      ...state,
      userEdit: action.payload,
    }),
    setImgFile: (state, action) => ({
      ...state,
      imgFile: action.payload,
    }),
    setStepTwoUser: (state, action) => ({
      ...state,
      stepTwoUser: action.payload,
    }),

    clearPersist: () => initialState,
  },
});

export const reducer = persistReducer(
  {
    key: "MC:UserPermissions",
    storage,
    whitelist: ["stepOneUser", "stepTwoUser", "imgFile", "userEdit"],
  },
  stepperSlice.reducer
);

export default reducer;
export const {
  setStepOneUser,
  setImgFile,
  setStepTwoUser,
  clearPersist,
  setUserEdit,
} = stepperSlice.actions;
