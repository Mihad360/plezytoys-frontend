import { baseApi } from "./baseApi";

export const superAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard Stats & Charts
    getDashboardStats: builder.query({
      query: () => ({
        url: "/super-admin/dashboard-stats",
        method: "GET",
      }),
      providesTags: ["superAdmin"],
    }),

    getDashboardCharts: builder.query({
      query: (period?: string) => ({
        url: "/super-admin/dashboard-charts",
        method: "GET",
        params: period ? { period } : undefined,
      }),
      providesTags: ["superAdmin"],
    }),

    // Platform Users
    getPlatformUsers: builder.query({
      query: (params?: { role?: string; status?: string; searchTerm?: string }) => ({
        url: "/super-admin/users",
        method: "GET",
        params,
      }),
      providesTags: ["user"],
    }),

    updateUserRole: builder.mutation({
      query: ({ id, role }: { id: string; role: string }) => ({
        url: `/super-admin/role/update/${id}`,
        method: "PATCH",
        data: { role },
      }),
      invalidatesTags: ["user"],
    }),

    updateUserStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/super-admin/status/update/${id}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["user"],
    }),

    // Trials & Pilots
    getTrialsAndPilots: builder.query({
      query: () => ({
        url: "/super-admin/trials",
        method: "GET",
      }),
      providesTags: ["superAdmin", "company"],
    }),

    activatePilot: builder.mutation({
      query: (data: { companyId: string; pilotDuration?: string; notes?: string }) => ({
        url: "/super-admin/trials/activate-pilot",
        method: "POST",
        data,
      }),
      invalidatesTags: ["superAdmin", "company"],
    }),

    // Subscription Plans
    getSubscriptionPlans: builder.query({
      query: () => ({
        url: "/subscription-plans",
        method: "GET",
      }),
      providesTags: ["subscriptionPlan"],
    }),

    getSubscriptionPlanById: builder.query({
      query: (id: string) => ({
        url: `/subscription-plans/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "subscriptionPlan", id }],
    }),

    createSubscriptionPlan: builder.mutation({
      query: (data) => ({
        url: "/subscription-plans",
        method: "POST",
        data,
      }),
      invalidatesTags: ["subscriptionPlan"],
    }),

    updateSubscriptionPlan: builder.mutation({
      query: ({ id, data }: { id: string; data: Record<string, any> }) => ({
        url: `/subscription-plans/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["subscriptionPlan"],
    }),

    deleteSubscriptionPlan: builder.mutation({
      query: (id: string) => ({
        url: `/subscription-plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subscriptionPlan"],
    }),

    // Payments / Invoices
    getPayments: builder.query({
      query: (params?: { status?: string; companyId?: string }) => ({
        url: "/payments",
        method: "GET",
        params,
      }),
      providesTags: ["payment"],
    }),

    getPaymentById: builder.query({
      query: (id: string) => ({
        url: `/payments/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "payment", id }],
    }),

    updatePaymentStatus: builder.mutation({
      query: ({ id, data }: { id: string; data: { status: string; invoiceUrl?: string } }) => ({
        url: `/payments/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["payment"],
    }),

    // Support Tickets
    getSupportTickets: builder.query({
      query: (params?: { status?: string; priority?: string; category?: string }) => ({
        url: "/support-tickets",
        method: "GET",
        params,
      }),
      providesTags: ["supportTicket"],
    }),

    getSupportTicketById: builder.query({
      query: (id: string) => ({
        url: `/support-tickets/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "supportTicket", id }],
    }),

    updateSupportTicket: builder.mutation({
      query: ({ id, data }: { id: string; data: Record<string, any> }) => ({
        url: `/support-tickets/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "supportTicket", id }, "supportTicket"],
    }),

    replyToSupportTicket: builder.mutation({
      query: ({ id, message }: { id: string; message: string }) => ({
        url: `/support-tickets/${id}/reply`,
        method: "POST",
        data: { message },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "supportTicket", id }, "supportTicket"],
    }),

    // Audit Logs
    getAuditLogs: builder.query({
      query: (params?: { action?: string; companyId?: string }) => ({
        url: "/audit-logs",
        method: "GET",
        params,
      }),
      providesTags: ["auditLog"],
    }),

    // System Settings
    getSystemSettings: builder.query({
      query: () => ({
        url: "/system-settings",
        method: "GET",
      }),
      providesTags: ["systemSettings"],
    }),

    updateSystemSettings: builder.mutation({
      query: (data: FormData | Record<string, any>) => ({
        url: "/system-settings",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["systemSettings"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetDashboardChartsQuery,
  useGetPlatformUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
  useGetTrialsAndPilotsQuery,
  useActivatePilotMutation,
  useGetSubscriptionPlansQuery,
  useGetSubscriptionPlanByIdQuery,
  useCreateSubscriptionPlanMutation,
  useUpdateSubscriptionPlanMutation,
  useDeleteSubscriptionPlanMutation,
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
  useUpdatePaymentStatusMutation,
  useGetSupportTicketsQuery,
  useGetSupportTicketByIdQuery,
  useUpdateSupportTicketMutation,
  useReplyToSupportTicketMutation,
  useGetAuditLogsQuery,
  useGetSystemSettingsQuery,
  useUpdateSystemSettingsMutation,
} = superAdminApi;
