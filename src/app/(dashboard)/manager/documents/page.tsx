"use client";

import { Bell, X } from "lucide-react";
import { useState } from "react";

export default function ManagerDocumentsPage() {
  const [activeModal, setActiveModal] = useState<"none" | "view-document">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Documents & Certificates</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 bg-orange-50 border border-orange-100 text-[#d97706] rounded-full text-[13px] font-medium">
            Location scope: All
          </div>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#b45f06] flex items-center justify-center text-white font-bold text-sm">
            SA
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto space-y-4">
          
          <div className="bg-white rounded-xl border border-gray-100 p-6 flex justify-between items-center shadow-sm">
            <div>
              <h3 className="text-[#1a2642] font-bold text-[16px]">Security Certificate</h3>
              <p className="text-gray-500 text-[13px] mt-0.5">John Doe · Expires 2027-03-15</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[12px] font-medium border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Valid
              </span>
              <button onClick={() => setActiveModal("view-document")} className="px-5 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
                View
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 flex justify-between items-center shadow-sm">
            <div>
              <h3 className="text-[#1a2642] font-bold text-[16px]">First Aid Level 3</h3>
              <p className="text-gray-500 text-[13px] mt-0.5">Sarah Smith · Expires 2026-06-01</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-[12px] font-medium border border-red-100">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                Expired
              </span>
              <button className="px-5 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
                View
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* MODALS */}
      {activeModal === "view-document" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[800px] animate-in fade-in zoom-in-95 duration-200 my-8">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-[#1a2642] text-[20px] font-bold">Document Details</h3>
              <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <div className="p-8 flex gap-8">
              
              {/* Document Preview (Left) */}
              <div className="flex-1 bg-gray-50 rounded-xl p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-y-1/2 -translate-x-1/3"></div>
                
                <div className="bg-white p-8 w-[400px] h-[300px] shadow-sm relative z-10 border border-gray-100 flex flex-col justify-between">
                  {/* Decorative orange top border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#f97316]"></div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-[#1a2642] font-bold text-[12px] tracking-widest uppercase">SHIFTPOINT</h4>
                      <p className="text-gray-400 text-[8px] uppercase tracking-wider mt-0.5">WORKFORCE CREDENTIALS</p>
                    </div>
                    <span className="text-[#f97316] text-[10px] font-bold tracking-widest">VERIFIED</span>
                  </div>

                  <div className="text-center my-6">
                    <p className="text-gray-400 text-[9px] font-bold tracking-[0.2em] uppercase mb-3">CERTIFICATE OF COMPLETION</p>
                    <h3 className="text-[#1a2642] text-[22px] font-serif mb-4">Security Certificate</h3>
                    <p className="text-gray-500 text-[11px] mb-2">This certifies that</p>
                    <p className="text-[#1a2642] text-[18px] font-bold mb-4">John Doe</p>
                    <p className="text-gray-500 text-[10px] leading-relaxed max-w-[250px] mx-auto">
                      has completed the required security operations and incident response training.
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-400 text-[8px] font-bold tracking-wider uppercase mb-1">ISSUED</p>
                      <p className="text-[#1a2642] text-[10px] font-bold">15 Mar 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-[8px] font-bold tracking-wider uppercase mb-1">CERTIFICATE ID</p>
                      <p className="text-[#1a2642] text-[10px] font-bold">SP-SEC-1042</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Meta (Right) */}
              <div className="w-[280px] shrink-0 space-y-4">
                
                <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-lg">
                  <p className="text-emerald-700 text-[10px] font-bold tracking-wide uppercase flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> DOCUMENT VALID
                  </p>
                  <p className="text-emerald-800 font-bold text-[16px]">Expires 15 Mar 2027</p>
                  <p className="text-emerald-600 text-[12px] mt-1">721 days remaining</p>
                </div>

                <div className="border border-gray-100 rounded-lg p-5 bg-white shadow-sm space-y-4">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">DOCUMENT DETAILS</p>
                  
                  <div>
                    <p className="text-gray-400 text-[11px]">Holder</p>
                    <p className="text-[#1a2642] font-bold text-[14px]">John Doe</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[11px]">Category</p>
                    <p className="text-[#1a2642] font-bold text-[14px]">Training credential</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[11px]">Uploaded</p>
                    <p className="text-[#1a2642] font-bold text-[14px]">16 Mar 2025</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[11px]">File</p>
                    <p className="text-[#1a2642] font-bold text-[14px]">PDF · 1.2 MB</p>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-2">VERIFICATION</p>
                  <p className="text-gray-600 text-[13px]">Reviewed by Emily Chen</p>
                  <p className="text-gray-500 text-[12px]">12 Apr 2026 · 10:18 AM</p>
                </div>

              </div>

            </div>

            <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50 rounded-b-xl">
              <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
                Close
              </button>
              <div className="flex gap-3">
                <button className="px-6 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50 shadow-sm">
                  Open full view
                </button>
                <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors shadow-sm">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
