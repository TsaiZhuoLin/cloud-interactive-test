import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StockQueryParams } from "../../types/stockTypes";

const stockApiHeader = {
  "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
  "x-rapidapi-key": "256a0c2157msha2003e205d5bc6bp136c91jsn4427fe08a1f8",
};

const baseUrl = "https://alpha-vantage.p.rapidapi.com";

const createRequest = (url: string) => ({
  url,
  headers: stockApiHeader,
});

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: builder => ({
    getStock: builder.query({
      query: (params: StockQueryParams) => {
        const {
          interval,
          function: funcParams, // due to function is reserved word
          symbol,
          datatype,
          output_size,
        } = params;
        return createRequest(
          `/query?interval=${interval}&function=${funcParams}&symbol=${symbol}&datatype=${datatype}&output_size${output_size}`,
        );
      },
    }),
  }),
});

export const { useGetStockQuery } = stockApi;
