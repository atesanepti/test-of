import {
  FetchUsersInput,
  UsersFetchReturn,
  FetchUserInput,
  UserFetchReturn,
  ApiResponse,
  UserUpdateInput,
} from "@/types/interface";
import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query<UsersFetchReturn, FetchUsersInput>({
      query: ({ page, status, search }) => ({
        url: `api/admin/users?page=${page}&search=${search}&status=${status}`,
        method: "GET",
      }),
    }),

    fetchUser: builder.query<UserFetchReturn, FetchUserInput>({
      query: ({ id }) => ({
        url: `api/admin/users/${id}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    userUpdate: builder.mutation<
      ApiResponse,
      { id: string; body: UserUpdateInput }
    >({
      query: ({ id, body }) => ({
        url: `/api/admin/users/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useFetchUsersQuery, useFetchUserQuery,useUserUpdateMutation } = userApiSlice;
