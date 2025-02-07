import { ApiResponse } from "@/types/interface";
import { apiSlice } from "./apiSlice";
import { Prisma } from "@prisma/client";

type WalletFetchPayload = {
  payload: {
    mainWallet: Prisma.walletGetPayload<object>;
    bonusWallet: Prisma.walletGetPayload<object>;
  };
};

type WalletFetchDataType = ApiResponse & WalletFetchPayload;

const walletApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchWalletData: builder.query<WalletFetchDataType, void>({
      query: () => ({
        url: "api/user/wallet",
        method: "GET",
      }),
      providesTags: ["wallet"],
    }),
  }),
});

export const { useFetchWalletDataQuery } = walletApiSlice;
