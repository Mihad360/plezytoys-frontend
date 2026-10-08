import { baseApi } from "./baseApi";

export const managerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Manager Dashboard Stats & Attention Alerts
    getManagerDashboardStats: builder.query<any, { locationId?: string } | void>({
      query: (params) => ({
        url: "/manager/dashboard-stats",
        method: "GET",
        params: params?.locationId ? { locationId: params.locationId } : undefined,
      }),
      providesTags: ["manager", "patrol", "employee", "task", "report", "workSession"],
    }),

    // 2. Assigned Locations for this Manager
    getManagerLocations: builder.query<any, void>({
      query: () => ({
        url: "/manager/locations",
        method: "GET",
      }),
      providesTags: ["location", "manager"],
    }),

    // 3. Employees Live Status & Work Tracking
    getManagerEmployees: builder.query<any, { locationId?: string } | void>({
      query: (params) => ({
        url: "/manager/employees",
        method: "GET",
        params: params?.locationId ? { locationId: params.locationId } : undefined,
      }),
      providesTags: ["employee", "manager", "workSession"],
    }),

    // 4. Attention Required Alerts (GPS anomalies, missed checkpoints, overdue tasks)
    getManagerAlerts: builder.query<any, { locationId?: string } | void>({
      query: (params) => ({
        url: "/manager/alerts",
        method: "GET",
        params: params?.locationId ? { locationId: params.locationId } : undefined,
      }),
      providesTags: ["manager", "patrol", "task", "workSession"],
    }),

    // 5. Attendance & Work Sessions
    getManagerAttendance: builder.query<any, { locationId?: string } | void>({
      query: (params) => ({
        url: "/manager/attendance",
        method: "GET",
        params: params?.locationId ? { locationId: params.locationId } : undefined,
      }),
      providesTags: ["workSession", "manager"],
    }),

    // 6. Tasks for Manager
    getManagerTasks: builder.query<any, { locationId?: string; status?: string; assignedTo?: string } | void>({
      query: (params) => ({
        url: "/tasks",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["task", "manager"],
    }),

    getTaskById: builder.query<any, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "task", id }],
    }),

    // 7. Patrol Executions & Routes
    getManagerPatrolExecutions: builder.query<any, { locationId?: string; status?: string } | void>({
      query: (params) => ({
        url: "/patrol-executions",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["patrol", "patrolExecution", "manager"],
    }),

    // 8. Reports for Manager
    getManagerReports: builder.query<any, { locationId?: string; status?: string; searchTerm?: string } | void>({
      query: (params) => ({
        url: "/reports",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["report", "manager"],
    }),

    // 9. Announcements
    getManagerAnnouncements: builder.query<any, void>({
      query: () => ({
        url: "/announcements",
        method: "GET",
      }),
      providesTags: ["announcement", "manager"],
    }),

    // 10. Documents & Certificates
    getManagerDocuments: builder.query<any, void>({
      query: () => ({
        url: "/documents",
        method: "GET",
      }),
      providesTags: ["document", "manager"],
    }),

    // --- MUTATIONS ---

    // Create a new task (Manager / Admin)
    createTask: builder.mutation<any, any>({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        data,
      }),
      invalidatesTags: ["task", "manager"],
    }),

    // Update existing task
    updateTask: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, { id }) => ["task", "manager", { type: "task", id }],
    }),

    // Review submitted task (approve / reject / return)
    reviewTask: builder.mutation<any, { id: string; status: "approved" | "rejected" | "returned"; reviewNotes?: string }>({
      query: ({ id, ...data }) => ({
        url: `/tasks/${id}/review`,
        method: "POST",
        data,
      }),
      invalidatesTags: (result, error, { id }) => ["task", "manager", { type: "task", id }],
    }),

    // Review incident / observation report (approve / reject / under_review)
    reviewReport: builder.mutation<any, { id: string; status: "approved" | "rejected" | "under_review"; reviewNotes?: string }>({
      query: ({ id, ...data }) => ({
        url: `/reports/${id}/review`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["report", "manager"],
    }),

    // Create company announcement / operational bulletin
    createAnnouncement: builder.mutation<any, any>({
      query: (data) => ({
        url: "/announcements",
        method: "POST",
        data,
      }),
      invalidatesTags: ["announcement", "manager"],
    }),

    // Upload / register a compliance document or certificate
    uploadDocument: builder.mutation<any, any>({
      query: (data) => ({
        url: "/documents",
        method: "POST",
        data,
      }),
      invalidatesTags: ["document", "manager"],
    }),

    // Update manager profile
    updateManagerProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: "/users/edit-profile",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["auth", "manager", "user"],
    }),
  }),
});

export const {
  useGetManagerDashboardStatsQuery,
  useGetManagerLocationsQuery,
  useGetManagerEmployeesQuery,
  useGetManagerAlertsQuery,
  useGetManagerAttendanceQuery,
  useGetManagerTasksQuery,
  useGetTaskByIdQuery,
  useGetManagerPatrolExecutionsQuery,
  useGetManagerReportsQuery,
  useGetManagerAnnouncementsQuery,
  useGetManagerDocumentsQuery,
  // Mutations:
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useReviewTaskMutation,
  useReviewReportMutation,
  useCreateAnnouncementMutation,
  useUploadDocumentMutation,
  useUpdateManagerProfileMutation,
} = managerApi;

