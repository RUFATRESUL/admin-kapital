import userReducer from "./features/User/userSlice";
import { userApi } from "./api/authApi/userApi";
import { CustomsOfficesApi } from "./api/CustomsOfficesApi";
import { authApi } from "./api/authApi/authApi";
import { Continents } from "./api/Continents";
import { CountriesApi } from "./api/CountriesApi";
import { RolesApi } from "./api/RolesApi";
import CustomsOffices from "src/redux/features/customsOffices";
import ContinentsSlice from "src/redux/features/continents";

export const reducer = {
  user: userReducer,
  CustomsOffices,
  ContinentsSlice,
  [Continents.reducerPath]: Continents.reducer,
  [RolesApi.reducerPath]: RolesApi.reducer,
  [CountriesApi.reducerPath]: CountriesApi.reducer,
  [CustomsOfficesApi.reducerPath]: CustomsOfficesApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
};

export const middleWares = [
  userApi.middleware,
  authApi.middleware,
  CustomsOfficesApi.middleware,
  Continents.middleware,
  CountriesApi.middleware,
  RolesApi.middleware,
];
