import {
  createApi,
  fetchBaseQuery,

} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "/" });

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: [
    "gateway",
    "deposit",
    "withdraw",
    "wallet",
    "multiplierHistory",
    "users",
    "setting",
    "agents",
    "usersFAgents",
    "lottery",
    "contact",
  ],
  endpoints: () => ({}),
});
