"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

const STATS = [
  { label: "TOTAL COMPANIES", value: "128", colSpan: 1 },
  { label: "ACTIVE", value: "116", colSpan: 1, color: "text-[#f97316]" },
  { label: "TRIAL", value: "8", colSpan: 1 },
  { label: "SUSPENDED", value: "4", colSpan: 1 },
];

const STATS_ROW_2 = [
  { label: "ACTIVE EMPLOYEES", value: "8,642" },
  { label: "ACTIVE LOCATIONS", value: "2,184" },
  { label: "ACTIVE MODULES", value: "486", color: "text-[#f97316]" },
];

const COMPANIES = [
  { name: "ABC Security Services", sector: "Security", employees: 248, plan: "Professional", status: "Active", statusColor: "bg-green-50 text-green-600 border-green-200" },
  { name: "Greenfield Services", sector: "Cleaning", employees: 126, plan: "Starter", status: "Trial", statusColor: "bg-blue-50 text-blue-600 border-blue-200" },
  { name: "CarePlus Healthcare", sector: "Healthcare", employees: 184, plan: "Enterprise", status: "Active", statusColor: "bg-green-50 text-green-600 border-green-200" },
  { name: "Metro Facilities", sector: "Facility Services", employees: 312, plan: "Enterprise", status: "Active", statusColor: "bg-green-50 text-green-600 border-green-200" },
  { name: "Swift Hospitality", sector: "Hospitality", employees: 95, plan: "Professional", status: "Suspended", statusColor: "bg-red-50 text-red-600 border-red-200" },
  { name: "ProGuard Security", sector: "Security", employees: 167, plan: "Professional", status: "Active", statusColor: "bg-green-50 text-green-600 border-green-200" },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Dashboard</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="mb-6">
            <h2 className="text-[#1a2642] text-[22px] font-bold mb-1">Platform Overview</h2>
            <p className="text-gray-500 text-[14px]">Real-time metrics across all tenant companies</p>
          </div>

          {/* Stats Grid 1 */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {STATS.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                  {stat.label}
                </p>
                <p className={`text-[32px] font-bold ${stat.color || "text-[#1a2642]"}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Grid 2 */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {STATS_ROW_2.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                  {stat.label}
                </p>
                <p className={`text-[32px] font-bold ${stat.color || "text-[#1a2642]"}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Table Area */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-[#1a2642] font-semibold">Company Activity</h3>
              <Link href="/admin/companies" className="text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50 transition-colors">
                View All Companies →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px]">
                <thead>
                  <tr className="bg-[#fcfdfd] border-b border-gray-100 text-gray-400 text-[11px] uppercase tracking-wider font-semibold">
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Sector</th>
                    <th className="px-6 py-4">Employees</th>
                    <th className="px-6 py-4">Plan</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {COMPANIES.map((company, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                      <td className="px-6 py-4 font-medium text-[#1a2642]">
                        {company.name}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {company.sector}
                      </td>
                      <td className="px-6 py-4 font-semibold text-[#1a2642]">
                        {company.employees}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {company.plan}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium border ${company.statusColor}`}>
                          {company.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin/companies/${i}`} className="text-[#f97316] font-medium text-[13px] hover:underline">
                          View
                        </Link>
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
