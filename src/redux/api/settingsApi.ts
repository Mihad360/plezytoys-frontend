import { baseApi } from "./baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // About (read-only public)
    getAllAbout: builder.query({
      query: () => ({ url: "/about/", method: "GET" }),
      providesTags: ["about"],
    }),

    // Privacy (read-only public)
    getAllPrivacy: builder.query({
      query: () => ({ url: "/privacy/", method: "GET" }),
      providesTags: ["privacy"],
    }),

    // Terms (read-only public)
    getAllTerms: builder.query({
      query: () => ({ url: "/settings/terms", method: "GET" }),
      providesTags: ["terms"],
    }),

    // System Settings (Super Admin)
    getSystemSettings: builder.query({
      query: () => ({ url: "/system-settings", method: "GET" }),
      providesTags: ["systemSettings"],
    }),

    updateSystemSettings: builder.mutation({
      query: (data) => ({
        url: "/system-settings",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["systemSettings"],
    }),
  }),
});

export const {
  // About
  useGetAllAboutQuery,

  // Privacy
  useGetAllPrivacyQuery,

  // Terms
  useGetAllTermsQuery,

  // System Settings
  useGetSystemSettingsQuery,
  useUpdateSystemSettingsMutation,
} = settingsApi;
