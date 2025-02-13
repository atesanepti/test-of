import {
  ApiResponse,
  FeaturesImagesInput,
  FeaturesReturn,
} from "@/types/interface";
import { apiSlice } from "./apiSlice";

const featuresImageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchFeatureImage: builder.query<FeaturesReturn, void>({
      query: () => ({
        url: "api/user/features",
        method: "GET",
      }),
      providesTags: ["featuresImage"],
    }),

    updateFeatureImage: builder.mutation<ApiResponse, FeaturesImagesInput>({
      query: (body) => ({
        url: "api/admin/setting/features",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["featuresImage"],
    }),
  }),
});

export const { useFetchFeatureImageQuery,useUpdateFeatureImageMutation } = featuresImageApiSlice;
