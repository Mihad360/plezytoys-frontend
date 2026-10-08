"use client";

import { useState } from "react";
import { Bell, Search, RefreshCw, AlertCircle, X, ShieldAlert } from "lucide-react";
import { useGetAuditLogsQuery } from "@/redux/api/superAdminApi";

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const { data: response, isLoading, isError, refetch } = useGetAuditLogsQuery(undefined);
  const logs: any[] = response?.data?.logs || response?.data || [];

  const filteredLogs = logs.filter((log) => {
    const q = searchTerm.toLowerCase();
    const action = (log.action || "").toLowerCase();
    const details = (log.details || "").toLowerCase();
    const user = (
      typeof log.user === "object"
        ? `${log.user?.firstName || ""} ${log.user?.lastName || ""}`
        : ""
    ).toLowerCase();
    return action.includes(q) || details.includes(q) || user.includes(q);
  });

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Just now";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Audit Logs</h1>
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
        <div className="flex gap-8 max-w-[1400px] mx-auto h-full">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Platform Audit Logs</h2>
                <p className="text-gray-500 text-[14px]">
                  Immutable ledger of significant platform security events and administrative actions.
                </p>
              </div>
              <span className="text-xs text-gray-500 font-semibold px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
                Total Logs: {logs.length}
              </span>
            </div>

            {/* Error Banner */}
            {isError && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                <AlertCircle size={20} />
                <div className="flex-1">
                  <p className="font-semibold text-sm">Failed to load platform audit logs</p>
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

            {/* Search Filter */}
            <div className="mb-6">
              <div className="relative max-w-[420px]">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search audit actions, user, details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642] focus:outline-none focus:border-[#f97316]"
                />
              </div>
            </div>

            {/* Logs List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              {isLoading ? (
                <div className="p-12 text-center text-gray-500">Loading audit trail...</div>
              ) : filteredLogs.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No audit logs found</div>
              ) : (
                filteredLogs.map((log, i) => {
                  const userName =
                    typeof log.user === "object"
                      ? `${log.user?.firstName || ""} ${log.user?.lastName || ""}`.trim() || "Admin"
                      : "System";
                  const companyName =
                    typeof log.company === "object" ? log.company?.name : null;

                  return (
                    <div
                      key={log._id || i}
                      onClick={() => setSelectedLog(log)}
                      className={`p-6 flex items-start justify-between cursor-pointer hover:bg-gray-50/70 transition-colors ${
                        i !== filteredLogs.length - 1 ? "border-b border-gray-50" : ""
                      } ${selectedLog?._id === log._id ? "bg-orange-50/40" : ""}`}
                    >
                      <div className="flex gap-4">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center text-[#1a2642] font-bold text-[13px]">
                          {userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[#1a2642] font-bold text-[15px]">
                              {log.action?.replace(/_/g, " ")}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="text-gray-500 text-[13px]">{userName}</span>
                            {companyName && (
                              <>
                                <span className="text-gray-300">•</span>
                                <span className="text-[#f97316] font-medium text-[13px]">
                                  {companyName}
                                </span>
                              </>
                            )}
                          </div>
                          <p className="text-gray-500 text-[13px] mb-2">{log.details || "Activity performed"}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>{formatDate(log.createdAt)}</span>
                            {log.ipAddress && <span>IP: {log.ipAddress}</span>}
                            <span>Event: {log._id?.slice(-8).toUpperCase()}</span>
                          </div>
                        </div>
                      </div>

                      <button className="text-xs text-gray-400 hover:text-[#f97316] font-medium">
                        Details →
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Detail Drawer */}
          {selectedLog && (
            <div className="w-[380px] bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col h-fit sticky top-8 animate-in slide-in-from-right-4 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <h3 className="font-bold text-[#1a2642] text-[16px]">Audit Event Details</h3>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-gray-400 block mb-1 font-semibold uppercase">Action</span>
                  <span className="font-bold text-[#1a2642] text-sm">
                    {selectedLog.action?.replace(/_/g, " ")}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 block mb-1 font-semibold uppercase">Description</span>
                  <p className="text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    {selectedLog.details || "No additional metadata recorded"}
                  </p>
                </div>

                <div>
                  <span className="text-gray-400 block mb-1 font-semibold uppercase">Timestamp</span>
                  <span className="text-gray-700 font-medium">
                    {formatDate(selectedLog.createdAt)}
                  </span>
                </div>

                {selectedLog.ipAddress && (
                  <div>
                    <span className="text-gray-400 block mb-1 font-semibold uppercase">Client IP Address</span>
                    <span className="font-mono text-gray-700">{selectedLog.ipAddress}</span>
                  </div>
                )}

                <div>
                  <span className="text-gray-400 block mb-1 font-semibold uppercase">Event Reference</span>
                  <span className="font-mono text-gray-500 break-all">{selectedLog._id}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
