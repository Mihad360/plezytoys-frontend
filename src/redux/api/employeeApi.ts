import { baseApi } from "./baseApi";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Employee Home Summary & Stats
    getEmployeeHomeSummary: builder.query<any, void>({
      query: () => ({
        url: "/employee/home-summary",
        method: "GET",
      }),
      providesTags: ["employee", "patrol", "location", "report", "announcement"],
    }),

    getEmployeeOperationalHistory: builder.query<any, { filter?: string } | void>({
      query: (params) => ({
        url: "/employee/history",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["employee"],
    }),

    // 2. Locations
    getEmployeeLocations: builder.query<any, void>({
      query: () => ({
        url: "/employee/locations",
        method: "GET",
      }),
      providesTags: ["location"],
    }),

    getLocationById: builder.query<any, string>({
      query: (id) => ({
        url: `/locations/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "location", id }],
    }),

    // 3. Patrol Routes & Executions
    getPatrolRoutes: builder.query<any, { locationId?: string } | void>({
      query: (params) => ({
        url: "/patrol-routes",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["patrolRoute"],
    }),

    getPatrolRouteById: builder.query<any, string>({
      query: (id) => ({
        url: `/patrol-routes/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "patrolRoute", id }],
    }),

    getPatrolExecutions: builder.query<
      any,
      { locationId?: string; executedBy?: string; status?: string } | void
    >({
      query: (params) => ({
        url: "/patrol-executions",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["patrolExecution"],
    }),

    getPatrolExecutionById: builder.query<any, string>({
      query: (id) => ({
        url: `/patrol-executions/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "patrolExecution", id }],
    }),

    getMyActiveExecution: builder.query<any, void>({
      query: () => ({
        url: "/patrol-executions/active",
        method: "GET",
      }),
      providesTags: ["patrolExecution"],
    }),

    // 4. Reports
    getReports: builder.query<
      any,
      { locationId?: string; status?: string; authorId?: string; searchTerm?: string } | void
    >({
      query: (params) => ({
        url: "/reports",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["report"],
    }),

    getReportById: builder.query<any, string>({
      query: (id) => ({
        url: `/reports/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "report", id }],
    }),

    // 5. Schedule & Shifts
    getMyShifts: builder.query<any, void>({
      query: () => ({
        url: "/shifts/me",
        method: "GET",
      }),
      providesTags: ["shift"],
    }),

    // 6. Work Sessions
    getMyWorkSessions: builder.query<any, void>({
      query: () => ({
        url: "/work-sessions/me",
        method: "GET",
      }),
      providesTags: ["workSession"],
    }),

    getActiveWorkSession: builder.query<any, void>({
      query: () => ({
        url: "/work-sessions/active",
        method: "GET",
      }),
      providesTags: ["workSession"],
    }),

    // 7. Announcements
    getAnnouncements: builder.query<any, void>({
      query: () => ({
        url: "/announcements",
        method: "GET",
      }),
      providesTags: ["announcement"],
    }),

    markAnnouncementAsRead: builder.mutation<any, string>({
      query: (id) => ({
        url: `/announcements/${id}/read`,
        method: "POST",
      }),
      invalidatesTags: ["announcement", "employee"],
    }),

    // 8. AI Assistant
    askAIQuestion: builder.mutation<any, { question: string }>({
      query: (data) => ({
        url: "/ai/ask",
        method: "POST",
        data,
      }),
      invalidatesTags: ["ai"],
    }),

    // 9. NFC Checkpoints
    getNfcCheckpoints: builder.query<any, { locationId?: string } | void>({
      query: (params) => ({
        url: "/nfc-checkpoints",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["location"],
    }),

    // 10. Next Auto Employee ID (for adding/inviting employees)
    getNextEmployeeId: builder.query<any, void>({
      query: () => ({
        url: "/employee/next-employee-id",
        method: "GET",
      }),
      providesTags: ["employee"],
    }),

    // 11. Clock In / Out & Heartbeat Mutations
    clockIn: builder.mutation<
      any,
      { location: string; clockInLocation: { latitude: number; longitude: number; accuracy?: number }; deviceInfo?: string }
    >({
      query: (data) => ({
        url: "/work-sessions/clock-in",
        method: "POST",
        data,
      }),
      invalidatesTags: ["workSession", "employee"],
    }),

    clockOut: builder.mutation<
      any,
      { clockOutLocation?: { latitude: number; longitude: number }; notes?: string }
    >({
      query: (data) => ({
        url: "/work-sessions/clock-out",
        method: "POST",
        data,
      }),
      invalidatesTags: ["workSession", "employee"],
    }),

    pingHeartbeat: builder.mutation<
      any,
      { latitude: number; longitude: number; accuracy?: number }
    >({
      query: (data) => ({
        url: "/work-sessions/heartbeat",
        method: "POST",
        data,
      }),
    }),

    // 12. Submit Incident/Shift Report
    submitReport: builder.mutation<any, any>({
      query: (data) => ({
        url: "/reports",
        method: "POST",
        data,
      }),
      invalidatesTags: ["report", "employee"],
    }),

    // 13. Patrol Operations
    startPatrolExecution: builder.mutation<any, { routeId: string }>({
      query: (data) => ({
        url: "/patrol-executions/start",
        method: "POST",
        data,
      }),
      invalidatesTags: ["patrol", "patrolExecution", "employee"],
    }),

    finishPatrolExecution: builder.mutation<any, { id: string; notes?: string }>({
      query: ({ id, ...data }) => ({
        url: `/patrol-executions/${id}/finish`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["patrol", "patrolExecution", "employee"],
    }),

    scanCheckpoint: builder.mutation<
      any,
      { id: string; checkpointId: string; notes?: string; photoUrl?: string }
    >({
      query: ({ id, ...data }) => ({
        url: `/patrol-executions/${id}/scan`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["patrol", "patrolExecution"],
    }),

    // 14. Update Profile / Preferences
    updateEmployeeProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: "/users/edit-profile",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["auth", "user", "employee"],
    }),
  }),
});

export const {
  useGetEmployeeHomeSummaryQuery,
  useGetEmployeeOperationalHistoryQuery,
  useGetEmployeeLocationsQuery,
  useGetLocationByIdQuery,
  useGetPatrolRoutesQuery,
  useGetPatrolRouteByIdQuery,
  useGetPatrolExecutionsQuery,
  useGetPatrolExecutionByIdQuery,
  useGetMyActiveExecutionQuery,
  useGetReportsQuery,
  useGetReportByIdQuery,
  useGetMyShiftsQuery,
  useGetMyWorkSessionsQuery,
  useGetActiveWorkSessionQuery,
  useGetAnnouncementsQuery,
  useMarkAnnouncementAsReadMutation,
  useAskAIQuestionMutation,
  useGetNfcCheckpointsQuery,
  useGetNextEmployeeIdQuery,
  useClockInMutation,
  useClockOutMutation,
  usePingHeartbeatMutation,
  useSubmitReportMutation,
  useStartPatrolExecutionMutation,
  useFinishPatrolExecutionMutation,
  useScanCheckpointMutation,
  useUpdateEmployeeProfileMutation,
} = employeeApi;
