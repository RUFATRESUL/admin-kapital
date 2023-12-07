import { createApi } from "@reduxjs/toolkit/query/react";
import { setToken, setUserById } from "src/redux/features/User/userSlice";
import { APIBaseQuery } from "../axiosBase";
import { userApi } from "./userApi";

const USER = "User";
const USER_EDIT = "Edit";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: APIBaseQuery,
  // keepUnusedDataFor: 1,
  tagTypes: [USER, USER_EDIT],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query(data) {
        return {
          url: "auth/adminToken",
          method: "POST",
          data,
        };
      },
      transformResponse: (response) => response,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data));
          dispatch(userApi.endpoints.getMe.initiate(data?.token));
        } catch (error) {}
      },
    }),
    usersRegister: builder.mutation({
      query(data) {
        return {
          url: "users/register",
          method: "POST",
          data,
        };
      },
      invalidatesTags: [USER],
      transformResponse: (response) => response,
    }),
    changePassword: builder.mutation({
      query(data) {
        return {
          url: "users/changePassword",
          method: "PUT",
          data,
        };
      },
      transformResponse: (response) => response,
    }),
    usersEdit: builder.mutation({
      query(data) {
        return {
          url: "users",
          method: "PUT",
          data,
        };
      },
      invalidatesTags: [USER_EDIT],
      transformResponse: (response) => response,
    }),
    usersUpdateStatus: builder.mutation({
      query(data) {
        return {
          url: "users/updateStatus",
          method: "PUT",
          data,
        };
      },
      invalidatesTags: [USER_EDIT],
      transformResponse: (response) => response,
    }),
    userFilter: builder.query({
      query(filter) {
        const { Name, OrderBy, Take, Skip } = filter;
        return {
          url: `users/filter`,
          params: { Name, OrderBy, Take, Skip },
        };
      },
      transformResponse: (result) => result,
      providesTags: [USER, USER_EDIT],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {}
      },
    }),
    userById: builder.query({
      query(filter) {
        const { userId } = filter;
        return {
          url: `users/byId?userId=${userId}`,
        };
      },
      transformResponse: (result) => result,

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserById(data));
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useUsersUpdateStatusMutation,
  useChangePasswordMutation,
  useUsersRegisterMutation,
  useLazyUserByIdQuery,
  useLoginUserMutation,
  useUsersEditMutation,
  useUserFilterQuery,
} = authApi;
