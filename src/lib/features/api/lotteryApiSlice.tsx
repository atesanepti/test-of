import {
  ApiResponse,
  LotteryResultInput,
  LotteryTicketAdmiReturn,
  LotteryTicketsReturn,
} from "@/types/interface";
import { apiSlice } from "./apiSlice";

const lotteryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchLotteryTickets: builder.query<LotteryTicketsReturn, void>({
      query: () => ({
        url: "api/user/lottery",
        method: "GET",
      }),
      providesTags: ["lottery"],
    }),

    createLotteryTickets: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: "api/user/lottery",
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["lottery", "wallet"],
    }),

    fetchAllLottery: builder.query<LotteryTicketAdmiReturn, void>({
      query: () => ({
        url: "api/admin/lottery",
        method: "GET",
      }),
      providesTags: ["lottery"],
    }),

    makeLotteryResult: builder.mutation<ApiResponse, LotteryResultInput[]>({
      query: (body) => ({
        url: "api/admin/lottery",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["lottery"],
    }),
  }),
});

export const {
  useFetchLotteryTicketsQuery,
  useCreateLotteryTicketsMutation,
  useFetchAllLotteryQuery,
  useMakeLotteryResultMutation,
} = lotteryApiSlice;
