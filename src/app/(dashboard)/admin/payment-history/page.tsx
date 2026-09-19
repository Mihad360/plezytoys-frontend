"use client";

import Link from "next/link";
import { Bell, ChevronDown } from "lucide-react";
import { useState } from "react";

const INVOICES = [
  {
    id: "INV-24081",
    ref: "pi_3Qs81A72xR",
    company: "ABC Security Services",
    plan: "Professional · Germany",
    period: "01–30 Sep 2026",
    method: "Visa ···· 4242",
    subtotal: "€826.67",
    tax: "€165.33",
    total: "€992.00",
    date: "01 Sep 2026",
    status: "Resolved",
    statusColor: "bg-green-50 text-green-600 border-green-200",
    actions: ["Open", "Download"]
  },
  {
    id: "INV-24080",
    ref: "pi_3Qs7qX7tKh",
    company: "CarePlus Healthcare",
    plan: "Enterprise · United States",
    period: "01–30 Sep 2026",
    method: "SEPA Direct Debit",
    subtotal: "$2,450.00",
    tax: "$490.00",
    total: "$2,940.00",
    date: "01 Sep 2026",
    status: "Resolved",
    statusColor: "bg-green-50 text-green-600 border-green-200",
    actions: ["Open", "Download"]
  },
  {
    id: "INV-24079",
    ref: "pi_3Qs7hB8eYm",
    company: "Greenfield Services",
    plan: "Starter · France",
    period: "01–30 Sep 2026",
    method: "Visa ···· 0184",
    subtotal: "€525.00",
    tax: "€105.00",
    total: "€630.00",
    date: "08 Sep 2026",
    status: "Review",
    statusColor: "bg-orange-50 text-orange-500 border-orange-200",
    actions: ["Open", "Download"]
  },
  {
    id: "INV-24054",
    ref: "pi_3QmnR62LpT",
    company: "Swift Hospitality",
    plan: "Professional · United States",
    period: "01–31 Aug 2026",
    method: "Mastercard ···· 8366",
    subtotal: "$316.67",
    tax: "$63.33",
    total: "$380.00",
    date: "01 Aug 2026",
    status: "Review",
    statusColor: "bg-orange-50 text-orange-500 border-orange-200",
    actions: ["Open", "Download", "Remind", "Retry"]
  }
];

export default function PaymentHistoryPage() {
  const [showRegionalPricing, setShowRegionalPricing] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Payment History</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1400px] mx-auto">
          
          <Link href="/admin/subscription-plans" className="inline-flex items-center text-gray-500 font-medium text-[13px] hover:text-[#1a2642] transition-colors mb-6">
            <span className="mr-2">←</span> Back to subscription plans
          </Link>

          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Payment history</h2>
              <p className="text-gray-500 text-[14px]">Original transaction currency and country-specific tax are retained on every record.</p>
            </div>
            <button 
              onClick={() => setShowRegionalPricing(!showRegionalPricing)}
              className="bg-white border border-gray-200 text-[#1a2642] font-medium text-[14px] px-5 py-2.5 rounded-lg transition-colors hover:bg-gray-50"
            >
              Currency & regional pricing
            </button>
          </div>

          {/* Regional Pricing Expandable Box */}
          {showRegionalPricing && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8 flex items-end gap-6 animate-in slide-in-from-top-4 duration-200">
              <div className="flex-1">
                <p className="text-[#1a2642] font-bold text-[14px] mb-1">Europe</p>
                <p className="text-gray-400 text-[11px] mb-3">EUR (€) · VAT calculated from customer country</p>
                <label className="block text-gray-500 text-[11px] mb-1.5">Professional price</label>
                <input type="text" defaultValue="€4.00 / employee / month" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642] focus:outline-none focus:border-[#f97316]" />
              </div>
              <div className="flex-1">
                <p className="text-[#1a2642] font-bold text-[14px] mb-1">United States</p>
                <p className="text-gray-400 text-[11px] mb-3">USD ($) · Applicable sales tax calculated by customer country/state</p>
                <label className="block text-gray-500 text-[11px] mb-1.5">Professional price</label>
                <input type="text" defaultValue="$4.50 / employee / month" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642] focus:outline-none focus:border-[#f97316]" />
              </div>
              <button className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[13px] px-5 py-2.5 rounded-lg transition-colors">
                Save regional pricing
              </button>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-2">COLLECTED THIS MONTH</p>
              <p className="text-[32px] font-bold text-[#1a2642] mb-1">€78,420</p>
              <p className="text-gray-400 text-[12px]">Europe transaction currency</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-2">COLLECTED THIS MONTH</p>
              <p className="text-[32px] font-bold text-[#1a2642] mb-1">$31,680</p>
              <p className="text-gray-400 text-[12px]">United States transaction currency</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase mb-2">OUTSTANDING</p>
              <p className="text-[32px] font-bold text-[#1a2642] mb-1">€630</p>
              <p className="text-gray-400 text-[12px]">Original transaction total</p>
            </div>
          </div>

          {/* Filters & Table container */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
            
            {/* Filters */}
            <div className="flex items-center justify-between mb-4 px-3 pt-3">
              <input 
                type="text" 
                placeholder="Search invoice or company" 
                className="w-[300px] px-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642] focus:outline-none"
              />
              <div className="flex gap-2 items-center">
                <button className="flex items-center justify-between w-[130px] px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-600 bg-white">
                  Last 30 days <ChevronDown size={14} className="text-gray-400" />
                </button>
                <button className="flex items-center justify-between w-[130px] px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-600 bg-white">
                  All companies <ChevronDown size={14} className="text-gray-400" />
                </button>
                <button className="flex items-center justify-between w-[110px] px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-600 bg-white">
                  All plans <ChevronDown size={14} className="text-gray-400" />
                </button>
                <button className="flex items-center justify-between w-[120px] px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-600 bg-white mr-4">
                  All methods <ChevronDown size={14} className="text-gray-400" />
                </button>
                
                {/* Status Toggle Group */}
                <div className="flex bg-gray-50 rounded-lg p-0.5 border border-gray-200">
                  <button className="px-3 py-1.5 text-[12px] font-medium rounded-md bg-[#1a2642] text-white">All</button>
                  <button className="px-3 py-1.5 text-[12px] font-medium rounded-md text-gray-500 hover:text-[#1a2642]">Paid</button>
                  <button className="px-3 py-1.5 text-[12px] font-medium rounded-md text-gray-500 hover:text-[#1a2642]">Pending</button>
                  <button className="px-3 py-1.5 text-[12px] font-medium rounded-md text-gray-500 hover:text-[#1a2642]">Failed</button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                    <th className="px-6 py-4">Invoice</th>
                    <th className="px-6 py-4">Company / Plan</th>
                    <th className="px-6 py-4">Billing Period</th>
                    <th className="px-6 py-4">Payment Method</th>
                    <th className="px-6 py-4 text-right">Subtotal</th>
                    <th className="px-6 py-4 text-right">VAT / Tax</th>
                    <th className="px-6 py-4 text-right font-bold">Final Total</th>
                    <th className="px-6 py-4">Due Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {INVOICES.map((inv, i) => (
                    <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                      <td className="px-6 py-4">
                        <Link href={`/admin/payment-history/${inv.id}`} className="font-semibold text-[#1a2642] hover:underline">
                          {inv.id}
                        </Link>
                        <p className="text-gray-400 text-[11px] font-mono mt-0.5">{inv.ref}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#1a2642]">{inv.company}</p>
                        <p className="text-gray-400 text-[12px]">{inv.plan}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{inv.period}</td>
                      <td className="px-6 py-4 text-gray-500">{inv.method}</td>
                      <td className="px-6 py-4 text-right text-[#1a2642] font-medium">{inv.subtotal}</td>
                      <td className="px-6 py-4 text-right text-[#1a2642] font-medium">{inv.tax}</td>
                      <td className="px-6 py-4 text-right text-[#1a2642] font-bold">{inv.total}</td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{inv.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${inv.statusColor}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex flex-col items-end gap-1">
                          {inv.actions.map(action => (
                            <button key={action} className="text-[#f97316] font-medium text-[12px] hover:underline leading-none">
                              {action}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
