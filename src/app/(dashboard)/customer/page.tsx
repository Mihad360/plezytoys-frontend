"use client";

import { Bell, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CustomerDashboard() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Customer</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Customer Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/customer/notifications" className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
          </Link>
          <Link href="/customer/profile">
            <div className="w-10 h-10 rounded-full bg-[#f97316] hover:bg-[#e06511] cursor-pointer flex items-center justify-center text-white font-bold text-sm transition-colors">
              SA
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto space-y-8 mt-2">

          {/* Greeting & Quick Stats */}
          <div>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Good morning, Sarah</h2>
                <p className="text-gray-500 text-[14px]">Here's your authorised operational overview for today · Friday, 11 September 2026</p>
              </div>
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-[13px] text-gray-700 focus:outline-none focus:border-[#f97316] shadow-sm">
                  <option>All assigned locations</option>
                  <option>Westfield Office</option>
                  <option>North Campus</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="#8e9bb3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-3">ASSIGNED LOCATIONS</p>
                <div className="flex justify-between items-end">
                  <p className="text-[#1a2642] font-bold text-[36px] leading-none">4</p>
                  <ArrowRight size={18} className="text-gray-300" />
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-3">ACTIVE PATROLS</p>
                <div className="flex justify-between items-end">
                  <p className="text-emerald-500 font-bold text-[36px] leading-none">2</p>
                  <ArrowRight size={18} className="text-gray-300" />
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-3">AVAILABLE REPORTS</p>
                <div className="flex justify-between items-end">
                  <p className="text-[#f97316] font-bold text-[36px] leading-none">18</p>
                  <ArrowRight size={18} className="text-gray-300" />
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-3">UNREAD ANNOUNCEMENTS</p>
                <div className="flex justify-between items-end">
                  <p className="text-purple-500 font-bold text-[36px] leading-none">3</p>
                  <ArrowRight size={18} className="text-gray-300" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            
            {/* Left Col: Locations */}
            <div className="col-span-2 space-y-4">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h3 className="text-[#1a2642] font-bold text-[16px]">Your locations</h3>
                  <p className="text-gray-500 text-[13px]">Authorised service locations</p>
                </div>
                <Link href="/customer/locations" className="text-[#f97316] text-[13px] font-semibold hover:underline flex items-center gap-1">
                  View all <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-gray-200 transition-colors">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-[#f97316] shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="text-[#1a2642] font-bold text-[14px]">Westfield Office</h4>
                        <p className="text-gray-400 text-[12px]">Amsterdam · <span className="text-emerald-500 font-medium">Active</span></p>
                      </div>
                    </div>
                    <Link href="/customer/locations" className="text-[#f97316] text-[12px] font-semibold hover:underline flex items-center gap-1">
                      View <ArrowRight size={12} />
                    </Link>
                  </div>
                  <p className="text-gray-400 text-[11px]">2 active patrols</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-gray-200 transition-colors">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-[#f97316] shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="text-[#1a2642] font-bold text-[14px]">North Campus</h4>
                        <p className="text-gray-400 text-[12px]">Utrecht · <span className="text-emerald-500 font-medium">Active</span></p>
                      </div>
                    </div>
                    <Link href="/customer/locations" className="text-[#f97316] text-[12px] font-semibold hover:underline flex items-center gap-1">
                      View <ArrowRight size={12} />
                    </Link>
                  </div>
                  <p className="text-gray-400 text-[11px]">1 scheduled patrol</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-gray-200 transition-colors">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-[#f97316] shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="text-[#1a2642] font-bold text-[14px]">Central Site</h4>
                        <p className="text-gray-400 text-[12px]">Rotterdam · <span className="text-emerald-500 font-medium">Active</span></p>
                      </div>
                    </div>
                    <Link href="/customer/locations" className="text-[#f97316] text-[12px] font-semibold hover:underline flex items-center gap-1">
                      View <ArrowRight size={12} />
                    </Link>
                  </div>
                  <p className="text-gray-400 text-[11px]">Coverage confirmed</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-gray-200 transition-colors">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-[#f97316] shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="text-[#1a2642] font-bold text-[14px]">Harbour House</h4>
                        <p className="text-gray-400 text-[12px]">Amsterdam · <span className="text-emerald-500 font-medium">Active</span></p>
                      </div>
                    </div>
                    <Link href="/customer/locations" className="text-[#f97316] text-[12px] font-semibold hover:underline flex items-center gap-1">
                      View <ArrowRight size={12} />
                    </Link>
                  </div>
                  <p className="text-gray-400 text-[11px]">Next visit 14:30</p>
                </div>
              </div>
            </div>

            {/* Right Col: Announcements */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-[#1a2642] font-bold text-[16px]">Latest announcements</h3>
                  <p className="text-gray-500 text-[13px]">Important updates from your provider</p>
                </div>
                <Link href="/customer/announcements" className="text-[#f97316] text-[13px] font-semibold hover:underline flex items-center gap-1 shrink-0">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="flex-1 overflow-auto p-2">
                <Link href="/customer/announcements" className="block p-4 hover:bg-gray-50 rounded-lg border-b border-gray-50 last:border-0 transition-colors relative group">
                  <div className="absolute left-4 top-5 w-1.5 h-1.5 rounded-full bg-[#f97316]"></div>
                  <div className="pl-4">
                    <h4 className="text-[#1a2642] font-bold text-[13px] mb-1 group-hover:text-[#f97316] transition-colors">Scheduled maintenance notice</h4>
                    <p className="text-gray-500 text-[12px] mb-2 leading-relaxed">Our reporting service will be briefly unavailable on 14 Sep, 22:00-23:00.</p>
                    <p className="text-gray-400 text-[11px]">10 Sep 2026</p>
                  </div>
                  <ArrowRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Link href="/customer/announcements" className="block p-4 hover:bg-gray-50 rounded-lg transition-colors relative group">
                  <div className="absolute left-4 top-5 w-1.5 h-1.5 rounded-full bg-[#f97316]"></div>
                  <div className="pl-4">
                    <h4 className="text-[#1a2642] font-bold text-[13px] mb-1 group-hover:text-[#f97316] transition-colors">Service update</h4>
                    <p className="text-gray-500 text-[12px] mb-2 leading-relaxed">A new patrol-report format is now available in your reports area.</p>
                    <p className="text-gray-400 text-[11px]">08 Sep 2026</p>
                  </div>
                  <ArrowRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </div>

          </div>

          {/* Recent Reports List */}
          <div className="mt-8">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-[#1a2642] font-bold text-[16px]">Recent reports</h3>
                <p className="text-gray-500 text-[13px]">Reports available to your customer account</p>
              </div>
              <Link href="/customer/reports" className="text-[#f97316] text-[13px] font-semibold hover:underline flex items-center gap-1">
                View all reports <ArrowRight size={14} />
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[10px] font-bold tracking-wider uppercase">
                    <th className="py-4 px-6">Report</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Daily Service Report", location: "Westfield Office", date: "10 Sep 2026", status: "Approved", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
                    { name: "Incident Report", location: "North Campus", date: "09 Sep 2026", status: "Approved", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
                    { name: "Patrol Report", location: "Central Site", date: "08 Sep 2026", status: "Available", color: "text-amber-700 bg-amber-50 border-amber-100" }
                  ].map((report, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-orange-50 text-[#f97316] flex items-center justify-center shrink-0">
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M9 1V5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M4 9H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M4 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M4 6H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-[#1a2642] font-medium">{report.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-500">{report.location}</td>
                      <td className="py-4 px-6 text-gray-500">{report.date}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${report.color}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link href="/customer/reports" className="text-[#f97316] text-[12px] font-semibold hover:underline inline-flex items-center gap-1">
                          View <ArrowRight size={12} />
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
