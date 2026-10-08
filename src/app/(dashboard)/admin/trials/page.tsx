"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, RefreshCw, AlertCircle, X, Check } from "lucide-react";
import { useGetTrialsAndPilotsQuery, useActivatePilotMutation } from "@/redux/api/superAdminApi";
import { useGetAllCompaniesQuery } from "@/redux/api/companyApi";
import { toast } from "sonner";

export default function TrialsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [durationDays, setDurationDays] = useState(30);

  const { data: response, isLoading, isError, refetch } = useGetTrialsAndPilotsQuery(undefined);
  const { data: companiesResponse } = useGetAllCompaniesQuery(undefined);
  const [activatePilot, { isLoading: isActivating }] = useActivatePilotMutation();

  const trialsData = response?.data;
  const companies: any[] = trialsData?.companies || [];
  const allCompanies: any[] = companiesResponse?.data || [];

  const filteredCompanies = companies.filter((c) => {
    const name = (c.name || c.companyName || "").toLowerCase();
    const type = (c.accountType || "").toLowerCase();
    return (
      name.includes(searchTerm.toLowerCase()) || type.includes(searchTerm.toLowerCase())
    );
  });

  const handleActivatePilot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompanyId) {
      toast.error("Please select a company");
      return;
    }

    try {
      await activatePilot({
        companyId: selectedCompanyId,
        pilotDuration: `${durationDays} days`,
      }).unwrap();
      toast.success("Pilot activated successfully!");
      setIsModalOpen(false);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to activate pilot");
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Pilot & Trial Management</h1>
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
              <h2 className="text-[#1a2642] text-[22px] font-bold mb-1">Trials & Pilots</h2>
              <p className="text-gray-500 text-[14px]">
                Manage self-service trials and manually activated pilot companies.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="text-lg leading-none mb-0.5">+</span> Activate Pilot
            </button>
          </div>

          {/* Error Banner */}
          {isError && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
              <AlertCircle size={20} />
              <div className="flex-1">
                <p className="font-semibold text-sm">Failed to load trials data</p>
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

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                ACTIVE TRIALS
              </p>
              <p className="text-[32px] font-bold text-[#1a2642] mb-1">
                {trialsData?.activeTrials ?? 0}
              </p>
              <p className="text-gray-400 text-[12px]">Self-service trial accounts</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                ACTIVE PILOTS
              </p>
              <p className="text-[32px] font-bold text-[#f97316] mb-1">
                {trialsData?.activePilots ?? 0}
              </p>
              <p className="text-gray-400 text-[12px]">Manually granted pilots</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                CONVERSION RATE
              </p>
              <p className="text-[32px] font-bold text-[#1a2642] mb-1">
                {trialsData?.conversionRate ?? "0%"}
              </p>
              <p className="text-gray-400 text-[12px]">Trial/pilot accounts converted</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                EXPIRING SOON
              </p>
              <p className="text-[32px] font-bold text-red-600 mb-1">
                {trialsData?.expiringSoon ?? 0}
              </p>
              <p className="text-gray-400 text-[12px]">Reaching expiry in 7 days</p>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between mb-6 shadow-sm">
            <div className="flex items-center text-gray-400 px-2 w-full max-w-[400px]">
              <Search size={18} className="mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Search trial or pilot company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-[#1a2642] text-[14px] w-full"
              />
            </div>
            <span className="text-xs text-gray-400 font-medium px-3">
              {filteredCompanies.length} records found
            </span>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-12 text-center text-gray-500">Loading trial records...</div>
              ) : filteredCompanies.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <p className="font-semibold text-gray-600 mb-1">No active trials or pilots</p>
                  <p className="text-xs text-gray-400">
                    Use "+ Activate Pilot" above to start a trial program for any registered company.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="bg-[#fcfdfd] border-b border-gray-100 text-gray-400 text-[11px] uppercase tracking-wider font-semibold">
                      <th className="px-6 py-4">Company</th>
                      <th className="px-6 py-4">Account Type</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Expiry Date</th>
                      <th className="px-6 py-4">Remaining</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompanies.map((c) => {
                      const isPilot = c.accountType === "pilot";
                      const remainingDays = c.remainingDays ?? 0;
                      const isExpiring = remainingDays <= 7;

                      return (
                        <tr
                          key={c._id}
                          className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0"
                        >
                          <td className="px-6 py-4 font-medium text-[#1a2642]">
                            <div>
                              <p className="font-semibold">{c.name || c.companyName}</p>
                              <p className="text-xs text-gray-400">{c.contactEmail}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                                isPilot
                                  ? "bg-orange-50 text-orange-600 border-orange-200"
                                  : "bg-blue-50 text-blue-600 border-blue-200"
                              }`}
                            >
                              {isPilot ? "Pilot" : "Trial"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border bg-green-50 text-green-600 border-green-200">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {formatDate(c.trialEndsAt)}
                          </td>
                          <td className="px-6 py-4 font-bold">
                            <span className={isExpiring ? "text-red-600" : "text-[#1a2642]"}>
                              {c.remainingFormatted || `${remainingDays} days`}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/admin/companies/${c._id}`}
                              className="text-[#f97316] font-medium text-[12px] hover:underline"
                            >
                              Manage Account →
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

      {/* Modal: Activate Pilot */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-[500px] w-full p-6 shadow-xl animate-in fade-in-50 duration-200">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#1a2642]">Activate Pilot Program</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleActivatePilot} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Select Tenant Company
                </label>
                <select
                  value={selectedCompanyId}
                  onChange={(e) => setSelectedCompanyId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-[#1a2642] focus:outline-none focus:border-[#f97316]"
                >
                  <option value="">-- Choose a company --</option>
                  {allCompanies.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name || c.companyName} ({c.contactEmail})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Pilot Duration (Days)
                </label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-[#1a2642] focus:outline-none focus:border-[#f97316]"
                >
                  <option value={14}>14 Days (Standard Evaluation)</option>
                  <option value={30}>30 Days (Full Month Pilot)</option>
                  <option value={60}>60 Days (Extended Enterprise Trial)</option>
                  <option value={90}>90 Days (Quarterly Pilot)</option>
                </select>
              </div>

              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-800">
                Activating this pilot unlocks all core & optional platform features and sends a confirmation notification to the company administrator.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isActivating}
                  className="px-5 py-2 bg-[#f97316] text-white text-sm font-semibold rounded-lg hover:bg-[#e06511] transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isActivating && <RefreshCw size={14} className="animate-spin" />}
                  Confirm Activation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
