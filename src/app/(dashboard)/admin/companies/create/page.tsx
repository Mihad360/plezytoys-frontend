"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useState } from "react";
import UseForm from "@/components/ui/UseForm";
import UseInput from "@/components/ui/UseInput";
import UseSelect from "@/components/ui/UseSelect";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const createCompanySchema = z.object({
  companyName: z.string().min(1, { message: "Required" }),
  businessEmail: z.string().email(),
  phoneNumber: z.string().min(1, { message: "Required" }),
  adminFullName: z.string().min(1, { message: "Required" }),
  adminEmail: z.string().email(),
  pilotDuration: z.string().optional(),
});

type FormValues = z.infer<typeof createCompanySchema>;

const SECTORS = ["Security", "Cleaning", "Healthcare", "Hospitality", "Facility Services", "Other"];

export default function CreateCompanyPage() {
  const router = useRouter();
  const [selectedSector, setSelectedSector] = useState("Security");
  const [selectedPlan, setSelectedPlan] = useState("Starter");
  const [selectedStatus, setSelectedStatus] = useState("Trial");

  const onSubmit = (data: FormValues) => {
    console.log("Create company:", { ...data, sector: selectedSector, plan: selectedPlan, status: selectedStatus });
    router.push("/admin/companies");
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Create Company</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[800px]">
          
          <Link href="/admin/companies" className="inline-flex items-center text-gray-500 font-medium text-[13px] hover:text-[#1a2642] transition-colors mb-6">
            <span className="mr-2">←</span> Companies
          </Link>

          <div className="mb-8">
            <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Create Company</h2>
            <p className="text-gray-500 text-[14px]">Set up a new tenant company on the platform</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            <UseForm onSubmit={onSubmit} resolver={zodResolver(createCompanySchema)}>
              
              {/* SECTION: COMPANY INFORMATION */}
              <div className="mb-8">
                <h3 className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-5">
                  COMPANY INFORMATION
                </h3>
                
                <div className="mb-5">
                  <UseInput
                    name="companyName"
                    label="COMPANY NAME"
                    placeholder="e.g. ABC Security Services"
                    size="large"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5 mb-6">
                  <UseInput
                    name="businessEmail"
                    label="BUSINESS EMAIL"
                    placeholder="admin@company.com"
                    size="large"
                  />
                  <UseInput
                    name="phoneNumber"
                    label="PHONE NUMBER"
                    placeholder="+44 000 000 0000"
                    size="large"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-[13px] font-medium mb-2.5 after:content-[''] after:text-red-500 after:ml-1">SECTOR</label>
                  <div className="grid grid-cols-3 gap-3">
                    {SECTORS.map(sector => (
                      <button
                        key={sector}
                        type="button"
                        onClick={() => setSelectedSector(sector)}
                        className={`py-2 px-4 rounded-md text-[13px] font-medium transition-colors border ${
                          selectedSector === sector
                            ? "bg-[#1a2642] text-white border-[#1a2642]"
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {sector}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 mb-8" />

              {/* SECTION: COMPANY ADMIN ACCOUNT */}
              <div className="mb-8">
                <h3 className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-5">
                  COMPANY ADMIN ACCOUNT
                </h3>
                
                <div className="grid grid-cols-2 gap-5">
                  <UseInput
                    name="adminFullName"
                    label="FULL NAME"
                    placeholder="Admin full name"
                    size="large"
                  />
                  <UseInput
                    name="adminEmail"
                    label="EMAIL ADDRESS"
                    placeholder="admin@company.com"
                    size="large"
                  />
                </div>
              </div>

              <hr className="border-gray-100 mb-8" />

              {/* SECTION: SUBSCRIPTION */}
              <div className="mb-10">
                <h3 className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-5">
                  SUBSCRIPTION
                </h3>
                
                <div className="grid grid-cols-3 gap-5 items-start">
                  {/* PLAN */}
                  <div>
                    <label className="block text-gray-700 text-[13px] font-medium mb-2.5">PLAN</label>
                    <div className="flex flex-col gap-3">
                      {["Starter", "Professional", "Enterprise"].map(plan => (
                        <button
                          key={plan}
                          type="button"
                          onClick={() => setSelectedPlan(plan)}
                          className={`py-2.5 px-4 rounded-md text-[13px] font-medium transition-colors border ${
                            selectedPlan === plan
                              ? "bg-[#f97316] text-white border-[#f97316]"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {plan}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* STATUS */}
                  <div>
                    <label className="block text-gray-700 text-[13px] font-medium mb-2.5">STATUS</label>
                    <div className="flex flex-col gap-3">
                      {["Trial", "Active"].map(status => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setSelectedStatus(status)}
                          className={`py-2.5 px-4 rounded-md text-[13px] font-medium transition-colors border ${
                            selectedStatus === status
                              ? "bg-[#1a2642] text-white border-[#1a2642]"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* PILOT DURATION */}
                  <div>
                    <label className="block text-gray-700 text-[13px] font-medium mb-2.5">PILOT DURATION</label>
                    <UseSelect
                      name="pilotDuration"
                      placeholder="Select duration"
                      options={[
                        { label: "1 month", value: "1 month" },
                        { label: "2 months", value: "2 months" },
                        { label: "3 months", value: "3 months" },
                        { label: "6 months", value: "6 months" },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors"
                >
                  Create Company
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/admin/companies")}
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>

            </UseForm>
          </div>

        </div>
      </main>
    </div>
  );
}
