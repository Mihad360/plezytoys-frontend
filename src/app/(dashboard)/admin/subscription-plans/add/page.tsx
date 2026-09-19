"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import UseForm from "@/components/ui/UseForm";
import UseInput from "@/components/ui/UseInput";
import UseSelect from "@/components/ui/UseSelect";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

const addPlanSchema = z.object({
  planName: z.string(),
  description: z.string().optional(),
  sector: z.string().optional(),
  planStatus: z.string().optional(),
  pricingBasis: z.string().optional(),
  currency: z.string().optional(),
  monthlyPrice: z.string().optional(),
  annualPrice: z.string().optional(),
  employeesLimit: z.string().optional(),
  locationsLimit: z.string().optional(),
  objectsLimit: z.string().optional(),
  nfcLimit: z.string().optional(),
  trialPeriod: z.string().optional(),
  discountRule: z.string().optional(),
  gracePeriod: z.string().optional(),
  trialAvailable: z.string().optional(),
  upgradeTarget: z.string().optional(),
  downgradeRule: z.string().optional(),
});

type FormValues = z.infer<typeof addPlanSchema>;

const MODULES = [
  "Employee Management", "Customer Management", "Location Management", "Patrol Management",
  "Reports & Analytics", "Advanced Analytics", "NFC Checkpoints", "AI Assistant"
];

export default function AddSubscriptionPlanPage() {
  const router = useRouter();
  const [selectedModules, setSelectedModules] = useState<string[]>(["Employee Management", "Customer Management", "Location Management"]);
  const [autoUpgrade, setAutoUpgrade] = useState(true);

  const toggleModule = (mod: string) => {
    setSelectedModules(prev => 
      prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
    );
  };

  const onSubmit = (data: FormValues) => {
    console.log("Add plan:", { ...data, selectedModules, autoUpgrade });
    router.push("/admin/subscription-plans");
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Add Subscription Plan</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[800px] mx-auto pb-10">
          
          <Link href="/admin/subscription-plans" className="inline-flex items-center text-gray-500 font-medium text-[13px] hover:text-[#1a2642] transition-colors mb-6">
            <span className="mr-2">←</span> Subscription plans
          </Link>

          <div className="mb-8">
            <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Add Subscription Plan</h2>
            <p className="text-gray-500 text-[14px]">Configure access, pricing, limits and availability for this plan.</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            <UseForm onSubmit={onSubmit} resolver={zodResolver(addPlanSchema)}>
              
              {/* BASIC INFORMATION */}
              <div className="mb-8">
                <h3 className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-5">
                  BASIC INFORMATION
                </h3>
                
                <div className="mb-5">
                  <UseInput
                    name="planName"
                    label="PLAN NAME"
                    placeholder="e.g. Professional"
                    size="large"
                  />
                </div>
                <div className="mb-5">
                  <UseInput
                    name="description"
                    label="DESCRIPTION"
                    type="textarea"
                    rows={2}
                    placeholder="Describe the plan's intended operating profile."
                  />
                </div>

                <div className="grid grid-cols-2 gap-5 mb-2">
                  <UseSelect
                    name="sector"
                    label="SECTOR"
                    placeholder="All sectors"
                    options={[{label: "All sectors", value: "All sectors"}]}
                  />
                  <UseSelect
                    name="planStatus"
                    label="PLAN STATUS"
                    placeholder="Active"
                    options={[{label: "Active", value: "Active"}, {label: "Draft", value: "Draft"}]}
                  />
                </div>
              </div>

              <hr className="border-gray-100 mb-8" />

              {/* PRICING */}
              <div className="mb-8">
                <h3 className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-5">
                  PRICING
                </h3>
                
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <UseSelect
                    name="pricingBasis"
                    label="PRICING BASIS"
                    placeholder="Employees"
                    options={[{label: "Employees", value: "Employees"}]}
                  />
                  <UseSelect
                    name="currency"
                    label="CURRENCY"
                    placeholder="EUR (€)"
                    options={[{label: "EUR (€)", value: "EUR"}]}
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <UseInput name="monthlyPrice" label="MONTHLY PRICE" placeholder="0.00" size="large" />
                    <p className="text-[11px] text-gray-400 mt-1">The selected basis is charged per employees.</p>
                  </div>
                  <UseInput name="annualPrice" label="ANNUAL PRICE" placeholder="0.00" size="large" />
                </div>
              </div>

              <hr className="border-gray-100 mb-8" />

              {/* LIMITS */}
              <div className="mb-8">
                <h3 className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-5">
                  LIMITS
                </h3>
                
                <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                  <div>
                    <label className="block text-gray-700 text-[13px] font-medium mb-1.5">EMPLOYEES</label>
                    <div className="flex">
                      <input type="text" placeholder="Set limit" className="w-full px-3 py-2 border border-gray-200 rounded-l-md text-[14px] focus:outline-none focus:border-[#f97316] border-r-0" />
                      <button type="button" className="px-3 border border-gray-200 rounded-r-md text-[12px] font-medium text-[#1a2642] bg-gray-50 hover:bg-gray-100">Unlimited</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[13px] font-medium mb-1.5">LOCATIONS</label>
                    <div className="flex">
                      <input type="text" placeholder="Set limit" className="w-full px-3 py-2 border border-gray-200 rounded-l-md text-[14px] focus:outline-none focus:border-[#f97316] border-r-0" />
                      <button type="button" className="px-3 border border-gray-200 rounded-r-md text-[12px] font-medium text-[#1a2642] bg-gray-50 hover:bg-gray-100">Unlimited</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[13px] font-medium mb-1.5">OBJECTS</label>
                    <div className="flex">
                      <input type="text" placeholder="Set limit" className="w-full px-3 py-2 border border-gray-200 rounded-l-md text-[14px] focus:outline-none focus:border-[#f97316] border-r-0" />
                      <button type="button" className="px-3 border border-gray-200 rounded-r-md text-[12px] font-medium text-[#1a2642] bg-gray-50 hover:bg-gray-100">Unlimited</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-[13px] font-medium mb-1.5">NFC CHECKPOINTS</label>
                    <div className="flex">
                      <input type="text" placeholder="Set limit" className="w-full px-3 py-2 border border-gray-200 rounded-l-md text-[14px] focus:outline-none focus:border-[#f97316] border-r-0" />
                      <button type="button" className="px-3 border border-gray-200 rounded-r-md text-[12px] font-medium text-[#1a2642] bg-gray-50 hover:bg-gray-100">Unlimited</button>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 mb-8" />

              {/* INCLUDED MODULES */}
              <div className="mb-8">
                <h3 className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-5">
                  INCLUDED MODULES
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {MODULES.map(mod => (
                    <label key={mod} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="checkbox"
                        checked={selectedModules.includes(mod)}
                        onChange={() => toggleModule(mod)}
                        className="w-4 h-4 text-[#f97316] rounded border-gray-300 focus:ring-[#f97316]"
                      />
                      <span className="text-[13px] text-gray-600 font-medium">{mod}</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100 mb-8" />

              {/* TRIALS, DISCOUNTS & PAYMENT GRACE */}
              <div className="mb-8">
                <h3 className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-5">
                  TRIALS, DISCOUNTS & PAYMENT GRACE
                </h3>
                
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <UseSelect
                    name="trialPeriod"
                    label="TRIAL PERIOD"
                    placeholder="30 days"
                    options={[{label: "30 days", value: "30 days"}]}
                  />
                  <UseInput
                    name="discountRule"
                    label="DISCOUNT RULE"
                    placeholder="e.g. 10% annual commitment"
                    size="large"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <UseSelect
                    name="gracePeriod"
                    label="PAYMENT GRACE PERIOD"
                    placeholder="7 days"
                    options={[{label: "7 days", value: "7 days"}]}
                  />
                  <UseSelect
                    name="trialAvailable"
                    label="TRIAL AVAILABLE"
                    placeholder="Enabled"
                    options={[{label: "Enabled", value: "Enabled"}]}
                  />
                </div>
              </div>

              <hr className="border-gray-100 mb-8" />

              {/* UPGRADE & DOWNGRADE RULES */}
              <div className="mb-10">
                <h3 className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-5">
                  UPGRADE & DOWNGRADE RULES
                </h3>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[14px] text-[#1a2642] font-semibold">Automatic upgrade on limit exceeded</p>
                    <p className="text-[12px] text-gray-400 mt-0.5">Move subscription to the assigned next plan when any chosen capacity is exceeded.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setAutoUpgrade(!autoUpgrade)}
                    className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors ${
                      autoUpgrade ? "bg-[#f97316]" : "bg-gray-200"
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoUpgrade ? "translate-x-[22px]" : "translate-x-[3px]"
                    }`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <UseSelect
                    name="upgradeTarget"
                    label="UPGRADE TARGET"
                    placeholder="Enterprise"
                    options={[{label: "Enterprise", value: "Enterprise"}]}
                  />
                  <UseSelect
                    name="downgradeRule"
                    label="DOWNGRADE RULE"
                    placeholder="Apply at next billing cycle"
                    options={[{label: "Apply at next billing cycle", value: "Apply at next billing cycle"}]}
                  />
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end items-center gap-3 border-t border-gray-100 pt-6">
                <button
                  type="button"
                  onClick={() => router.push("/admin/subscription-plans")}
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors"
                >
                  Add Subscription
                </button>
              </div>

            </UseForm>
          </div>
        </div>
      </main>
    </div>
  );
}
