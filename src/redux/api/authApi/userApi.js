import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "src/redux/features/User/userSlice";
import { APIBaseQuery } from "../axiosBase";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: APIBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query(token) {
        return {
          url: "auth/profile",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      transformResponse: (response) => response,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
