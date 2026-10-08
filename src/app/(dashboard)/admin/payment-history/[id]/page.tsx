"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Bell, RefreshCw, AlertCircle, FileText, CheckCircle2 } from "lucide-react";
import { useGetPaymentByIdQuery } from "@/redux/api/superAdminApi";

export default function PaymentDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";

  const { data: response, isLoading, isError, refetch } = useGetPaymentByIdQuery(id, {
    skip: !id,
  });

  const payment = response?.data;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  };

  const compName =
    typeof payment?.company === "object"
      ? payment?.company?.name || "Company"
      : "Company";

  const compEmail =
    typeof payment?.company === "object"
      ? payment?.company?.contactEmail || "finance@company.com"
      : "finance@company.com";

  const planName =
    typeof payment?.subscriptionPlan === "object"
      ? payment?.subscriptionPlan?.name || "Subscription Plan"
      : "Subscription Plan";

  const isPaid = payment?.status?.toLowerCase() === "paid";

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Payment Detail</h1>
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
            href="/admin/payment-history"
            className="inline-flex items-center text-gray-500 font-medium text-[13px] hover:text-[#1a2642] transition-colors mb-6"
          >
            <span className="mr-2">←</span> Back to payment history
          </Link>

          {isLoading ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
              <RefreshCw className="animate-spin text-[#f97316] mx-auto mb-3" size={28} />
              <p className="text-gray-500 font-medium">Loading payment record...</p>
            </div>
          ) : isError || !payment ? (
            <div className="bg-white rounded-xl border border-red-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 text-red-600 mb-2">
                <AlertCircle size={22} />
                <h3 className="text-lg font-bold">Payment Record Not Found</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Unable to locate invoice with ID: {id}
              </p>
              <Link
                href="/admin/payment-history"
                className="inline-block px-4 py-2 bg-[#1a2642] text-white rounded-lg text-sm font-medium"
              >
                Return to Payment History
              </Link>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">{compName}</h2>
                  <p className="text-gray-500 text-[14px]">
                    Subscription billing record with payment confirmation and audit context.
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-4 py-1.5 rounded-full text-[12px] font-semibold border mt-2 ${
                    isPaid
                      ? "bg-green-50 text-green-600 border-green-200"
                      : "bg-yellow-50 text-yellow-600 border-yellow-200"
                  }`}
                >
                  {payment.status ? payment.status.toUpperCase() : "PENDING"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Payment Summary */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                  <h3 className="text-[#1a2642] font-bold text-[16px] mb-6">Payment Summary</h3>

                  <div className="mb-8">
                    <p className="text-[#1a2642] text-[36px] font-bold mb-1">
                      €{(payment.amount || 0).toFixed(2)}
                    </p>
                    <p className="text-gray-400 text-[13px]">
                      {planName} Plan billing · {payment.currency || "EUR"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center py-3 border-t border-gray-50">
                      <span className="text-gray-400 text-[13px]">Invoice number</span>
                      <span className="text-[#1a2642] font-semibold text-[13px] font-mono">
                        {payment.invoiceId || `INV-${payment._id?.slice(-6).toUpperCase()}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t border-gray-50">
                      <span className="text-gray-400 text-[13px]">Payment status</span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-md text-[12px] font-semibold ${
                          isPaid ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {isPaid ? "Paid & Settled" : "Pending Payment"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t border-gray-50">
                      <span className="text-gray-400 text-[13px]">Payment date</span>
                      <span className="text-[#1a2642] font-semibold text-[13px]">
                        {formatDate(payment.paidAt || payment.createdAt)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t border-gray-50">
                      <span className="text-gray-400 text-[13px]">Billing period</span>
                      <span className="text-[#1a2642] font-semibold text-[13px]">
                        {payment.periodStart ? `${formatDate(payment.periodStart)} – ${formatDate(payment.periodEnd)}` : "Monthly subscription"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Billing & Tenant Details */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col">
                  <h3 className="text-[#1a2642] font-bold text-[16px] mb-6">Tenant & Audit</h3>

                  <div className="flex flex-col gap-4 mb-8 flex-1">
                    <div className="flex justify-between items-center py-3 border-t border-gray-50">
                      <span className="text-gray-400 text-[13px]">Company name</span>
                      <span className="text-[#1a2642] font-medium text-[13px] text-right font-semibold">
                        {compName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t border-gray-50">
                      <span className="text-gray-400 text-[13px]">Billing contact</span>
                      <span className="text-[#1a2642] font-medium text-[13px] text-right">
                        {compEmail}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t border-gray-50">
                      <span className="text-gray-400 text-[13px]">Record source</span>
                      <span className="text-[#1a2642] font-medium text-[13px] text-right">
                        Automated subscription billing
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t border-gray-50">
                      <span className="text-gray-400 text-[13px]">Transaction Reference</span>
                      <span className="font-mono text-xs text-gray-500 text-right">
                        {payment._id}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs text-green-600 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 size={16} /> Verified on Ledger
                    </span>
                    <Link
                      href={`/admin/companies/${payment.company?._id || payment.company}`}
                      className="text-xs font-semibold text-[#f97316] hover:underline"
                    >
                      View Company Profile →
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
