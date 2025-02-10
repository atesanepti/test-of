import { ApiResponse, SiteInfoInput, SiteInfoReturn } from "@/types/interface";
import { apiSlice } from "./apiSlice";

const siteInfoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    infoUpdate: builder.mutation<ApiResponse, SiteInfoInput>({
      query: (body) => ({
        url: "api/admin/setting/info",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["info"],
    }),

    fetchSiteInfo: builder.query<SiteInfoReturn, void>({
      query: () => ({
        url: "api/user/info",
        method: "GET",
      }),
      providesTags: ["info"],
    }),
  }),
});

export const { useInfoUpdateMutation, useFetchSiteInfoQuery } =
  siteInfoApiSlice;
