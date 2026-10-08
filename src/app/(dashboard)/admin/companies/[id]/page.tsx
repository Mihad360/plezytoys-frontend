"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Bell, Check, Circle, AlertCircle, RefreshCw, Edit, Trash2, X } from "lucide-react";
import {
  useGetCompanyByIdQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} from "@/redux/api/companyApi";
import { toast } from "sonner";

export default function CompanyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";

  const { data: response, isLoading, isError, refetch } = useGetCompanyByIdQuery(id, {
    skip: !id,
  });
  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();
  const [deleteCompany, { isLoading: isDeleting }] = useDeleteCompanyMutation();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    contactEmail: "",
    phone: "",
    sector: "security",
    subscriptionStatus: "active",
  });

  const company = response?.data;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const planName =
    typeof company?.subscriptionPlan === "object"
      ? company?.subscriptionPlan?.name
      : company?.plan || "Professional";

  const status = (company?.subscriptionStatus || (company?.isActive ? "active" : "inactive")).toLowerCase();
  const isCompanyActive = status === "active" || company?.isActive;

  const employeeCount = company?.counts?.employeeCount ?? 0;
  const customerCount = company?.counts?.customerCount ?? 0;
  const locationCount = company?.counts?.locationCount ?? 0;

  const maxEmployees = company?.limits?.maxEmployees ? String(company.limits.maxEmployees) : "Unlimited";

  const coreModulesList = [
    { key: "workforce", label: "Workforce" },
    { key: "employees", label: "Employees" },
    { key: "customers", label: "Customers" },
    { key: "locations", label: "Locations" },
    { key: "tasks", label: "Tasks" },
    { key: "checklists", label: "Checklists" },
    { key: "reports", label: "Reports" },
    { key: "timeTracking", label: "Time Tracking & Attendance" },
    { key: "patrols", label: "Patrols & Rounds" },
    { key: "incidentReports", label: "Incident Reporting" },
  ];

  const optionalModulesList = [
    { key: "nfcCheckpoints", label: "NFC Checkpoints" },
    { key: "gpsVerification", label: "GPS Verification" },
    { key: "documents", label: "Documents" },
    { key: "communication", label: "Communication / Chat" },
    { key: "aiAssistant", label: "AI Assistant" },
    { key: "clientPortal", label: "Customer Portal" },
  ];

  const openEditModal = () => {
    if (!company) return;
    setEditForm({
      name: company.name || company.companyName || "",
      contactEmail: company.contactEmail || company.businessEmail || "",
      phone: company.phone || "",
      sector: company.sector || "security",
      subscriptionStatus: company.subscriptionStatus || "active",
    });
    setIsEditOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await updateCompany({
        id,
        data: {
          name: editForm.name,
          companyName: editForm.name,
          contactEmail: editForm.contactEmail,
          businessEmail: editForm.contactEmail,
          phone: editForm.phone,
          sector: editForm.sector,
          subscriptionStatus: editForm.subscriptionStatus,
        },
      }).unwrap();
      toast.success(res?.message || "Company updated successfully");
      setIsEditOpen(false);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to update company");
    }
  };

  const handleDeleteCompany = async () => {
    if (!window.confirm("Are you sure you want to deactivate this company? Its status will be marked as cancelled.")) {
      return;
    }
    try {
      const res: any = await deleteCompany(id).unwrap();
      toast.success(res?.message || "Company deactivated successfully");
      router.push("/admin/companies");
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to deactivate company");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Company Detail</h1>
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
          <Link
            href="/admin/companies"
            className="inline-flex items-center text-gray-500 font-medium text-[13px] hover:text-[#1a2642] transition-colors mb-6"
          >
            <span className="mr-2">←</span> Back to Companies
          </Link>

          {isLoading ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
              <RefreshCw className="animate-spin text-[#f97316] mx-auto mb-3" size={28} />
              <p className="text-gray-500 font-medium">Loading company details...</p>
            </div>
          ) : isError || !company ? (
            <div className="bg-white rounded-xl border border-red-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 text-red-600 mb-2">
                <AlertCircle size={22} />
                <h3 className="text-lg font-bold">Company Not Found</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Unable to load the company with ID: {id}
              </p>
              <Link
                href="/admin/companies"
                className="inline-block px-4 py-2 bg-[#1a2642] text-white rounded-lg text-sm font-medium"
              >
                Return to Companies
              </Link>
            </div>
          ) : (
            <>
              {/* Title Row */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-[#1a2642] text-[24px] font-bold">
                      {company.name || company.companyName}
                    </h2>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium border ${
                        isCompanyActive
                          ? "bg-green-50 text-green-600 border-green-200"
                          : "bg-red-50 text-red-600 border-red-200"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-500 text-[14px] capitalize">
                    {company.sector ? company.sector.replace("_", " ") : "General Business"} ·{" "}
                    {planName} Plan · Since {formatDate(company.createdAt || company.joinedAt)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Contact: {company.contactEmail || company.businessEmail || "None"} |{" "}
                    Phone: {company.phone || "None"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={openEditModal}
                    className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-[14px] px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Edit size={16} /> Edit Company
                  </button>
                  <Link
                    href={`/admin/companies/${company._id}/modules`}
                    className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-5 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    Manage Modules
                  </Link>
                  <button
                    onClick={handleDeleteCompany}
                    disabled={isDeleting}
                    className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-medium text-[14px] px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 size={16} />
                    {isDeleting ? "Deactivating..." : "Deactivate"}
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-5 mb-8">
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                    EMPLOYEES
                  </p>
                  <p className="text-[32px] font-bold text-[#1a2642]">{employeeCount}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                    CUSTOMERS (CLIENTS)
                  </p>
                  <p className="text-[32px] font-bold text-[#1a2642]">{customerCount}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                    LOCATIONS
                  </p>
                  <p className="text-[32px] font-bold text-[#1a2642]">{locationCount}</p>
                </div>
              </div>

              {/* Bottom Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Subscription Box */}
                <div className="lg:col-span-5 bg-white rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col">
                  <h3 className="text-[#1a2642] font-bold text-[16px] mb-8">Subscription Details</h3>

                  <div className="space-y-6 mb-10 text-[14px] flex-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Plan</span>
                      <span className="font-bold text-[#1a2642]">{planName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Account Type</span>
                      <span className="font-bold text-[#1a2642] capitalize">
                        {company.accountType || "Standard"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Billing Status</span>
                      <span className="font-bold text-[#1a2642] capitalize">{status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Since</span>
                      <span className="font-bold text-[#1a2642]">
                        {formatDate(company.createdAt || company.joinedAt)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Employees Limit</span>
                      <span className="font-bold text-[#1a2642]">{maxEmployees}</span>
                    </div>
                  </div>

                  <div className="text-center pt-4 border-t border-gray-100">
                    <Link
                      href="/admin/subscription-plans"
                      className="text-[#f97316] font-semibold text-[14px] hover:underline"
                    >
                      View All Plans →
                    </Link>
                  </div>
                </div>

                {/* Assigned Modules Box */}
                <div className="lg:col-span-7 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[#1a2642] font-bold text-[16px]">Assigned Modules</h3>
                    <Link
                      href={`/admin/companies/${company._id}/modules`}
                      className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium text-[13px] px-4 py-1.5 rounded-lg transition-colors"
                    >
                      Configure Modules
                    </Link>
                  </div>

                  {/* CORE */}
                  <div className="mb-8">
                    <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-4">
                      CORE MODULES
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {coreModulesList.map((mod) => {
                        const isEnabled = company.enabledModules
                          ? company.enabledModules[mod.key] !== false
                          : true;
                        return (
                          <div
                            key={mod.key}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium border ${
                              isEnabled
                                ? "bg-green-50 border-green-200 text-green-700"
                                : "bg-gray-50 border-gray-200 text-gray-400"
                            }`}
                          >
                            {isEnabled ? (
                              <Check size={14} className="text-green-600" />
                            ) : (
                              <Circle size={14} />
                            )}
                            {mod.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* OPTIONAL */}
                  <div>
                    <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-4">
                      ADD-ON / OPTIONAL MODULES
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {optionalModulesList.map((mod) => {
                        const isEnabled = company.enabledModules
                          ? Boolean(company.enabledModules[mod.key])
                          : false;
                        return (
                          <div
                            key={mod.key}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium border ${
                              isEnabled
                                ? "bg-green-50 border-green-200 text-green-700"
                                : "bg-gray-50 border-gray-200 text-gray-400"
                            }`}
                          >
                            {isEnabled ? (
                              <Check size={14} className="text-green-600" />
                            ) : (
                              <Circle size={14} />
                            )}
                            {mod.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Edit Company Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[500px] overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-[#1a2642] text-lg">Edit Company</h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Login & Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={editForm.contactEmail}
                  onChange={(e) => setEditForm({ ...editForm, contactEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Sector
                  </label>
                  <select
                    value={editForm.sector}
                    onChange={(e) => setEditForm({ ...editForm, sector: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#f97316] capitalize"
                  >
                    <option value="security">Security</option>
                    <option value="facility_management">Facility Management</option>
                    <option value="logistics">Logistics</option>
                    <option value="retail">Retail</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="healthcare">Healthcare</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select
                    value={editForm.subscriptionStatus}
                    onChange={(e) => setEditForm({ ...editForm, subscriptionStatus: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#f97316] capitalize"
                  >
                    <option value="active">Active</option>
                    <option value="trial">Trial</option>
                    <option value="suspended">Suspended</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end items-center gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 bg-[#f97316] hover:bg-[#e06511] disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
