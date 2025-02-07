import { DashboardChart } from "@/types/interface";
import { apiSlice } from "./apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPaymentData: builder.query<DashboardChart, void>({
      query: () => ({
        method: "GET",
        url: "api/admin/payment",
      }),
    }),
  }),
});


export const {useFetchPaymentDataQuery} = paymentApiSlice