import { createApi } from "@reduxjs/toolkit/query/react";
// import { setContinentFilter } from "src/redux/features/continents";
import { APIBaseQuery } from "../axiosBase";

export const CountriesApi = createApi({
  reducerPath: "CountriesApi",
  baseQuery: APIBaseQuery,
  keepUnusedDataFor: 1,
  tagTypes: ["Countries"],
  endpoints: (builder) => ({
    countriesFilter: builder.query({
      query(filter) {
        const { CountryName, OrderBy, Take, Skip } = filter;
        return {
          url: `countries/filter`,
          params: { CountryName, OrderBy, Take, Skip },
        };
      },
      providesTags: ["Countries"],
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //   dispatch(setContinentFilter(data));
        } catch (error) {}
      },
    }),
    countriesById: builder.query({
      query(filter) {
        const { id } = filter;
        return {
          url: `countries/getById?id=${id}`,
        };
      },
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {}
      },
    }),
    countriesCreate: builder.mutation({
      query(data) {
        return {
          url: "countries",
          method: "POST",
          data,
        };
      },
      invalidatesTags: ["Countries"],
      transformResponse: (response) => response,
    }),
    countriesDelete: builder.mutation({
      query(data) {
        return {
          url: "countries",
          method: "DELETE",
          data,
        };
      },
      invalidatesTags: ["Countries"],
      transformResponse: (response) => response,
    }),
    countriesEdit: builder.mutation({
      query(data) {
        return {
          url: "countries",
          method: "PUT",
          data,
        };
      },
      invalidatesTags: ["Countries"],
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useCountriesFilterQuery,
  useLazyCountriesByIdQuery,
  useCountriesCreateMutation,
  useCountriesDeleteMutation,
  useCountriesEditMutation,
} = CountriesApi;
