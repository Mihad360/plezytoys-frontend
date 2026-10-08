"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, RefreshCw, AlertCircle, Check } from "lucide-react";
import { useGetSubscriptionPlansQuery } from "@/redux/api/superAdminApi";

export default function SubscriptionPlansPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: response, isLoading, isError, refetch } = useGetSubscriptionPlansQuery(undefined);
  const plans: any[] = response?.data || [];

  const filteredPlans = plans.filter((plan) => {
    const name = (plan.name || "").toLowerCase();
    const billing = (plan.billingPeriod || "").toLowerCase();
    return (
      name.includes(searchTerm.toLowerCase()) || billing.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Subscription Plans</h1>
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
          {/* Header area */}
          <div className="flex flex-col items-center justify-center text-center mt-6 mb-10">
            <p className="text-[#f97316] font-bold text-[11px] tracking-[0.15em] uppercase mb-3">
              SUBSCRIPTION TIERS
            </p>
            <h2 className="text-[#1a2642] text-[32px] font-bold mb-3">
              Pricing built around active operations & security teams
            </h2>
            <p className="text-gray-500 text-[15px] max-w-[650px] mb-6">
              Configure tenant pricing packages, employee thresholds, patrol capabilities, and module entitlements.
            </p>
            <Link
              href="/admin/subscription-plans/add"
              className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="text-lg leading-none mb-0.5">+</span> Add New Plan
            </Link>
          </div>

          {/* Search Bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between mb-8 shadow-sm">
            <div className="flex items-center text-gray-400 px-2 flex-1">
              <Search size={18} className="mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Search plans by name or period..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-[#1a2642] text-[14px] w-full max-w-[350px]"
              />
            </div>
            <Link
              href="/admin/payment-history"
              className="text-gray-500 text-[13px] hover:text-[#1a2642] font-medium px-3 transition-colors"
            >
              View payment history →
            </Link>
          </div>

          {/* Error Banner */}
          {isError && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
              <AlertCircle size={20} />
              <div className="flex-1">
                <p className="font-semibold text-sm">Failed to load subscription plans</p>
                <p className="text-xs text-red-600">Please check connection and retry.</p>
              </div>
              <button
                onClick={() => refetch()}
                className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          )}

          {/* Pricing Cards */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm animate-pulse">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 w-36 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-48 bg-gray-100 rounded mb-8"></div>
                  <div className="h-10 w-full bg-gray-200 rounded mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-100 rounded"></div>
                    <div className="h-4 w-4/5 bg-gray-100 rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPlans.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
              <p className="text-gray-500 font-medium mb-1">No subscription plans found</p>
              <p className="text-gray-400 text-sm">
                Try a different search or create your first plan.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPlans.map((plan: any) => {
                const isPro = plan.name?.toLowerCase().includes("professional");
                const features: string[] = plan.features || [
                  `Up to ${plan.maxEmployees || 50} employees`,
                  `Up to ${plan.maxLocations || 10} locations`,
                  "NFC checkpoints & patrol tours",
                  "Incident reporting & dispatch",
                  "Standard reporting & audit trail",
                ];

                return (
                  <div
                    key={plan._id}
                    className={`bg-white rounded-2xl p-8 shadow-sm flex flex-col relative border ${
                      isPro ? "border-[#f97316] shadow-md ring-1 ring-[#f97316]/20" : "border-gray-100"
                    }`}
                  >
                    {isPro && (
                      <div className="absolute top-0 right-0 bg-[#f97316] text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                        Most Popular
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-4">
                      <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase">
                        {plan.billingPeriod || "MONTHLY"}
                      </p>
                      <p className="text-[#1a2642] font-bold text-[18px]">
                        €{plan.price}{" "}
                        <span className="text-gray-400 font-normal text-[12px]">
                          /{plan.billingPeriod === "annual" ? "yr" : "mo"}
                        </span>
                      </p>
                    </div>

                    <h3 className="text-[#1a2642] text-[24px] font-bold mb-1.5">{plan.name}</h3>
                    <p className="text-gray-400 text-[13px] mb-6">
                      {plan.description || "Operational package for security operations"}
                    </p>

                    <Link
                      href={`/admin/subscription-plans/${plan._id}`}
                      className={`block text-center w-full font-medium text-[14px] py-2.5 rounded-lg transition-colors mb-6 ${
                        isPro
                          ? "bg-[#f97316] hover:bg-[#e06511] text-white"
                          : "bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[#1a2642]"
                      }`}
                    >
                      Configure Plan
                    </Link>

                    <div className="text-[13px] text-gray-600 space-y-3 flex-1 mb-8">
                      <p className="font-semibold text-[#1a2642]">
                        Max: {plan.maxEmployees || "Unlimited"} Employees / {plan.maxLocations || "Unlimited"} Locations
                      </p>
                      {features.map((feat, idx) => (
                        <p key={idx} className="flex items-center gap-2">
                          <Check size={15} className="text-[#f97316] shrink-0" />
                          <span>{feat}</span>
                        </p>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                      <span>Status: {plan.isActive !== false ? "Active" : "Archived"}</span>
                      <span className="text-[#f97316] font-medium">ID: {plan._id?.slice(-6)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
