import { DashboardStictis } from "@/types/interface";
import { apiSlice } from "./apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchDashboard: builder.query<DashboardStictis, void>({
      query: () => ({
        url: "api/admin/statistics",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchDashboardQuery } = dashboardApiSlice;
