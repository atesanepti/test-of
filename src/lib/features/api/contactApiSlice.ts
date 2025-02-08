import {
  ApiResponse,
  ContactInfoCreate,
  ContactInfoReturn,
} from "@/types/interface";
import { apiSlice } from "./apiSlice";

const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchContactInfo: builder.query<ContactInfoReturn, void>({
      query: () => ({
        url: "api/user/contact",
        method: "GET",
      }),
      providesTags: ["contact"],
    }),

    updateContactInfo: builder.mutation<ApiResponse, ContactInfoCreate>({
      query: (body) => ({
        url: "api/admin/setting/contact",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const { useFetchContactInfoQuery, useUpdateContactInfoMutation } =
  contactApiSlice;
