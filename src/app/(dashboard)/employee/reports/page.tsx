"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, ArrowRight, ArrowLeft, RefreshCw, AlertCircle, Search } from "lucide-react";
import { useGetReportsQuery, useGetReportByIdQuery } from "@/redux/api/employeeApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function EmployeeReportsPage() {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const queryParams: any = {};
  if (statusFilter !== "all") queryParams.status = statusFilter;
  if (searchTerm.trim()) queryParams.searchTerm = searchTerm.trim();

  const {
    data: reportsData,
    isLoading: isReportsLoading,
    isError: isReportsError,
    refetch: refetchReports,
  } = useGetReportsQuery(queryParams);

  const {
    data: singleReportData,
    isLoading: isSingleLoading,
  } = useGetReportByIdQuery(selectedReportId || "", {
    skip: !selectedReportId,
  });

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const reports = reportsData?.data || [];
  const activeReport = singleReportData?.data || reports.find((r: any) => r._id === selectedReportId);

  const handleRefresh = () => {
    refetchReports();
  };

  const getStatusBadge = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "approved" || s === "resolved") {
      return {
        label: s.charAt(0).toUpperCase() + s.slice(1),
        className: "text-emerald-700 bg-emerald-50 border-emerald-100",
      };
    }
    if (s === "under_review" || s === "submitted") {
      return {
        label: s === "under_review" ? "Under Review" : "Submitted",
        className: "text-blue-700 bg-blue-50 border-blue-100",
      };
    }
    if (s === "rejected") {
      return {
        label: "Rejected",
        className: "text-red-700 bg-red-50 border-red-100",
      };
    }
    return {
      label: s ? s.charAt(0).toUpperCase() + s.slice(1) : "Available",
      className: "text-amber-700 bg-amber-50 border-amber-100",
    };
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">
            SHIFTPOINT • EMPLOYEE
          </p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Reports</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            title="Refresh Reports"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isReportsLoading ? "animate-spin" : ""} />
          </button>
          <Link href="/employee/notifications" className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#f97316] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
          </Link>
          <Link href="/employee/profile">
            <div className="w-10 h-10 rounded-full bg-[#f97316] hover:bg-[#e06511] cursor-pointer flex items-center justify-center text-white font-bold text-sm transition-colors">
              EM
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto space-y-6 mt-4">
          {/* Error Banner */}
          {isReportsError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to retrieve shared reports list.</p>
              </div>
              <button
                onClick={handleRefresh}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {selectedReportId === null ? (
            // LIST VIEW
            <div className="animate-in fade-in duration-300">
              <div className="mb-6">
                <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Reports</h2>
                <p className="text-gray-500 text-[14px]">
                  Access and download reports shared with your Employee account.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
                {/* Search & Filter Controls */}
                <div className="flex justify-between items-center mb-6">
                  <div className="w-[320px]">
                    <label className="text-gray-400 text-[11px] font-bold tracking-wide mb-1 block">
                      Search reports
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by title, location or ID"
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#f97316]"
                      />
                      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] focus:outline-none focus:border-[#f97316] shadow-sm"
                    >
                      <option value="all">All statuses</option>
                      <option value="approved">Approved</option>
                      <option value="submitted">Submitted</option>
                      <option value="under_review">Under Review</option>
                      <option value="resolved">Resolved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Reports Table */}
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 text-[10px] font-bold tracking-wider uppercase">
                      <th className="py-4 px-4">Report</th>
                      <th className="py-4 px-4">Location</th>
                      <th className="py-4 px-4">Date</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isReportsLoading ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-gray-400">
                          Loading reports...
                        </td>
                      </tr>
                    ) : reports.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-gray-400">
                          No matching reports found.
                        </td>
                      </tr>
                    ) : (
                      reports.map((report: any) => {
                        const dateFormatted = new Date(report.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        });
                        const locationName =
                          typeof report.location === "object"
                            ? report.location?.name
                            : report.locationName || "Assigned Location";
                        const badge = getStatusBadge(report.status);

                        return (
                          <tr
                            key={report._id}
                            className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer group"
                            onClick={() => setSelectedReportId(report._id)}
                          >
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-orange-50 text-[#f97316] flex items-center justify-center shrink-0">
                                  <svg
                                    width="14"
                                    height="16"
                                    viewBox="0 0 14 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M9 1V5H13"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M4 9H10"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M4 12H10"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M4 6H5"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <span className="text-[#1a2642] font-semibold">{report.title}</span>
                                  {report.reportId && (
                                    <span className="ml-2 text-[11px] text-gray-400 font-mono">
                                      #{report.reportId}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-500">{locationName}</td>
                            <td className="py-4 px-4 text-gray-500">{dateFormatted}</td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${badge.className}`}
                              >
                                {badge.label}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-[#f97316] text-[12px] font-semibold inline-flex items-center gap-1 group-hover:underline">
                                Open <ArrowRight size={12} />
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            // DETAILS VIEW
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button
                onClick={() => setSelectedReportId(null)}
                className="flex items-center gap-2 text-[#f97316] text-[13px] font-semibold hover:underline mb-4 cursor-pointer"
              >
                <ArrowLeft size={14} /> Back to Reports
              </button>

              <div className="mb-6">
                <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">
                  {activeReport?.title || "Report Details"}
                </h2>
                <p className="text-gray-500 text-[14px]">
                  {activeReport?.location?.name || "Assigned Location"} · Secure read-only report preview
                </p>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-700 text-[13px] mb-8">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 mt-0.5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p>This report is shared with your Employee account for viewing and record inspection.</p>
              </div>

              {isSingleLoading ? (
                <div className="bg-white rounded-xl p-12 text-center text-gray-400 animate-pulse">
                  Loading report contents...
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-6">
                  {/* Main Report Content */}
                  <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-gray-100 flex gap-6 items-start">
                      <div className="w-16 h-16 rounded-xl bg-orange-50 text-[#f97316] flex items-center justify-center shrink-0 border border-orange-100">
                        <svg
                          width="24"
                          height="28"
                          viewBox="0 0 14 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 1V5H13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-[#f97316] text-[10px] font-bold tracking-[0.1em] uppercase mb-1">
                          SHIFTPOINT REPORT {activeReport?.reportId ? `· #${activeReport.reportId}` : ""}
                        </p>
                        <div className="flex justify-between items-start">
                          <h3 className="text-[#1a2642] text-[24px] font-bold mb-1">{activeReport?.title}</h3>
                          <span
                            className={`px-3 py-1 text-[11px] font-semibold rounded-full border ${
                              getStatusBadge(activeReport?.status).className
                            }`}
                          >
                            {getStatusBadge(activeReport?.status).label}
                          </span>
                        </div>
                        <p className="text-gray-400 text-[13px]">
                          Submitted service record for {activeReport?.location?.name || "Location"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="p-6 border-r border-b border-gray-100">
                        <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">
                          ASSIGNED LOCATION
                        </p>
                        <p className="text-[#1a2642] text-[14px]">
                          {activeReport?.location?.name || "Assigned Site"}
                        </p>
                      </div>
                      <div className="p-6 border-b border-gray-100">
                        <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">
                          REPORT DATE
                        </p>
                        <p className="text-[#1a2642] text-[14px]">
                          {new Date(activeReport?.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="p-6 border-r border-b border-gray-100">
                        <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">
                          SUBMITTED AT
                        </p>
                        <p className="text-[#1a2642] text-[14px]">
                          {new Date(activeReport?.createdAt).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="p-6 border-b border-gray-100">
                        <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">
                          REPORT TYPE
                        </p>
                        <p className="text-[#1a2642] text-[14px] capitalize">
                          {activeReport?.type ? activeReport.type.replace("_", " ") : "Standard Report"}
                        </p>
                      </div>
                    </div>

                    {/* Summary / Body */}
                    <div className="p-8 border-b border-gray-100">
                      <h4 className="text-[#1a2642] text-[15px] font-bold mb-3">Submitted information</h4>
                      <p className="text-gray-600 text-[14px] leading-relaxed whitespace-pre-wrap">
                        {activeReport?.summary ||
                          activeReport?.description ||
                          "Routine patrol completed. All planned checkpoints and observations verified according to protocol."}
                      </p>
                    </div>

                    {/* Remarks / Review Comments */}
                    {activeReport?.reviewComments && (
                      <div className="p-8 border-b border-gray-100 bg-amber-50/20">
                        <h4 className="text-[#1a2642] text-[15px] font-bold mb-2">Reviewer Remarks</h4>
                        <p className="text-gray-600 text-[14px] leading-relaxed">
                          {activeReport.reviewComments}
                        </p>
                        {activeReport.reviewedAt && (
                          <p className="text-xs text-gray-400 mt-2">
                            Reviewed on{" "}
                            {new Date(activeReport.reviewedAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Photos & Attachments */}
                    {activeReport?.photos && activeReport.photos.length > 0 && (
                      <div className="p-8">
                        <h4 className="text-[#1a2642] text-[15px] font-bold mb-4">Photos & attachments</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {activeReport.photos.map((photo: any, index: number) => {
                            const url = typeof photo === "string" ? photo : photo.url;
                            return (
                              <div key={index} className="space-y-1">
                                <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={url}
                                    alt={`Attachment ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <p className="text-[11px] text-gray-500 font-medium">Attachment {index + 1}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Side: Author & Review info */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                      <h3 className="text-[#1a2642] text-[15px] font-bold mb-4">Author Details</h3>
                      <div className="space-y-3 text-xs">
                        <div>
                          <p className="text-gray-400 mb-0.5">Submitted By</p>
                          <p className="font-semibold text-[#1a2642]">
                            {activeReport?.author?.firstName
                              ? `${activeReport.author.firstName} ${activeReport.author.lastName || ""}`
                              : "Assigned Staff"}
                          </p>
                          <p className="text-gray-400">{activeReport?.author?.email || "—"}</p>
                        </div>
                        {activeReport?.assignedReviewer && (
                          <div className="pt-3 border-t border-gray-50">
                            <p className="text-gray-400 mb-0.5">Assigned Reviewer</p>
                            <p className="font-semibold text-[#1a2642]">
                              {activeReport.assignedReviewer.firstName}{" "}
                              {activeReport.assignedReviewer.lastName || ""}
                            </p>
                          </div>
                        )}
                        <div className="pt-3 border-t border-gray-50">
                          <p className="text-gray-400 mb-0.5">Priority Level</p>
                          <p className="font-semibold text-[#1a2642] capitalize">
                            {activeReport?.priority || "Normal"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
