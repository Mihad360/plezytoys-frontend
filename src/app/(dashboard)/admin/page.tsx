"use client";

import Link from "next/link";
import { Bell, AlertCircle, RefreshCw } from "lucide-react";
import { useGetDashboardStatsQuery } from "@/redux/api/superAdminApi";
import { useGetAllCompaniesQuery } from "@/redux/api/companyApi";

export default function AdminDashboardPage() {
  const {
    data: statsData,
    isLoading: isStatsLoading,
    isError: isStatsError,
    refetch: refetchStats,
  } = useGetDashboardStatsQuery(undefined);

  const {
    data: companiesData,
    isLoading: isCompaniesLoading,
    isError: isCompaniesError,
    refetch: refetchCompanies,
  } = useGetAllCompaniesQuery(undefined);

  const stats = statsData?.data;
  const companies = companiesData?.data || [];

  const isLoading = isStatsLoading || isCompaniesLoading;
  const isError = isStatsError || isCompaniesError;

  const totalCompanies = stats?.totalCompanies ?? companies.length ?? 0;
  const activeCompanies =
    stats?.activeCompanies ??
    companies.filter((c: any) => c.isActive && c.subscriptionStatus !== "suspended").length;
  const trialCompanies = companies.filter(
    (c: any) => c.accountType === "trial" || c.subscriptionStatus === "trial"
  ).length;
  const suspendedCompanies =
    stats?.suspendedCompanies ??
    companies.filter((c: any) => c.subscriptionStatus === "suspended" || !c.isActive).length;

  const activeEmployees = stats?.totalUsers ?? 0;
  const activeCustomers = stats?.totalCustomers ?? 0;
  const totalPlans = stats?.totalPlans ?? 0;

  const STATS = [
    { label: "TOTAL COMPANIES", value: String(totalCompanies), colSpan: 1 },
    { label: "ACTIVE", value: String(activeCompanies), colSpan: 1, color: "text-[#f97316]" },
    { label: "TRIAL", value: String(trialCompanies), colSpan: 1 },
    { label: "SUSPENDED", value: String(suspendedCompanies), colSpan: 1 },
  ];

  const STATS_ROW_2 = [
    { label: "PLATFORM USERS", value: String(activeEmployees) },
    { label: "TOTAL CUSTOMERS", value: String(activeCustomers) },
    { label: "SUBSCRIPTION PLANS", value: String(totalPlans), color: "text-[#f97316]" },
  ];

  const getStatusBadge = (company: any) => {
    const status = company.subscriptionStatus || (company.isActive ? "active" : "inactive");
    if (status === "active") {
      return {
        label: "Active",
        className: "bg-green-50 text-green-600 border-green-200",
      };
    }
    if (status === "trial") {
      return {
        label: "Trial",
        className: "bg-blue-50 text-blue-600 border-blue-200",
      };
    }
    return {
      label: status.charAt(0).toUpperCase() + status.slice(1),
      className: "bg-red-50 text-red-600 border-red-200",
    };
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Dashboard</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              refetchStats();
              refetchCompanies();
            }}
            title="Refresh Data"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-[#1a2642] text-[22px] font-bold mb-1">Platform Overview</h2>
              <p className="text-gray-500 text-[14px]">Real-time metrics across all tenant companies</p>
            </div>
            {isError && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5">
                <AlertCircle size={16} />
                <span>Failed to load live metrics</span>
              </div>
            )}
          </div>

          {/* Stats Grid 1 */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {STATS.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                  {stat.label}
                </p>
                {isLoading ? (
                  <div className="h-8 w-16 bg-gray-100 animate-pulse rounded"></div>
                ) : (
                  <p className={`text-[32px] font-bold ${stat.color || "text-[#1a2642]"}`}>
                    {stat.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Stats Grid 2 */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {STATS_ROW_2.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                  {stat.label}
                </p>
                {isLoading ? (
                  <div className="h-8 w-16 bg-gray-100 animate-pulse rounded"></div>
                ) : (
                  <p className={`text-[32px] font-bold ${stat.color || "text-[#1a2642]"}`}>
                    {stat.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Table Area */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-[#1a2642] font-semibold">Tenant Companies</h3>
              <Link
                href="/admin/companies"
                className="text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50 transition-colors"
              >
                View All Companies ({companies.length}) →
              </Link>
            </div>

            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-8 text-center text-gray-500">Loading companies...</div>
              ) : companies.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No companies found</div>
              ) : (
                <table className="w-full text-left text-[14px]">
                  <thead>
                    <tr className="bg-[#fcfdfd] border-b border-gray-100 text-gray-400 text-[11px] uppercase tracking-wider font-semibold">
                      <th className="px-6 py-4">Company</th>
                      <th className="px-6 py-4">Sector</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Plan</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.slice(0, 10).map((company: any) => {
                      const badge = getStatusBadge(company);
                      const planName =
                        typeof company.subscriptionPlan === "object"
                          ? company.subscriptionPlan?.name
                          : company.plan || "Starter";

                      return (
                        <tr
                          key={company._id}
                          className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0"
                        >
                          <td className="px-6 py-4 font-medium text-[#1a2642]">
                            <div>
                              <p className="font-semibold">{company.name || company.companyName}</p>
                              <p className="text-xs text-gray-400">
                                {company.contactEmail || company.businessEmail}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-500 capitalize">
                            {company.sector || "General"}
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-sm">
                            {company.phone || "—"}
                          </td>
                          <td className="px-6 py-4 font-medium text-[#1a2642]">{planName}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium border ${badge.className}`}
                            >
                              {badge.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/admin/companies/${company._id}`}
                              className="text-[#f97316] font-medium text-[13px] hover:underline"
                            >
                              Manage →
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
