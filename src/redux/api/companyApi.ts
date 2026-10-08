import { baseApi } from "./baseApi";

export const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation({
      query: (data) => ({
        url: "/companies",
        method: "POST",
        data,
      }),
      invalidatesTags: ["company"],
    }),

    getAllCompanies: builder.query({
      query: () => ({
        url: "/companies",
        method: "GET",
      }),
      providesTags: ["company"],
    }),

    getCompanyById: builder.query({
      query: (id: string) => ({
        url: `/companies/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "company", id }],
    }),

    getMyCompany: builder.query({
      query: () => ({
        url: "/companies/my-company",
        method: "GET",
      }),
      providesTags: ["company"],
    }),

    updateCompany: builder.mutation({
      query: ({ id, data }: { id: string; data: Record<string, any> }) => ({
        url: `/companies/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["company"],
    }),

    updateCompanyModules: builder.mutation({
      query: ({ id, modules }: { id: string; modules: Record<string, boolean> }) => ({
        url: `/companies/${id}/modules`,
        method: "PATCH",
        data: modules,
      }),
      invalidatesTags: ["company"],
    }),

    deleteCompany: builder.mutation({
      query: (id: string) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["company"],
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetAllCompaniesQuery,
  useGetCompanyByIdQuery,
  useGetMyCompanyQuery,
  useUpdateCompanyMutation,
  useUpdateCompanyModulesMutation,
  useDeleteCompanyMutation,
} = companyApi;
