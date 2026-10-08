"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, RefreshCw, AlertCircle } from "lucide-react";
import { useGetSupportTicketsQuery } from "@/redux/api/superAdminApi";

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");

  const { data: response, isLoading, isError, refetch } = useGetSupportTicketsQuery({
    status: selectedStatus !== "all" ? selectedStatus : undefined,
    priority: selectedPriority !== "all" ? selectedPriority : undefined,
  });

  const tickets: any[] = response?.data?.tickets || response?.data || [];

  const filteredTickets = tickets.filter((t) => {
    const q = searchTerm.toLowerCase();
    const num = (t.ticketNumber || "").toLowerCase();
    const subj = (t.subject || t.title || "").toLowerCase();
    const comp = (
      typeof t.company === "object" ? t.company?.name || "" : ""
    ).toLowerCase();
    return num.includes(q) || subj.includes(q) || comp.includes(q);
  });

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "open":
        return { label: "Open", className: "bg-orange-50 text-[#f97316] border-orange-200" };
      case "in_progress":
        return { label: "In Progress", className: "bg-blue-50 text-blue-600 border-blue-200" };
      case "resolved":
        return { label: "Resolved", className: "bg-green-50 text-green-600 border-green-200" };
      case "closed":
        return { label: "Closed", className: "bg-gray-100 text-gray-500 border-gray-200" };
      default:
        return { label: status, className: "bg-gray-50 text-gray-600 border-gray-200" };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "urgent":
        return { label: "Urgent", className: "bg-red-50 text-red-600 border-red-200" };
      case "high":
        return { label: "High", className: "bg-orange-50 text-[#f97316] border-orange-200" };
      case "medium":
      case "normal":
        return { label: "Normal", className: "bg-blue-50 text-blue-600 border-blue-200" };
      case "low":
        return { label: "Low", className: "bg-gray-50 text-gray-500 border-gray-200" };
      default:
        return { label: priority, className: "bg-gray-50 text-gray-600 border-gray-200" };
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Support Center</h1>
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
          <div className="mb-8">
            <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Support Requests</h2>
            <p className="text-gray-500 text-[14px]">
              Manage customer tickets, operational queries, and technical support conversations.
            </p>
          </div>

          {/* Error Banner */}
          {isError && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
              <AlertCircle size={20} />
              <div className="flex-1">
                <p className="font-semibold text-sm">Failed to load support requests</p>
                <p className="text-xs text-red-600">Please check connection or retry.</p>
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
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-1 min-w-[260px] max-w-[400px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ticket #, subject, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642] focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642] focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>

                {/* Priority Filter */}
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642] focus:outline-none"
                >
                  <option value="all">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Normal / Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-500 shadow-sm">
                Loading support tickets...
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-500 shadow-sm">
                <p className="font-semibold text-gray-700 mb-1">No support tickets found</p>
                <p className="text-xs text-gray-400">All customer requests have been attended to.</p>
              </div>
            ) : (
              filteredTickets.map((req) => {
                const statusBadge = getStatusBadge(req.status);
                const priorityBadge = getPriorityBadge(req.priority);
                const compName =
                  typeof req.company === "object" ? req.company?.name || "Company" : "Company";
                const agentName =
                  typeof req.assignedToAdmin === "object"
                    ? req.assignedToAdmin?.name || `${req.assignedToAdmin?.firstName || ""} ${req.assignedToAdmin?.lastName || ""}`.trim()
                    : "Unassigned";

                return (
                  <div
                    key={req._id}
                    className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:border-gray-200 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono font-bold text-gray-400">
                          {req.ticketNumber || `#${req._id?.slice(-5).toUpperCase()}`}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${statusBadge.className}`}
                        >
                          {statusBadge.label}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${priorityBadge.className}`}
                        >
                          {priorityBadge.label}
                        </span>
                      </div>

                      <h3 className="text-[#1a2642] text-[16px] font-bold mb-2">
                        {req.subject || req.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span className="font-semibold text-[#1a2642]">{compName}</span>
                        <span>•</span>
                        <span className="capitalize">{req.category || "General"}</span>
                        <span>•</span>
                        <span>Agent: {agentName || "Unassigned"}</span>
                        <span>•</span>
                        <span>{formatDate(req.createdAt)}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-3">
                      <Link
                        href={`/admin/support/${req._id}`}
                        className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-[#1a2642] rounded-lg text-xs font-semibold transition-colors"
                      >
                        View Ticket →
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
