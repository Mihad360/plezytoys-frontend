"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Bell, RefreshCw, AlertCircle } from "lucide-react";
import { useGetCompanyByIdQuery, useUpdateCompanyModulesMutation } from "@/redux/api/companyApi";
import { toast } from "sonner";

const CORE_MODULES: { key: string; label: string }[] = [
  { key: "workforce", label: "Workforce" },
  { key: "employees", label: "Employees" },
  { key: "customers", label: "Customers" },
  { key: "locations", label: "Locations" },
  { key: "tasks", label: "Tasks" },
  { key: "checklists", label: "Checklists" },
  { key: "reports", label: "Reports" },
  { key: "timeTracking", label: "Time Tracking / Clock In & Out" },
  { key: "patrols", label: "Patrols & Rounds" },
  { key: "incidentReports", label: "Incident Reports" },
  { key: "certificates", label: "Certificates & Expiry Alerts" },
  { key: "notifications", label: "Notifications" },
  { key: "clientPortal", label: "Client/Guest Portal" },
];

const OPTIONAL_MODULES: { key: string; label: string }[] = [
  { key: "nfcCheckpoints", label: "NFC Checkpoints" },
  { key: "gpsVerification", label: "GPS Verification" },
  { key: "documents", label: "Documents" },
  { key: "communication", label: "Communication / Chat" },
  { key: "aiAssistant", label: "AI Assistant" },
];

export default function ModuleManagementPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";

  const { data: response, isLoading, isError, refetch } = useGetCompanyByIdQuery(id, {
    skip: !id,
  });
  const [updateModules, { isLoading: isSaving }] = useUpdateCompanyModulesMutation();

  const company = response?.data;

  const [modules, setModules] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (company) {
      const defaultState: Record<string, boolean> = {};
      CORE_MODULES.forEach((m) => {
        defaultState[m.key] = company.enabledModules ? company.enabledModules[m.key] !== false : true;
      });
      OPTIONAL_MODULES.forEach((m) => {
        defaultState[m.key] = company.enabledModules ? Boolean(company.enabledModules[m.key]) : false;
      });
      setModules(defaultState);
    }
  }, [company]);

  const toggleModule = (key: string) => {
    setModules((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    if (!id) return;
    try {
      await updateModules({ id, modules }).unwrap();
      toast.success("Company modules updated successfully");
      router.push(`/admin/companies/${id}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update company modules");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Module Management</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[700px]">
          <Link
            href={`/admin/companies/${id}`}
            className="inline-flex items-center text-gray-500 font-medium text-[13px] hover:text-[#1a2642] transition-colors mb-6"
          >
            <span className="mr-2">←</span> Back to {company?.name || "Company"}
          </Link>

          {isLoading ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
              <RefreshCw className="animate-spin text-[#f97316] mx-auto mb-3" size={28} />
              <p className="text-gray-500 font-medium">Loading module configuration...</p>
            </div>
          ) : isError || !company ? (
            <div className="bg-white rounded-xl border border-red-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 text-red-600 mb-2">
                <AlertCircle size={22} />
                <h3 className="text-lg font-bold">Company Not Found</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4">Unable to load company with ID: {id}</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Module Management</h2>
                <p className="text-gray-500 text-[14px]">
                  Select active features & modules for {company.name || company.companyName}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                {/* CORE MODULES */}
                <div className="mb-10">
                  <h3 className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-6">
                    CORE MODULES
                  </h3>

                  <div className="space-y-5">
                    {CORE_MODULES.map((module) => (
                      <div key={module.key} className="flex items-center justify-between">
                        <span className="text-[#1a2642] text-[14px] font-semibold">
                          {module.label}
                        </span>

                        <button
                          type="button"
                          onClick={() => toggleModule(module.key)}
                          className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors ${
                            modules[module.key] ? "bg-orange-100" : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                              modules[module.key]
                                ? "translate-x-[22px] bg-[#f97316]"
                                : "translate-x-[3px] bg-white"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-100 mb-10" />

                {/* OPTIONAL MODULES */}
                <div className="mb-12">
                  <h3 className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-6">
                    OPTIONAL MODULES
                  </h3>

                  <div className="space-y-5">
                    {OPTIONAL_MODULES.map((module) => (
                      <div key={module.key} className="flex items-center justify-between">
                        <span className="text-[#1a2642] text-[14px] font-semibold">
                          {module.label}
                        </span>

                        <button
                          type="button"
                          onClick={() => toggleModule(module.key)}
                          className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors ${
                            modules[module.key] ? "bg-orange-100" : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                              modules[module.key]
                                ? "translate-x-[22px] bg-[#f97316]"
                                : "translate-x-[3px] bg-white"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={handleSave}
                    className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving && <RefreshCw size={16} className="animate-spin" />}
                    Save Modules
                  </button>
                  <Link
                    href={`/admin/companies/${id}`}
                    className="inline-flex bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
