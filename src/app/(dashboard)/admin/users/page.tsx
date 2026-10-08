"use client";

import { useState } from "react";
import { Bell, Search, RefreshCw, AlertCircle, Shield, UserCheck, UserX } from "lucide-react";
import {
  useGetPlatformUsersQuery,
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation,
} from "@/redux/api/superAdminApi";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const { data: response, isLoading, isError, refetch } = useGetPlatformUsersQuery({
    role: selectedRole !== "all" ? selectedRole : undefined,
    status: selectedStatus !== "all" ? selectedStatus : undefined,
  });

  const [updateUserStatus, { isLoading: isUpdatingStatus }] = useUpdateUserStatusMutation();
  const [updateUserRole, { isLoading: isUpdatingRole }] = useUpdateUserRoleMutation();

  const users: any[] = response?.data?.users || response?.data || [];

  const filteredUsers = users.filter((u) => {
    const query = searchTerm.toLowerCase();
    const name = `${u.firstName || ""} ${u.lastName || ""} ${u.name || ""}`.toLowerCase();
    const email = (u.email || "").toLowerCase();
    const phone = (u.phone || "").toLowerCase();
    return name.includes(query) || email.includes(query) || phone.includes(query);
  });

  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateUserStatus({ id: userId, status: newStatus }).unwrap();
      toast.success(`User marked as ${newStatus}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update user status");
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return { label: "Super Admin", className: "bg-purple-50 text-purple-700 border-purple-200" };
      case "company_admin":
        return { label: "Company Admin", className: "bg-blue-50 text-blue-700 border-blue-200" };
      case "manager":
        return { label: "Manager", className: "bg-indigo-50 text-indigo-700 border-indigo-200" };
      case "employee":
        return { label: "Guard / Employee", className: "bg-gray-50 text-gray-700 border-gray-200" };
      default:
        return { label: role, className: "bg-gray-50 text-gray-600 border-gray-200" };
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Platform Users</h1>
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
        <div className="max-w-[1300px] mx-auto">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">User Directory</h2>
              <p className="text-gray-500 text-[14px]">
                Global user accounts, role entitlements, and access statuses.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-white border border-gray-200 text-[#1a2642] font-semibold text-xs rounded-lg shadow-sm">
                Total Users: {users.length}
              </span>
            </div>
          </div>

          {/* Error Banner */}
          {isError && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
              <AlertCircle size={20} />
              <div className="flex-1">
                <p className="font-semibold text-sm">Failed to load platform users</p>
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
              <div className="relative flex-1 min-w-[260px] max-w-[420px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search user by name, email, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642] focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Role Filter */}
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642] focus:outline-none"
                >
                  <option value="all">All Roles</option>
                  <option value="super_admin">Super Admin</option>
                  <option value="company_admin">Company Admin</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Guard / Employee</option>
                </select>

                {/* Status Filter */}
                <div className="flex bg-gray-50 rounded-lg p-0.5 border border-gray-200">
                  {["all", "active", "inactive"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStatus(st)}
                      className={`px-3 py-1.5 text-[12px] font-medium rounded-md capitalize transition-colors ${
                        selectedStatus === st
                          ? "bg-[#1a2642] text-white"
                          : "text-gray-500 hover:text-[#1a2642]"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-12 text-center text-gray-500">Loading user directory...</div>
              ) : filteredUsers.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No users found</div>
              ) : (
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="bg-[#fcfdfd] border-b border-gray-100 text-gray-400 text-[11px] uppercase tracking-wider font-semibold">
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Company</th>
                      <th className="px-6 py-4">Phone</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => {
                      const roleBadge = getRoleBadge(u.role);
                      const displayName =
                        u.name || `${u.firstName || ""} ${u.lastName || ""}`.trim() || "User";
                      const companyName =
                        typeof u.company === "object" ? u.company?.name : "Global Platform";
                      const isActive = u.status === "active" || u.isActive;

                      return (
                        <tr
                          key={u._id}
                          className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0"
                        >
                          <td className="px-6 py-4 font-medium text-[#1a2642]">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-orange-100 text-[#f97316] font-bold text-xs flex items-center justify-center shrink-0">
                                {displayName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-semibold text-[#1a2642]">{displayName}</p>
                                <p className="text-xs text-gray-400">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {u.role === "super_admin" ? (
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${roleBadge.className}`}
                              >
                                {roleBadge.label}
                              </span>
                            ) : (
                              <select
                                value={u.role}
                                disabled={isUpdatingRole}
                                onChange={async (e) => {
                                  try {
                                    await updateUserRole({ id: u._id, role: e.target.value }).unwrap();
                                    toast.success(`Role updated to ${e.target.value}`);
                                  } catch (err: any) {
                                    toast.error(err?.data?.message || "Failed to update user role");
                                  }
                                }}
                                className="text-xs bg-white border border-gray-200 rounded-md px-2 py-1 text-gray-700 font-medium focus:outline-none focus:border-[#f97316] cursor-pointer"
                              >
                                <option value="company_admin">Company Admin</option>
                                <option value="manager">Manager</option>
                                <option value="employee">Guard / Employee</option>
                              </select>
                            )}
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {companyName || "—"}
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {u.phone || "—"}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                                isActive
                                  ? "bg-green-50 text-green-600 border-green-200"
                                  : "bg-gray-100 text-gray-500 border-gray-200"
                              }`}
                            >
                              {isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {u.role !== "super_admin" && (
                              <button
                                disabled={isUpdatingStatus}
                                onClick={() => handleStatusToggle(u._id, isActive ? "active" : "inactive")}
                                className={`text-xs font-semibold px-3 py-1 rounded-md transition-colors ${
                                  isActive
                                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                                    : "bg-green-50 text-green-600 hover:bg-green-100"
                                }`}
                              >
                                {isActive ? "Deactivate" : "Activate"}
                              </button>
                            )}
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
