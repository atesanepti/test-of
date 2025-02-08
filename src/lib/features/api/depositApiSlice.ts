import {
  ApiResponse,
  CreateDeposit,
  FetchDataInput,
  UpdateDepositStatus,
} from "@/types/interface";
import { apiSlice } from "./apiSlice";
import { Prisma } from "@prisma/client";

type FetchDepositsPayload = {
  payload: {
    totalFound: number;
    deposits: Prisma.depositsGetPayload<{
      include: {
        gateway: true;
        user: true;
      };
    }>[];
  };
};
type FetchDeposits = ApiResponse & FetchDepositsPayload;

const depositApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeDeposite: builder.mutation<ApiResponse, CreateDeposit>({
      query: (payload) => ({
        url: "api/user/deposit",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["log", "log-notic"],
    }),

    fetchAllDeposits: builder.query<FetchDeposits, FetchDataInput>({
      query: ({ page, search, status, method, date }) => ({
        url: `api/admin/payment/deposit?page=${page}&search=${search}&status=${status}&method=${method}&date=${date}`,
        method: "GET",
      }),
      providesTags: ["deposit"],
    }),

    updateDespositStatus: builder.mutation<
      ApiResponse,
      { id: string; payload: UpdateDepositStatus }
    >({
      query: ({ id, payload }) => ({
        url: `api/admin/payment/deposit/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["deposit"],
    }),
  }),
});

export const {
  useMakeDepositeMutation,
  useFetchAllDepositsQuery,
  useUpdateDespositStatusMutation,
} = depositApiSlice;
