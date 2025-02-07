import {
  ApiResponse,
  CreatePaymentGateway,
  UpdatePaymentGetway,
} from "@/types/interface";
import { apiSlice } from "./apiSlice";
import { Prisma } from "@prisma/client";

type PaymentGatewayPayload = {
  payload: Prisma.gatewayGetPayload<object>[];
};

type PaymentGateApiResponse = ApiResponse & PaymentGatewayPayload;

export const gatewayApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentGateway: builder.query<PaymentGateApiResponse, void>({
      query: () => ({
        method: "GET",
        url: "api/user/gateway",
      }),
      providesTags: ["gateway"],
    }),

    createPaymentGateway: builder.mutation<ApiResponse, CreatePaymentGateway>({
      query: (payload) => ({
        method: "POST",
        url: "api/admin/payment/gateway",
        body: payload,
      }),
      invalidatesTags: ["gateway"],
    }),

    updatePaymentGateway: builder.mutation<
      ApiResponse,
      { id: string; payload: UpdatePaymentGetway }
    >({
      query: ({ id, payload }) => ({
        method: "PUT",
        url: `api/admin/payment/gateway/${id}`,
        body: payload,
      }),
      invalidatesTags: ["gateway"],
    }),
  }),
});

export const {
  useGetPaymentGatewayQuery,
  useCreatePaymentGatewayMutation,
  useUpdatePaymentGatewayMutation,
} = gatewayApiSlice;
