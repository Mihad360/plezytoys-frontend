import { createApi } from "@reduxjs/toolkit/query/react";
import { envConfig } from "../../config/envConfig";
import { axiosBaseQuery } from "@/lib/axios/axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: [
    "auth",
    "user",
    "admin",
    "notification",
    "terms",
    "privacy",
    "about",
    "systemSettings",
    "company",
    "superAdmin",
    "subscriptionPlan",
    "payment",
    "supportTicket",
    "auditLog",
    "employee",
    "patrol",
    "patrolRoute",
    "patrolExecution",
    "location",
    "report",
    "announcement",
    "shift",
    "workSession",
    "ai",
    "manager",
    "document",
    "task",
    "conversation",
    "message",
  ],
  baseQuery: axiosBaseQuery({
    baseUrl: envConfig.baseApi as string,
  }),
  endpoints: () => ({}),
});
