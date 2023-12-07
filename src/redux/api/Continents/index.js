import { createApi } from "@reduxjs/toolkit/query/react";
import { setContinentFilter } from "src/redux/features/continents";
import { APIBaseQuery } from "../axiosBase";

export const Continents = createApi({
  reducerPath: "Continents",
  baseQuery: APIBaseQuery,
  keepUnusedDataFor: 1,
  tagTypes: ["Continents"],
  endpoints: (builder) => ({
    continentsFilter: builder.query({
      query(filter) {
        const { Name, OrderBy, Take, Skip } = filter;
        return {
          url: `continents/filter`,
          params: { Name, OrderBy, Take, Skip },
        };
      },
      providesTags: ["Continents"],
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setContinentFilter(data));
        } catch (error) {}
      },
    }),
    continentsById: builder.query({
      query(filter) {
        const { id } = filter;
        return {
          url: `continents/getById?id=${id}`,
        };
      },
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {}
      },
    }),
    continentsCreate: builder.mutation({
      query(data) {
        return {
          url: "continents",
          method: "POST",
          data,
        };
      },
      invalidatesTags: ["Continents"],
      transformResponse: (response) => response,
    }),
    continentsDelete: builder.mutation({
      query(data) {
        return {
          url: "continents",
          method: "DELETE",
          data,
        };
      },
      invalidatesTags: ["Continents"],
      transformResponse: (response) => response,
    }),
    continentsEdit: builder.mutation({
      query(data) {
        return {
          url: "continents",
          method: "PUT",
          data,
        };
      },
      invalidatesTags: ["Continents"],
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useContinentsFilterQuery,
  useLazyContinentsByIdQuery,
  useContinentsCreateMutation,
  useContinentsDeleteMutation,
  useContinentsEditMutation,
} = Continents;
