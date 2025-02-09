import {
  AgentsReturn,
  ApiResponse,
  SiteSettingInput,
  SiteSettingReturn,
  UsersFAgetntFetchReturn,
} from "@/types/interface";
import { apiSlice } from "./apiSlice";

const settingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateSiteSetting: builder.mutation<ApiResponse, SiteSettingInput>({
      query: (body) => ({
        url: "api/admin/setting",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["setting"],
    }),

    fetchSiteSetting: builder.query<SiteSettingReturn, void>({
      query: () => ({
        url: "api/admin/setting",
        method: "GET",
      }),
      providesTags: ["setting"],
    }),

    fetchAgents: builder.query<AgentsReturn, void>({
      query: () => ({
        url: "api/admin/permission",
        method: "GET",
      }),
      providesTags: ["agents"],
    }),

    makeAgent: builder.mutation<ApiResponse, { id: string }>({
      query: ({ id }) => ({
        url: `api/admin/permission/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["agents", "usersFAgents"],
    }),

    deleteAgent: builder.mutation<ApiResponse, { id: string }>({
      query: ({ id }) => ({
        url: `api/admin/permission/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["agents", "usersFAgents"],
    }),

    fetchUsers: builder.query<UsersFAgetntFetchReturn, { search: string }>({
      query: ({ search }) => ({
        url: `api/admin/permission/users?search=${search}`,
        method: "GET",
      }),
      providesTags: ["usersFAgents", "agents"],
    }),
  }),
});

export const {
  useFetchSiteSettingQuery,
  useUpdateSiteSettingMutation,
  useFetchAgentsQuery,
  useMakeAgentMutation,
  useDeleteAgentMutation,
  useFetchUsersQuery,
} = settingApiSlice;
