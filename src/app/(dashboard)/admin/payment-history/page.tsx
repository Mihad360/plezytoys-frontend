"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, RefreshCw, AlertCircle } from "lucide-react";
import { useGetPaymentsQuery } from "@/redux/api/superAdminApi";

export default function PaymentHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showRegionalPricing, setShowRegionalPricing] = useState(false);

  const { data: response, isLoading, isError, refetch } = useGetPaymentsQuery(undefined);
  const payments: any[] = response?.data || [];

  // Filter payments
  const filteredPayments = payments.filter((item) => {
    const invId = (item.invoiceId || "").toLowerCase();
    const compName = (
      typeof item.company === "object" ? item.company?.name || "" : ""
    ).toLowerCase();
    const matchesSearch =
      invId.includes(searchTerm.toLowerCase()) || compName.includes(searchTerm.toLowerCase());

    const status = (item.status || "pending").toLowerCase();
    const matchesStatus =
      selectedStatus === "all" || status === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Calculate live statistics
  const totalCollectedEur = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const totalOutstandingEur = payments
    .filter((p) => p.status === "pending" || p.status === "overdue")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const totalPaidCount = payments.filter((p) => p.status === "paid").length;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
      case "resolved":
        return {
          label: "Paid",
          className: "bg-green-50 text-green-600 border-green-200",
        };
      case "pending":
        return {
          label: "Pending",
          className: "bg-yellow-50 text-yellow-600 border-yellow-200",
        };
      case "overdue":
        return {
          label: "Overdue",
          className: "bg-red-50 text-red-600 border-red-200",
        };
      case "failed":
        return {
          label: "Failed",
          className: "bg-red-50 text-red-600 border-red-200",
        };
      default:
        return {
          label: status || "Review",
          className: "bg-orange-50 text-orange-500 border-orange-200",
        };
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Payment History</h1>
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
        <div className="max-w-[1400px] mx-auto">
          <Link
            href="/admin/subscription-plans"
            className="inline-flex items-center text-gray-500 font-medium text-[13px] hover:text-[#1a2642] transition-colors mb-6"
          >
            <span className="mr-2">←</span> Back to subscription plans
          </Link>

          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Payment History</h2>
              <p className="text-gray-500 text-[14px]">
                Global transactions, invoices, and billing reconciliation records.
              </p>
            </div>
            <button
              onClick={() => setShowRegionalPricing(!showRegionalPricing)}
              className="bg-white border border-gray-200 text-[#1a2642] font-medium text-[14px] px-5 py-2.5 rounded-lg transition-colors hover:bg-gray-50 shadow-sm"
            >
              Currency & Regional Pricing
            </button>
          </div>

          {/* Regional Pricing Expandable Box */}
          {showRegionalPricing && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8 flex items-end gap-6 animate-in slide-in-from-top-4 duration-200">
              <div className="flex-1">
                <p className="text-[#1a2642] font-bold text-[14px] mb-1">Europe Zone</p>
                <p className="text-gray-400 text-[11px] mb-3">EUR (€) · Direct SEPA & Stripe checkout</p>
                <label className="block text-gray-500 text-[11px] mb-1.5">Standard Currency Rate</label>
                <input
                  type="text"
                  readOnly
                  value="EUR (€) - Primary billing"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-[#1a2642]"
                />
              </div>
              <div className="flex-1">
                <p className="text-[#1a2642] font-bold text-[14px] mb-1">Global Zone</p>
                <p className="text-gray-400 text-[11px] mb-3">USD ($) / International conversion</p>
                <label className="block text-gray-500 text-[11px] mb-1.5">Foreign Billing Code</label>
                <input
                  type="text"
                  readOnly
                  value="USD ($) - Secondary currency"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-[#1a2642]"
                />
              </div>
            </div>
          )}

          {/* Error Banner */}
          {isError && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
              <AlertCircle size={20} />
              <div className="flex-1">
                <p className="font-semibold text-sm">Failed to load payment history</p>
                <p className="text-xs text-red-600">Please verify connection or retry.</p>
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
          <div className="grid grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-2">
                TOTAL COLLECTED
              </p>
              <p className="text-[32px] font-bold text-[#1a2642] mb-1">€{totalCollectedEur.toFixed(2)}</p>
              <p className="text-gray-400 text-[12px]">{totalPaidCount} successful payments</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-2">
                PENDING / OUTSTANDING
              </p>
              <p className="text-[32px] font-bold text-[#f97316] mb-1">€{totalOutstandingEur.toFixed(2)}</p>
              <p className="text-gray-400 text-[12px]">Awaiting settlement</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-2">
                TRANSACTION RECORDS
              </p>
              <p className="text-[32px] font-bold text-[#1a2642] mb-1">{payments.length}</p>
              <p className="text-gray-400 text-[12px]">All-time invoices in system</p>
            </div>
          </div>

          {/* Filters & Table container */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="relative flex-1 min-w-[260px] max-w-[400px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoice ID or company name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642] focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div className="flex items-center gap-3">
                {/* Status Toggle Group */}
                <div className="flex bg-gray-50 rounded-lg p-0.5 border border-gray-200">
                  {["all", "paid", "pending", "failed"].map((st) => (
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

            {/* Table */}
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-12 text-center text-gray-500">Loading payment records...</div>
              ) : filteredPayments.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No payment records found</div>
              ) : (
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="bg-[#fcfdfd] border-b border-gray-100 text-gray-400 text-[11px] uppercase tracking-wider font-semibold">
                      <th className="px-5 py-3.5">Invoice</th>
                      <th className="px-5 py-3.5">Company</th>
                      <th className="px-5 py-3.5">Plan</th>
                      <th className="px-5 py-3.5">Date</th>
                      <th className="px-5 py-3.5">Amount</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((p) => {
                      const badge = getStatusBadge(p.status);
                      const compName =
                        typeof p.company === "object"
                          ? p.company?.name || "Company"
                          : "Company";
                      const planName =
                        typeof p.subscriptionPlan === "object"
                          ? p.subscriptionPlan?.name || "Standard"
                          : "Standard";

                      return (
                        <tr
                          key={p._id}
                          className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0"
                        >
                          <td className="px-5 py-4 font-mono font-semibold text-[#1a2642]">
                            {p.invoiceId || `INV-${p._id?.slice(-6).toUpperCase()}`}
                          </td>
                          <td className="px-5 py-4 font-medium text-[#1a2642]">{compName}</td>
                          <td className="px-5 py-4 text-gray-500">{planName}</td>
                          <td className="px-5 py-4 text-gray-500">
                            {formatDate(p.paidAt || p.createdAt)}
                          </td>
                          <td className="px-5 py-4 font-bold text-[#1a2642]">
                            €{(p.amount || 0).toFixed(2)}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${badge.className}`}
                            >
                              {badge.label}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <Link
                              href={`/admin/payment-history/${p._id}`}
                              className="text-[#f97316] font-medium text-[12px] hover:underline"
                            >
                              View Invoice →
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
