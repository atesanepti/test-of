import {
  ApiResponse,
  CreateWithdraw,
  FetchDataInput,
  UpdateWithdrawStatus,
} from "@/types/interface";
import { apiSlice } from "./apiSlice";
import { Prisma } from "@prisma/client";

type FetchWithdrawPayload = {
  payload: {
    totalFound: number;
    withdraws: Prisma.withdrawsGetPayload<{
      include: {
        gateway: true;
        user: true;
      };
    }>[];
  };
};
type FetchWithdraws = ApiResponse & FetchWithdrawPayload;

const withdrawApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeWithdraw: builder.mutation<ApiResponse, CreateWithdraw>({
      query: (body) => ({
        url: "api/user/withdraw",
        method: "POST",
        body,
      }),
    }),

    fetchAllWithdraw: builder.query<FetchWithdraws, FetchDataInput>({
      query: ({ page, search, status, method, date }) => ({
        url: `api/admin/payment/withdraw?page=${page}&search=${search}&status=${status}&method=${method}&date=${date}`,
        method: "GET",
      }),
      providesTags: ["withdraw"],
    }),

    updateWithdrawStatus: builder.mutation<
      ApiResponse,
      { id: string; payload: UpdateWithdrawStatus }
    >({
      query: ({ id, payload }) => ({
        url: `api/admin/payment/withdraw/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags : ["withdraw"]
    }),
  }),
});

export const {
  useMakeWithdrawMutation,
  useFetchAllWithdrawQuery,
  useUpdateWithdrawStatusMutation,
} = withdrawApiSlice;
