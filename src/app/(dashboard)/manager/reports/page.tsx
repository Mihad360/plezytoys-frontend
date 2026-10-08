"use client";

import { Bell, Search, RefreshCw, AlertCircle, CheckCircle2, ArrowRight, Check, X, Clock } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useGetManagerReportsQuery, useGetManagerLocationsQuery, useReviewReportMutation } from "@/redux/api/managerApi";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function ManagerReportsPage() {
  const [selectedLocationId, setSelectedLocationId] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");
  const [actionError, setActionError] = useState("");

  const { data: profileData } = useGetMyProfileQuery(undefined);
  const manager = profileData?.data;

  const { data: locationsData } = useGetManagerLocationsQuery();
  const locations = locationsData?.data || [];

  const [reviewReport, { isLoading: isReviewing }] = useReviewReportMutation();

  const {
    data: reportsData,
    isLoading,
    isError,
    refetch,
  } = useGetManagerReportsQuery({
    locationId: selectedLocationId === "all" ? undefined : selectedLocationId,
    status: statusFilter === "all" ? undefined : statusFilter,
    searchTerm: searchTerm.trim() || undefined,
  });

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const reports = reportsData?.data || [];

  const needsReviewCount = reports.filter((r: any) =>
    ["submitted", "under_review", "open"].includes(r.status)
  ).length;
  const approvedCount = reports.filter((r: any) =>
    ["approved", "resolved"].includes(r.status)
  ).length;
  const rejectedCount = reports.filter((r: any) => r.status === "rejected").length;

  const userInitials = manager?.name
    ? manager.name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "MG";

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Field & Shift Reports</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 bg-orange-50 border border-orange-100 text-[#d97706] rounded-full text-[13px] font-medium">
            Location scope:{" "}
            {selectedLocationId === "all"
              ? "All Locations"
              : locations.find((l: any) => l._id === selectedLocationId)?.name || "Selected"}
          </div>
          <button
            onClick={() => refetch()}
            title="Refresh Reports"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
            {unreadCount > 0 && (
              <div className="absolute top-0 right-0 w-4 h-4 bg-[#b45f06] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </div>
            )}
          </div>
          <Link href="/manager/profile">
            <div className="w-10 h-10 rounded-full bg-[#b45f06] flex items-center justify-center text-white font-bold text-sm cursor-pointer">
              {userInitials}
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Quick Metrics */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">TOTAL REPORTS</p>
              <p className="text-[#1a2642] font-bold text-[32px] leading-none">
                {isLoading ? "..." : reports.length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">NEEDS REVIEW</p>
              <p className="text-orange-500 font-bold text-[32px] leading-none">
                {isLoading ? "..." : needsReviewCount}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">APPROVED / RESOLVED</p>
              <p className="text-emerald-500 font-bold text-[32px] leading-none">
                {isLoading ? "..." : approvedCount}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">REJECTED</p>
              <p className="text-red-500 font-bold text-[32px] leading-none">
                {isLoading ? "..." : rejectedCount}
              </p>
            </div>
          </div>

          {actionSuccess && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between text-emerald-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} />
                <span className="text-sm font-medium">{actionSuccess}</span>
              </div>
              <button onClick={() => setActionSuccess("")} className="text-emerald-600 hover:text-emerald-800 text-sm font-bold">✕</button>
            </div>
          )}

          {actionError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-2">
                <AlertCircle size={18} />
                <span className="text-sm font-medium">{actionError}</span>
              </div>
              <button onClick={() => setActionError("")} className="text-red-600 hover:text-red-800 text-sm font-bold">✕</button>
            </div>
          )}

          {/* Filter Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <div className="relative w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, location or ID..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#f97316] shadow-sm"
                />
              </div>
              <div className="relative w-[240px]">
                <select
                  value={selectedLocationId}
                  onChange={(e) => setSelectedLocationId(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-[13px] text-[#1a2642] focus:outline-none shadow-sm cursor-pointer"
                >
                  <option value="all">All assigned locations</option>
                  {locations.map((loc: any) => (
                    <option key={loc._id} value={loc._id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative w-[180px]">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-[13px] text-[#1a2642] focus:outline-none shadow-sm cursor-pointer"
                >
                  <option value="all">All review statuses</option>
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {isError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to retrieve reports list.</p>
              </div>
              <button
                onClick={() => refetch()}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
              >
                Retry
              </button>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-[10px] font-bold tracking-wider uppercase bg-gray-50/50">
                  <th className="py-4 px-6">Report Title</th>
                  <th className="py-4 px-6">Facility Location</th>
                  <th className="py-4 px-6">Submitted By</th>
                  <th className="py-4 px-6">Submission Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400">
                      Loading reports...
                    </td>
                  </tr>
                ) : reports.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400">
                      No reports found for this filter.
                    </td>
                  </tr>
                ) : (
                  reports.map((report: any) => {
                    const authorName =
                      report.author?.name ||
                      `${report.author?.firstName || ""} ${report.author?.lastName || ""}`.trim() ||
                      "Field Staff";
                    const locName = report.location?.name || "Assigned Facility";

                    const dateFormatted = new Date(report.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });

                    return (
                      <tr key={report._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                        <td className="py-4 px-6">
                          <p className="font-semibold text-[#1a2642]">{report.title}</p>
                          <p className="text-[11px] text-gray-400 font-mono">
                            {report.reportId || `#REP-${report._id.slice(-5)}`}
                          </p>
                        </td>
                        <td className="py-4 px-6 text-gray-600">{locName}</td>
                        <td className="py-4 px-6 text-gray-600">{authorName}</td>
                        <td className="py-4 px-6 text-gray-600">{dateFormatted}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${
                              report.status === "approved" || report.status === "resolved"
                                ? "bg-emerald-50 text-emerald-700"
                                : report.status === "rejected"
                                ? "bg-red-50 text-red-700"
                                : "bg-orange-50 text-orange-700"
                            }`}
                          >
                            {report.status || "Submitted"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => {
                              setSelectedReport(report);
                              setReviewNotes("");
                              setActionError("");
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[620px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-[#1a2642] font-bold text-base">{selectedReport.title}</h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  {selectedReport.location?.name || "Facility"} • Submitted by: {selectedReport.author?.firstName || selectedReport.author?.name || "Officer"}
                </p>
              </div>
              <button onClick={() => setSelectedReport(null)} className="text-gray-400 hover:text-gray-600 text-lg">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs text-gray-700 max-h-[65vh] overflow-y-auto">
              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded bg-gray-100 font-medium capitalize text-gray-700">
                  Current Status: {selectedReport.status}
                </span>
                <span className="px-2.5 py-1 rounded bg-blue-50 font-medium text-blue-700">
                  Category: {selectedReport.category || selectedReport.reportType || "Incident"}
                </span>
              </div>

              <div>
                <p className="text-gray-400 font-semibold mb-1 uppercase text-[11px]">Report Description:</p>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm whitespace-pre-wrap">
                  {selectedReport.description || selectedReport.content || "No narrative content provided."}
                </p>
              </div>

              {selectedReport.photos && selectedReport.photos.length > 0 && (
                <div>
                  <p className="text-gray-400 font-semibold mb-1 uppercase text-[11px]">Attachments / Photos:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedReport.photos.map((p: any, idx: number) => {
                      const url = typeof p === "string" ? p : p.url;
                      return (
                        <a key={idx} href={url} target="_blank" rel="noreferrer" className="aspect-video bg-gray-100 rounded border overflow-hidden block hover:border-orange-500">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Manager Review Action Form */}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 bg-purple-50/40 p-4 rounded-xl border border-purple-100">
                <p className="font-bold text-[#1a2642] text-[13px]">Manager Assessment & Feedback</p>
                <textarea
                  rows={2}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Provide review observations or resolution notes for the guard..."
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#b45f06]"
                />
                <div className="flex gap-2">
                  <button
                    disabled={isReviewing}
                    onClick={async () => {
                      try {
                        await reviewReport({ id: selectedReport._id, status: "approved", reviewNotes }).unwrap();
                        setActionSuccess("Report approved successfully!");
                        setSelectedReport(null);
                      } catch (err: any) {
                        setActionError(err?.data?.message || "Failed to approve report.");
                      }
                    }}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <Check size={14} /> Approve & Close
                  </button>
                  <button
                    disabled={isReviewing}
                    onClick={async () => {
                      try {
                        await reviewReport({ id: selectedReport._id, status: "under_review", reviewNotes }).unwrap();
                        setActionSuccess("Report set to Under Review.");
                        setSelectedReport(null);
                      } catch (err: any) {
                        setActionError(err?.data?.message || "Failed to update report status.");
                      }
                    }}
                    className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <Clock size={14} /> Mark Under Review
                  </button>
                  <button
                    disabled={isReviewing}
                    onClick={async () => {
                      try {
                        await reviewReport({ id: selectedReport._id, status: "rejected", reviewNotes }).unwrap();
                        setActionSuccess("Report marked as rejected.");
                        setSelectedReport(null);
                      } catch (err: any) {
                        setActionError(err?.data?.message || "Failed to reject report.");
                      }
                    }}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <X size={14} /> Reject Report
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-5 py-2 bg-[#1a2642] hover:bg-[#233355] text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
