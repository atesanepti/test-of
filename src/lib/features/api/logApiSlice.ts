import { LogType, Prisma } from "@prisma/client";
import { apiSlice } from "./apiSlice";
import { ApiResponse } from "@/types/interface";

type LogFetchPayload = {
  payload: Prisma.logGetPayload<object>[];
};
type LogFetchReturn = ApiResponse & LogFetchPayload;

type LogUnseenCoundPayload = {
  payload: {
    unSeenLogs: number;
  };
};
type LogUnseenCoundReturn = ApiResponse & LogUnseenCoundPayload;
export const logApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchLogs: builder.query<LogFetchReturn, { logType?: LogType }>({
      query: ({ logType }) => ({
        url: `api/user/log?log-type=${logType ? logType : "ALL"}`,
        method: "GET",
      }),
    }),

    fetchUnSeenLogsCount: builder.query<LogUnseenCoundReturn, void>({
      query: () => ({
        url: `api/user/log/new`,
        method: "GET",
      }),
    }),

    logSeen: builder.mutation<void, void>({
      query: () => ({
        method: "PUT",
        url: "api/user/log",
      }),
    }),

  }),
});

export const { useFetchLogsQuery, useFetchUnSeenLogsCountQuery,useLogSeenMutation } = logApiSlice;
