"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, ChevronDown, RefreshCw, AlertCircle } from "lucide-react";
import { useGetAllCompaniesQuery } from "@/redux/api/companyApi";

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [isSectorOpen, setIsSectorOpen] = useState(false);

  const { data: response, isLoading, isError, refetch } = useGetAllCompaniesQuery(undefined);
  const companies: any[] = response?.data || [];

  // Filter companies
  const filteredCompanies = companies.filter((company) => {
    const name = (company.name || company.companyName || "").toLowerCase();
    const sector = (company.sector || "").toLowerCase();
    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) || sector.includes(searchTerm.toLowerCase());

    const status = (company.subscriptionStatus || (company.isActive ? "active" : "inactive")).toLowerCase();
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && (status === "active" || company.isActive)) ||
      (selectedStatus === "trial" && (status === "trial" || company.accountType === "trial")) ||
      (selectedStatus === "suspended" && status === "suspended") ||
      (selectedStatus === "cancelled" && (status === "cancelled" || !company.isActive));

    const matchesSector =
      selectedSector === "all" || sector === selectedSector.toLowerCase();

    return matchesSearch && matchesStatus && matchesSector;
  });

  const getStatusBadge = (company: any) => {
    const status = (company.subscriptionStatus || (company.isActive ? "active" : "inactive")).toLowerCase();
    if (status === "active" || company.isActive) {
      return {
        label: "Active",
        className: "bg-green-50 text-green-600 border-green-200",
      };
    }
    if (status === "trial" || company.accountType === "trial") {
      return {
        label: "Trial",
        className: "bg-blue-50 text-blue-600 border-blue-200",
      };
    }
    if (status === "suspended") {
      return {
        label: "Suspended",
        className: "bg-red-50 text-red-600 border-red-200",
      };
    }
    return {
      label: "Cancelled",
      className: "bg-gray-100 text-gray-600 border-gray-200",
    };
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Recent";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const sectors = ["all", "security", "facility_management", "logistics", "retail", "cleaning"];

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Companies</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            title="Refresh"
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
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-[#1a2642] text-[22px] font-bold mb-1">Companies</h2>
              <p className="text-gray-500 text-[14px]">
                Manage all tenant companies using SHIFTPOINT ({companies.length} total)
              </p>
            </div>
            <Link
              href="/admin/companies/create"
              className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
            >
              <span className="text-lg leading-none mb-0.5">+</span> Create Company
            </Link>
          </div>

          {/* Error Banner */}
          {isError && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
              <AlertCircle size={20} />
              <div className="flex-1">
                <p className="font-semibold text-sm">Failed to load companies from server</p>
                <p className="text-xs text-red-600">Please check network connection or backend service.</p>
              </div>
              <button
                onClick={() => refetch()}
                className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 min-w-[280px] max-w-[480px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search company or sector..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Status Tabs */}
              <div className="flex items-center p-1 bg-white border border-gray-200 rounded-lg">
                {["all", "active", "trial", "suspended", "cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md capitalize transition-colors ${
                      selectedStatus === st
                        ? "bg-[#1a2642] text-white"
                        : "text-gray-500 hover:text-[#1a2642] hover:bg-gray-50"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Sector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsSectorOpen(!isSectorOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] hover:bg-gray-50 transition-colors capitalize"
                >
                  {selectedSector === "all" ? "All Sectors" : selectedSector.replace("_", " ")}
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                {isSectorOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                    {sectors.map((sec) => (
                      <button
                        key={sec}
                        onClick={() => {
                          setSelectedSector(sec);
                          setIsSectorOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm capitalize hover:bg-gray-50 ${
                          selectedSector === sec ? "font-bold text-[#f97316]" : "text-gray-700"
                        }`}
                      >
                        {sec === "all" ? "All Sectors" : sec.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Grid Content */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm animate-pulse">
                  <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-100 rounded mb-4"></div>
                  <div className="h-4 w-full bg-gray-100 rounded mb-6"></div>
                  <div className="h-8 w-28 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
              <p className="text-gray-500 font-medium mb-2">No companies found</p>
              <p className="text-gray-400 text-sm">
                Try adjusting your search criteria or create a new company.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCompanies.map((company) => {
                const badge = getStatusBadge(company);
                const planName =
                  typeof company.subscriptionPlan === "object"
                    ? company.subscriptionPlan?.name
                    : company.plan || "Starter Plan";

                const employeeCount =
                  company.counts?.employeeCount ?? company.limits?.maxEmployees ?? 0;
                const locationCount =
                  company.counts?.locationCount ?? company.limits?.maxLocations ?? 0;

                return (
                  <div
                    key={company._id}
                    className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col hover:border-gray-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-[#1a2642] text-[16px] font-bold line-clamp-1">
                        {company.name || company.companyName}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium border shrink-0 ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </div>

                    <p className="text-gray-400 text-[13px] mb-4 capitalize">
                      {company.sector ? company.sector.replace("_", " ") : "General Business"}
                    </p>

                    <div className="flex items-center gap-4 text-[13px] mb-1.5">
                      <p>
                        <span className="font-bold text-[#1a2642]">{employeeCount}</span>{" "}
                        <span className="text-gray-500">Employees</span>
                      </p>
                      <p>
                        <span className="font-bold text-[#1a2642]">{locationCount}</span>{" "}
                        <span className="text-gray-500">Locations</span>
                      </p>
                    </div>

                    <p className="text-gray-400 text-[12px] mb-6">
                      {planName} · Since {formatDate(company.createdAt || company.joinedAt)}
                    </p>

                    <div className="mt-auto pt-2 flex items-center justify-between">
                      <Link
                        href={`/admin/companies/${company._id}`}
                        className="inline-block px-4 py-1.5 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] hover:bg-gray-50 hover:border-gray-300 transition-all"
                      >
                        View Company
                      </Link>
                      <Link
                        href={`/admin/companies/${company._id}/modules`}
                        className="text-xs text-gray-400 hover:text-[#f97316] font-medium transition-colors"
                      >
                        Modules →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
