"use client";

import { Bell, Search, RefreshCw, AlertCircle, ChevronDown, CheckCircle2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useGetManagerEmployeesQuery, useGetManagerLocationsQuery } from "@/redux/api/managerApi";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function ManagerEmployeesPage() {
  const [selectedLocationId, setSelectedLocationId] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

  const { data: profileData } = useGetMyProfileQuery(undefined);
  const manager = profileData?.data;

  const { data: locationsData } = useGetManagerLocationsQuery();
  const locations = locationsData?.data || [];

  const {
    data: employeesData,
    isLoading,
    isError,
    refetch,
  } = useGetManagerEmployeesQuery({
    locationId: selectedLocationId === "all" ? undefined : selectedLocationId,
  });

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const employees = employeesData?.data || [];

  const filteredEmployees = employees.filter((emp: any) => {
    const matchesSearch =
      !searchTerm.trim() ||
      (emp.name || `${emp.firstName || ""} ${emp.lastName || ""}`).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.employeeId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.email || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "on_shift" && emp.isOnShift) ||
      (statusFilter === "off_duty" && !emp.isOnShift);

    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Assigned Employees</h1>
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
            title="Refresh Employees"
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
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Workforce Monitoring</h2>
              <p className="text-gray-500 text-[14px]">
                Monitor real-time shift status, location check-ins, and active tasks across your team.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, employee ID, email..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#f97316] shadow-sm"
              >
              </input>
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
                <option value="all">All duty statuses</option>
                <option value="on_shift">On Duty / Shift</option>
                <option value="off_duty">Off Duty</option>
              </select>
            </div>
          </div>

          {isError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to retrieve team members list.</p>
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
                  <th className="py-4 px-6">Employee</th>
                  <th className="py-4 px-6">Assigned Facility</th>
                  <th className="py-4 px-6">Duty Status</th>
                  <th className="py-4 px-6">Current Activity</th>
                  <th className="py-4 px-6">Device / PIN</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400">
                      Loading team members...
                    </td>
                  </tr>
                ) : filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400">
                      No matching employees found in your scope.
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp: any) => {
                    const empName = emp.name || `${emp.firstName || ""} ${emp.lastName || ""}`.trim() || "Employee";
                    const locName = emp.assignedLocation?.name || "Assigned Site";

                    return (
                      <tr key={emp._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#1a2642] text-white flex items-center justify-center font-bold text-xs shrink-0">
                              {empName
                                .split(" ")
                                .map((n: string) => n[0])
                                .slice(0, 2)
                                .join("")
                                .toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-[#1a2642]">{empName}</p>
                              <p className="text-[11px] text-gray-400 font-mono">
                                {emp.employeeId || "EMP-—"} · {emp.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-600">{locName}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              emp.isOnShift
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${emp.isOnShift ? "bg-emerald-500 animate-pulse" : "bg-gray-400"}`}
                            ></span>
                            {emp.isOnShift ? "Clocked In" : "Off Duty"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          {emp.currentTask ? (
                            <span className="text-xs font-medium text-orange-600">
                              Task: {emp.currentTask.title}
                            </span>
                          ) : emp.isOnShift ? (
                            <span className="text-xs text-emerald-600 font-medium">On patrol / active shift</span>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                            {emp.biometricEnabled && <ShieldCheck size={13} className="text-emerald-500" />}
                            {emp.biometricEnabled ? "Biometrics Active" : "PIN Active"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => setSelectedEmployee(emp)}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                          >
                            View
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

      {/* Employee Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-[#1a2642] font-bold text-base">Employee Overview</h3>
              <button onClick={() => setSelectedEmployee(null)} className="text-gray-400 hover:text-gray-600 text-lg">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs text-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1a2642] text-white flex items-center justify-center font-bold text-base">
                  {(selectedEmployee.name || "EM")
                    .split(" ")
                    .map((n: string) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#1a2642]">{selectedEmployee.name}</h4>
                  <p className="text-gray-400 font-mono">{selectedEmployee.employeeId} · {selectedEmployee.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-gray-400 uppercase font-semibold">Location</p>
                  <p className="font-semibold text-[#1a2642] mt-0.5">{selectedEmployee.assignedLocation?.name || "Assigned Facility"}</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase font-semibold">Shift Status</p>
                  <p className="font-semibold text-emerald-600 mt-0.5">{selectedEmployee.isOnShift ? "Currently Clocked In" : "Off Duty"}</p>
                </div>
              </div>
              {selectedEmployee.activeSession && (
                <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 space-y-1">
                  <p className="font-semibold text-emerald-800">Active Shift Session:</p>
                  <p className="text-emerald-700">
                    Clocked in at {new Date(selectedEmployee.activeSession.clockInTime).toLocaleTimeString("en-GB")}
                  </p>
                  <p className="text-[11px] text-emerald-600">
                    GPS verified: {selectedEmployee.activeSession.isVerified ? "Yes" : "Warning - Anomaly"}
                  </p>
                </div>
              )}
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedEmployee(null)}
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
