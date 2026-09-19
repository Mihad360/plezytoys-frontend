"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

export default function PaymentDetailPage() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Payment Detail</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto">
          
          <Link href="/admin/payment-history" className="inline-flex items-center text-gray-500 font-medium text-[13px] hover:text-[#1a2642] transition-colors mb-6">
            <span className="mr-2">←</span> Back to payment history
          </Link>

          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">ABC Security Services</h2>
              <p className="text-gray-500 text-[14px]">Subscription billing record with payment and audit context.</p>
            </div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[12px] font-semibold bg-blue-50 text-blue-600 border border-blue-200 mt-2">
              Paid
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Payment Summary */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <h3 className="text-[#1a2642] font-bold text-[16px] mb-6">Payment summary</h3>
              
              <div className="mb-8">
                <p className="text-[#1a2642] text-[32px] font-bold mb-1">$992.00</p>
                <p className="text-gray-400 text-[13px]">Business subscription - September 2026 billing cycle</p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center py-4 border-t border-gray-50">
                  <span className="text-gray-400 text-[13px]">Invoice number</span>
                  <span className="text-[#1a2642] font-semibold text-[13px]">INV-24081</span>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-gray-50">
                  <span className="text-gray-400 text-[13px]">Payment status</span>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-[13px] font-medium bg-blue-50 text-blue-600 w-[200px] border border-blue-100">
                    Paid
                  </span>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-gray-50">
                  <span className="text-gray-400 text-[13px]">Payment date</span>
                  <span className="text-[#1a2642] font-semibold text-[13px]">01 Sep 2026</span>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-gray-50">
                  <span className="text-gray-400 text-[13px]">Payment method</span>
                  <span className="text-[#1a2642] font-semibold text-[13px]">Card ending 4242</span>
                </div>
              </div>
            </div>

            {/* Billing & Audit */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <h3 className="text-[#1a2642] font-bold text-[16px] mb-6">Billing & audit</h3>
              
              <div className="flex flex-col gap-6 mb-8">
                <div className="flex justify-between items-center py-4 border-t border-gray-50">
                  <span className="text-gray-400 text-[13px]">Company tenant ID</span>
                  <span className="text-[#1a2642] font-medium text-[13px] text-right">SP-1001</span>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-gray-50">
                  <span className="text-gray-400 text-[13px]">Billing contact</span>
                  <span className="text-[#1a2642] font-medium text-[13px] text-right">finance@abcsecurityservices.com</span>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-gray-50">
                  <span className="text-gray-400 text-[13px]">Record source</span>
                  <span className="text-[#1a2642] font-medium text-[13px] text-right">Automated subscription billing</span>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-gray-50">
                  <span className="text-gray-400 text-[13px]">Audit result</span>
                  <span className="text-[#1a2642] font-medium text-[13px] text-right">Payment captured successfully</span>
                </div>
              </div>

              <button className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50 transition-colors">
                Download receipt
              </button>
            </div>
            
          </div>

        </div>
      </main>
    </div>
  );
}
