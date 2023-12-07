import { createApi } from "@reduxjs/toolkit/query/react";
// import { setContinentFilter } from "src/redux/features/continents";
import { APIBaseQuery } from "../axiosBase";

export const CustomsOfficesApi = createApi({
  reducerPath: "CustomsOfficesApi",
  baseQuery: APIBaseQuery,
  keepUnusedDataFor: 1,
  tagTypes: ["CustomsOffices"],
  endpoints: (builder) => ({
    customsOfficesFilter: builder.query({
      query(filter) {
        const { Name, OrderBy, Take, Skip, search } = filter;
        return {
          url: `customsOffices/filter`,
          params: { Name, OrderBy, Take, Skip, ...(search ? {CusOffShortName: search}: null) },
        };
      },
      providesTags: ["CustomsOffices"],
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //   dispatch(setContinentFilter(data));
        } catch (error) { }
      },
    }),
    customsOfficesById: builder.query({
      query(filter) {
        const { id } = filter;
        return {
          url: `customsOffices/getById?id=${id}`,
        };
      },
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) { }
      },
    }),
    customsOfficesCreate: builder.mutation({
      query(data) {
        return {
          url: "customsOffices",
          method: "POST",
          data,
        };
      },
      invalidatesTags: ["CustomsOffices"],
      transformResponse: (response) => response,
    }),
    customsOfficesDelete: builder.mutation({
      query(data) {
        return {
          url: "customsOffices",
          method: "DELETE",
          data,
        };
      },
      invalidatesTags: ["CustomsOffices"],
      transformResponse: (response) => response,
    }),
    customsOfficesEdit: builder.mutation({
      query(data) {
        return {
          url: "customsOffices",
          method: "PUT",
          data,
        };
      },
      invalidatesTags: ["CustomsOffices"],
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useCustomsOfficesFilterQuery,
  useLazyCustomsOfficesByIdQuery,
  useCustomsOfficesCreateMutation,
  useCustomsOfficesDeleteMutation,
  useCustomsOfficesEditMutation,
} = CustomsOfficesApi;
