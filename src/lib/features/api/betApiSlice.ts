import {
  ApiResponse,
  BetUpdateInput,
  MultiplierHistoryInput,
} from "@/types/interface";
import { apiSlice } from "./apiSlice";
import { Prisma } from "@prisma/client";

type FetchHistoryPayload = {
  payload : Prisma.multiplierHistoryGetPayload<{ include: { history: true } }>
}
type FetchHistoryType =  FetchHistoryPayload& ApiResponse

const betApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateForBet: builder.mutation<ApiResponse, BetUpdateInput>({
      query: (payload) => ({
        url: "api/user/bet",
        method: "PUT",
        body: payload,
      }),
    }),

    fetchMultiplierHistory: builder.query<FetchHistoryType, void>({
      query: () => ({
        url: "api/user/bet/multiplier/history",
        method: "GET",
      }),
      providesTags: ["multiplierHistory"],
    }),

    updateMultiplierHistory: builder.mutation<
      ApiResponse,
      MultiplierHistoryInput
    >({
      query: (payload) => ({
        url: "api/user/bet/multiplier/history",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["multiplierHistory"],
    }),
  }),
});

export const {
  useUpdateForBetMutation,
  useUpdateMultiplierHistoryMutation,
  useFetchMultiplierHistoryQuery,
} = betApiSlice;
