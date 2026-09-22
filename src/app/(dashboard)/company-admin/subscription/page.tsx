"use client";

import { Bell, X } from "lucide-react";
import { useState } from "react";

export default function SubscriptionPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeModal, setActiveModal] = useState<"none" | "manage-payment" | "invoice-history" | "payment-failed" | "trial-active" | "cancel-subscription">("none");

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Subscription</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Subscription</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg text-gray-600 text-[13px] font-medium transition-colors">
            <span className="text-[#f97316] text-[16px]">★</span> Subscription
          </button>
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

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1100px] mx-auto">
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Subscription</h2>
              <p className="text-gray-500 text-[14px]">Manage your ShiftPoint plan, billing and operational capacity.</p>
            </div>
            <div className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-[13px] font-medium flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Subscription active
            </div>
          </div>

          <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-lg w-max">
            {["Overview", "Plans", "Billing & Payments", "Usage"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-[13px] font-medium rounded-md transition-colors ${
                  activeTab === tab
                    ? "bg-white text-[#1a2642] shadow-sm"
                    : "text-gray-500 hover:text-[#1a2642]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Overview" && (
            <div className="grid grid-cols-3 gap-6">
              
              <div className="col-span-2 space-y-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase">CURRENT PLAN</p>
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[11px] font-medium">Active</span>
                  </div>
                  <h3 className="text-[#1a2642] text-[28px] font-bold mb-1">Growth</h3>
                  <p className="text-gray-500 text-[13px] mb-6">Monthly billing · €169/month</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">NEXT PAYMENT</p>
                      <p className="text-[#1a2642] font-semibold text-[13px]">01 Oct 2026</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">PAYMENT METHOD</p>
                      <p className="text-[#1a2642] font-semibold text-[13px]">Visa •••• 2048</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">SERVICE OBJECTS</p>
                      <p className="text-[#1a2642] font-semibold text-[13px]">12 of 20</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setActiveTab("Plans")} className="px-5 py-2.5 bg-[#d97706] hover:bg-[#b45f06] text-white rounded-lg text-[13px] font-medium transition-colors">
                      Change Plan
                    </button>
                    <button onClick={() => setActiveModal("manage-payment")} className="px-5 py-2.5 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                      Manage Payment
                    </button>
                    <button onClick={() => setActiveModal("invoice-history")} className="px-5 py-2.5 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                      View Invoices
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h4 className="text-[#1a2642] font-bold text-[15px] mb-2">Payment issue?</h4>
                    <p className="text-gray-500 text-[13px] mb-4 h-[40px]">If we cannot process your latest payment, update your method and retry before the grace period ends.</p>
                    <button onClick={() => setActiveModal("payment-failed")} className="px-5 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] hover:bg-gray-50 transition-colors">
                      View payment recovery
                    </button>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h4 className="text-[#1a2642] font-bold text-[15px] mb-2">Trial / pilot</h4>
                    <p className="text-gray-500 text-[13px] mb-4 h-[40px]">Free trial active? Choose a paid subscription before it ends to continue using SHIFTPOINT.</p>
                    <button onClick={() => setActiveModal("trial-active")} className="px-5 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] hover:bg-gray-50 transition-colors">
                      Choose a plan
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-span-1">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-3">REMAINING CAPACITY</p>
                  <p className="text-[#f97316] font-bold text-[32px] leading-none mb-1">27</p>
                  <p className="text-gray-500 text-[13px] mb-6">employee seats available</p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-[#f97316] h-2 rounded-full" style={{ width: '64%' }}></div>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-gray-500 mb-6">
                    <span>48 active employees</span>
                    <span>75 plan limit</span>
                  </div>

                  <button onClick={() => setActiveTab("Usage")} className="text-[#f97316] font-semibold text-[13px] hover:underline flex items-center gap-1">
                    View usage details →
                  </button>
                </div>
              </div>

            </div>
          )}

          {activeTab === "Plans" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#1a2642] text-[16px] font-bold">Available plans</h3>
                <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                  <button className="px-4 py-1.5 bg-gray-100 text-[#1a2642] rounded-md text-[12px] font-semibold">Monthly</button>
                  <button className="px-4 py-1.5 text-gray-500 hover:text-[#1a2642] rounded-md text-[12px] font-medium">Annual · Save 20%</button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col">
                  <h4 className="text-[#1a2642] text-[20px] font-bold mb-4">Starter</h4>
                  <div className="mb-4">
                    <span className="text-[#1a2642] text-[28px] font-bold">€89</span>
                    <span className="text-gray-500 text-[13px]">/month</span>
                  </div>
                  <p className="text-gray-500 text-[13px] mb-8 flex-1">For smaller, focused security teams.</p>
                  
                  <div className="space-y-2 mb-8 pt-6 border-t border-gray-100">
                    <p className="text-[13px] text-gray-600">Up to <span className="font-bold text-[#1a2642]">25 employees</span></p>
                    <p className="text-[13px] text-gray-600">Up to <span className="font-bold text-[#1a2642]">5 service objects</span></p>
                  </div>
                  <button className="w-full py-3 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors">
                    Downgrade
                  </button>
                </div>

                <div className="bg-white rounded-xl border-2 border-[#f97316] shadow-md p-8 flex flex-col relative">
                  <div className="absolute top-6 right-6 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[11px] font-semibold">Current plan</div>
                  <h4 className="text-[#1a2642] text-[20px] font-bold mb-4">Business</h4>
                  <div className="mb-4">
                    <span className="text-[#1a2642] text-[28px] font-bold">€169</span>
                    <span className="text-gray-500 text-[13px]">/month</span>
                  </div>
                  <p className="text-gray-500 text-[13px] mb-8 flex-1">For growing multi-location operations.</p>
                  
                  <div className="space-y-2 mb-8 pt-6 border-t border-gray-100">
                    <p className="text-[13px] text-gray-600">Up to <span className="font-bold text-[#1a2642]">75 employees</span></p>
                    <p className="text-[13px] text-gray-600">Up to <span className="font-bold text-[#1a2642]">20 service objects</span></p>
                  </div>
                  <button className="w-full py-3 border border-gray-200 text-gray-400 rounded-lg text-[14px] font-medium cursor-not-allowed">
                    Current Plan
                  </button>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col">
                  <h4 className="text-[#1a2642] text-[20px] font-bold mb-4">Enterprise</h4>
                  <div className="mb-4">
                    <span className="text-[#1a2642] text-[28px] font-bold">€349</span>
                    <span className="text-gray-500 text-[13px]">/month</span>
                  </div>
                  <p className="text-gray-500 text-[13px] mb-8 flex-1">For large, distributed operations.</p>
                  
                  <div className="space-y-2 mb-8 pt-6 border-t border-gray-100">
                    <p className="text-[13px] text-gray-600">Up to <span className="font-bold text-[#1a2642]">250 employees</span></p>
                    <p className="text-[13px] text-gray-600">Up to <span className="font-bold text-[#1a2642]">75 service objects</span></p>
                  </div>
                  <button className="w-full py-3 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors">
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Billing & Payments" && (
            <div className="grid grid-cols-3 gap-6">
              
              <div className="col-span-2 space-y-6">
                
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-[#1a2642] font-bold text-[15px] mb-1">Payment method</h3>
                    <p className="text-gray-500 text-[13px]">Visa ending in 2048 · Expires 09/28</p>
                  </div>
                  <button onClick={() => setActiveModal("manage-payment")} className="px-5 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] hover:bg-gray-50">
                    Update
                  </button>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-[#1a2642] font-bold text-[15px]">Payment history</h3>
                  </div>
                  <table className="w-full text-left text-[13px]">
                    <tbody>
                      <tr className="border-b border-gray-50">
                        <td className="px-6 py-4 text-gray-500">01 Sep 2026</td>
                        <td className="px-6 py-4 text-gray-600">Growth plan · Monthly</td>
                        <td className="px-6 py-4 text-[#1a2642] font-semibold">€169.00</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex px-3 py-1 bg-green-50 text-green-600 rounded-full text-[11px] font-medium">Paid</span>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-50">
                        <td className="px-6 py-4 text-gray-500">01 Aug 2026</td>
                        <td className="px-6 py-4 text-gray-600">Growth plan · Monthly</td>
                        <td className="px-6 py-4 text-[#1a2642] font-semibold">€169.00</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex px-3 py-1 bg-green-50 text-green-600 rounded-full text-[11px] font-medium">Paid</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-gray-500">01 Jul 2026</td>
                        <td className="px-6 py-4 text-gray-600">Growth plan · Monthly</td>
                        <td className="px-6 py-4 text-[#1a2642] font-semibold">€169.00</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex px-3 py-1 bg-green-50 text-green-600 rounded-full text-[11px] font-medium">Paid</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>

              <div className="col-span-1 space-y-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-[#1a2642] font-bold text-[15px] mb-4">Billing details</h3>
                  <div className="text-[13px] text-gray-500 space-y-1 mb-6">
                    <p>ABC Security Ltd.</p>
                    <p>Prins Bernhardplein 200</p>
                    <p>1097 JB Amsterdam, Netherlands</p>
                    <p>VAT NL123456789B01</p>
                  </div>
                  <button className="px-5 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] hover:bg-gray-50">
                    Edit Billing Details
                  </button>

                  <div className="my-6 border-t border-gray-100"></div>

                  <h3 className="text-[#1a2642] font-bold text-[15px] mb-4">Invoice history</h3>
                  <button onClick={() => setActiveModal("invoice-history")} className="w-full py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[13px] font-medium transition-colors mb-6">
                    View Invoices
                  </button>

                  <button onClick={() => setActiveModal("cancel-subscription")} className="text-red-500 text-[13px] font-medium hover:underline">
                    Cancel subscription
                  </button>
                </div>
              </div>

            </div>
          )}

          {activeTab === "Usage" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 max-w-[800px]">
              <h3 className="text-[#1a2642] text-[16px] font-bold mb-8">Usage & capacity</h3>
              
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[#1a2642] font-semibold text-[14px]">Active employees</span>
                  <span className="text-gray-500 text-[13px]">48 of 75 · 27 remaining</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#f97316] h-2.5 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[#1a2642] font-semibold text-[14px]">Service objects</span>
                  <span className="text-gray-500 text-[13px]">12 of 20 · 8 remaining</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#f97316] h-2.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-lg p-5 mb-6">
                <p className="text-[#d97706] text-[13px] font-medium">Your current plan limit has been reached? Upgrade your plan to activate additional employees.</p>
              </div>

              <button onClick={() => setActiveTab("Plans")} className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors">
                Explore Plans
              </button>

            </div>
          )}

        </div>
      </main>

      {/* MODALS */}
      {activeModal !== "none" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          
          {/* Manage Payment Method Modal */}
          {activeModal === "manage-payment" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-[#1a2642] text-[18px] font-bold">Manage Payment Method</h3>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <div className="p-8">
                <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Payment method</label>
                <input type="text" defaultValue="Stripe" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316] mb-6" />
                <div className="flex justify-end gap-3">
                  <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors">
                    Save Payment Method
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Invoice History Modal */}
          {activeModal === "invoice-history" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-[#1a2642] text-[18px] font-bold">Invoice History</h3>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <div className="p-2 max-h-[400px] overflow-y-auto">
                <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                  <div>
                    <p className="text-[#1a2642] font-semibold text-[14px]">INV-2026-0901</p>
                    <p className="text-gray-500 text-[12px]">01 Sep 2026 · €169.00</p>
                  </div>
                  <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-gray-600 hover:bg-gray-50">Download</button>
                </div>
                <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                  <div>
                    <p className="text-[#1a2642] font-semibold text-[14px]">INV-2026-0801</p>
                    <p className="text-gray-500 text-[12px]">01 Aug 2026 · €169.00</p>
                  </div>
                  <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-gray-600 hover:bg-gray-50">Download</button>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-[#1a2642] font-semibold text-[14px]">INV-2026-0701</p>
                    <p className="text-gray-500 text-[12px]">01 Jul 2026 · €169.00</p>
                  </div>
                  <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-medium text-gray-600 hover:bg-gray-50">Download</button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Failed Modal */}
          {activeModal === "payment-failed" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[650px] animate-in fade-in zoom-in-95 duration-200 my-8">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center">
                    <span className="text-[#f97316] font-bold text-[18px]">S</span>
                  </div>
                  <div>
                    <p className="text-red-500 text-[10px] font-bold tracking-wide uppercase mb-0.5">PAYMENT RECOVERY</p>
                    <h3 className="text-[#1a2642] text-[20px] font-bold leading-tight">Payment Failed</h3>
                  </div>
                </div>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              
              <div className="p-8 space-y-4">
                <div className="bg-red-50 border border-red-100 rounded-lg p-5">
                  <p className="text-red-700 text-[15px] font-medium mb-1">Invoice INV-2026-0918 could not be collected</p>
                  <p className="text-red-600 text-[13px]">€349.00 · Failed 10 Sep 2026 · 09:14 CEST</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">PAYMENT METHOD USED</p>
                    <p className="text-gray-600 text-[13px]">Visa •••• 4242 · Expires 08/2028</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">FAILURE REASON</p>
                    <p className="text-gray-600 text-[13px]">Issuer declined the payment</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">RETRY ATTEMPTS</p>
                    <p className="text-gray-600 text-[13px]">2 completed · 1 retry remaining</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">GRACE PERIOD ENDS</p>
                    <p className="text-gray-600 text-[13px]">17 Sep 2026 · 23:59 CEST</p>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-100 rounded-lg p-5">
                  <p className="text-[#d97706] text-[13px] font-medium mb-2">Access during the grace period</p>
                  <p className="text-[#d97706] text-[13px] leading-relaxed">
                    ABC Security Ltd. remains fully operational until the exact grace-period end time. If payment remains unsuccessful, the Super Admin's configured rule changes the account to restricted / read-only access. Company data is preserved and is never deleted.
                  </p>
                </div>

                <div>
                  <p className="text-[#1a2642] text-[14px] font-medium mb-3 mt-6">Notifications</p>
                  <ul className="space-y-2 text-[13px] text-gray-600">
                    <li className="flex items-center gap-2">✓ Failed payment notice sent by email and in-app to authorized Company Admins.</li>
                    <li className="flex items-center gap-2">✓ Restriction reminder scheduled before 17 Sep 2026 · 23:59 CEST.</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex justify-center gap-3 bg-white rounded-b-xl">
                <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                  Close
                </button>
                <button className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors">
                  Retry payment with provider
                </button>
                <button className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50">
                  Update payment method
                </button>
              </div>
            </div>
          )}

          {/* Trial Active Modal */}
          {activeModal === "trial-active" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[650px] animate-in fade-in zoom-in-95 duration-200 my-8">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center">
                    <span className="text-[#f97316] font-bold text-[18px]">S</span>
                  </div>
                  <div>
                    <p className="text-[#f97316] text-[10px] font-bold tracking-wide uppercase mb-0.5">SUBSCRIPTION STATUS</p>
                    <h3 className="text-[#1a2642] text-[20px] font-bold leading-tight">Free Trial Active</h3>
                  </div>
                </div>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              
              <div className="p-8 space-y-4">
                <div className="bg-green-50 border border-green-100 rounded-lg p-5">
                  <p className="text-green-700 text-[15px] font-medium mb-1">Self-service trial · currently operational</p>
                  <p className="text-green-600 text-[13px] leading-relaxed">
                    This company is in a free trial, not on an active paid subscription. A paid plan becomes active only after it is scheduled and its payment or SEPA mandate is approved.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">ACCOUNT TYPE</p>
                    <p className="text-gray-600 text-[13px]">Self-service free trial</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">TRIAL PERIOD</p>
                    <p className="text-gray-600 text-[13px]">10 Oct 2026 – 10 Jan 2027</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">DAYS REMAINING</p>
                    <p className="text-gray-600 text-[13px]">92 days</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">INCLUDED PLAN</p>
                    <p className="text-gray-600 text-[13px]">Professional trial</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">MODULES</p>
                    <p className="text-gray-600 text-[13px]">Patrols · Tasks · Reports · Attendance</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">LIMITS</p>
                    <p className="text-gray-600 text-[13px]">25 users · 5 locations</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 flex justify-between items-center">
                  <div>
                    <p className="text-[#1a2642] font-semibold text-[14px] mb-1">Paid plan schedule</p>
                    <p className="text-gray-500 text-[13px]">No paid plan is currently scheduled.</p>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[11px] font-medium">Not scheduled</span>
                </div>

                <div className="bg-orange-50 border border-orange-100 rounded-lg p-5">
                  <p className="text-[#d97706] text-[14px] font-medium mb-2">What happens at the end</p>
                  <p className="text-[#d97706] text-[13px] leading-relaxed">
                    If no paid subscription is selected, this account moves to the Super Admin-configured restricted / read-only state. All company data is retained and is never deleted.
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-[#1a2642] text-[14px] font-medium mb-1">Automatic reminders</p>
                  <p className="text-gray-500 text-[13px]">Authorized Company Admins receive expiry reminders by email and in-app notification 14, 7 and 1 day before the trial period ends.</p>
                </div>
              </div>
            </div>
          )}

          {/* Cancel Subscription Modal */}
          {activeModal === "cancel-subscription" && (
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[650px] animate-in fade-in zoom-in-95 duration-200 my-8">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center">
                    <span className="text-[#f97316] font-bold text-[18px]">S</span>
                  </div>
                  <div>
                    <p className="text-red-500 text-[10px] font-bold tracking-wide uppercase mb-0.5">AUTHORIZED COMPANY ADMIN</p>
                    <h3 className="text-[#1a2642] text-[20px] font-bold leading-tight">Cancel Subscription</h3>
                  </div>
                </div>
                <button onClick={() => setActiveModal("none")} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              
              <div className="p-8 space-y-4">
                <div className="bg-orange-50 border border-orange-100 rounded-lg p-5">
                  <p className="text-[#d97706] text-[15px] font-medium mb-1">Cancellation takes effect at the end of the paid period</p>
                  <p className="text-[#d97706] text-[13px]">Your subscription remains active until 01 Oct 2026 · 23:59 CEST.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">CURRENT PLAN</p>
                    <p className="text-gray-600 text-[13px]">Professional</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">BILLING CYCLE</p>
                    <p className="text-gray-600 text-[13px]">Monthly</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">EFFECTIVE CANCELLATION DATE</p>
                    <p className="text-gray-600 text-[13px]">01 Oct 2026 · 23:59 CEST</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">FINAL PAYMENT</p>
                    <p className="text-gray-600 text-[13px]">€349.00 · Invoice on 01 Oct 2026</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 space-y-4 mt-2">
                  <div>
                    <p className="text-[#1a2642] text-[14px] font-medium mb-1">After cancellation</p>
                    <p className="text-gray-600 text-[13px] leading-relaxed">
                      The company transitions to restricted / read-only access after the effective date. Company users, reports, attendance records and documents are preserved; no data is deleted.
                    </p>
                  </div>
                  <div>
                    <p className="text-[#1a2642] text-[14px] font-medium mb-1">Data retention: 12 months after cancellation</p>
                    <p className="text-gray-600 text-[13px] leading-relaxed">
                      Company Admins can export reports, attendance, documents, and other retained company data from Settings → Data Export before the retention period ends.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Cancellation reason <span className="text-gray-400 font-normal">(optional)</span></label>
                  <textarea rows={3} placeholder="Tell us why you are cancelling..." className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316] resize-none"></textarea>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-xl">
                <button onClick={() => setActiveModal("none")} className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                  Keep Subscription
                </button>
                <button className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-[14px] font-medium transition-colors">
                  Schedule cancellation
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
