import { createApi } from "@reduxjs/toolkit/query/react";
// import { setContinentFilter } from "src/redux/features/continents";
import { APIBaseQuery } from "../axiosBase";

export const RolesApi = createApi({
  reducerPath: "RolesApi",
  baseQuery: APIBaseQuery,
  keepUnusedDataFor: 1,
  tagTypes: ["Roles"],
  endpoints: (builder) => ({
    getRole: builder.query({
      query() {
        return {
          url: `role`,
        };
      },
      providesTags: ["Roles"],
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //   dispatch(setContinentFilter(data));
        } catch (error) {}
      },
    }),
    roleId: builder.query({
      query(filter) {
        const { id } = filter;
        return {
          url: `role/id?id=${id}`,
        };
      },
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {}
      },
    }),
    roleCreate: builder.mutation({
      query(data) {
        return {
          url: "role",
          method: "POST",
          data,
        };
      },
      invalidatesTags: ["Roles"],
      transformResponse: (response) => response,
    }),
    usersPermissions: builder.query({
      query() {
        return {
          url: `users/permissions`,
        };
      },
      // providesTags: ["Roles"],
      transformResponse: (result) => result,
      
    }),
    roleDelete: builder.mutation({
      query(data) {
        return {
          url: "role",
          method: "DELETE",
          data,
        };
      },
      invalidatesTags: ["Roles"],
      transformResponse: (response) => response,
    }),
    roleEdit: builder.mutation({
      query(data) {
        return {
          url: "role",
          method: "PUT",
          data,
        };
      },
      invalidatesTags: ["Roles"],
      transformResponse: (response) => response,
    }),
  }),
});

export const {
useGetRoleQuery,
useLazyRoleIdQuery,
useRoleCreateMutation,
useUsersPermissionsQuery,
useRoleDeleteMutation,
useRoleEditMutation,
} = RolesApi;
