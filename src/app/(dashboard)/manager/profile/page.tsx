"use client";

import { Bell, RefreshCw, User, Mail, Phone, Building, MapPin, ShieldCheck, ArrowRight, Edit3, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetManagerLocationsQuery, useUpdateManagerProfileMutation } from "@/redux/api/managerApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function ManagerProfilePage() {
  const { data: profileData, isLoading, refetch } = useGetMyProfileQuery(undefined);
  const manager = profileData?.data;

  const { data: locationsData } = useGetManagerLocationsQuery();
  const locations = locationsData?.data || [];

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const [updateProfile, { isLoading: isUpdating }] = useUpdateManagerProfileMutation();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");
  const [actionError, setActionError] = useState("");

  const managerName = manager?.name || `${manager?.firstName || ""} ${manager?.lastName || ""}`.trim() || "Operations Manager";
  const userInitials = manager?.name
    ? manager.name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "MG";

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Manager Profile</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => refetch()}
            title="Refresh Profile"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
            {unreadCount > 0 && (
              <div className="absolute top-0 right-0 w-4 h-4 bg-[#b45f06] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </div>
            )}
          </div>
          <div className="w-10 h-10 rounded-full bg-[#b45f06] flex items-center justify-center text-white font-bold text-sm">
            {userInitials}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1000px] mx-auto space-y-6 mt-4">
          {actionSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between text-emerald-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} />
                <span className="text-sm font-medium">{actionSuccess}</span>
              </div>
              <button onClick={() => setActionSuccess("")} className="text-emerald-600 hover:text-emerald-800 text-sm font-bold">✕</button>
            </div>
          )}

          {actionError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-2">
                <AlertCircle size={18} />
                <span className="text-sm font-medium">{actionError}</span>
              </div>
              <button onClick={() => setActionError("")} className="text-red-600 hover:text-red-800 text-sm font-bold">✕</button>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden relative">
            {/* Header Banner */}
            <div className="bg-[#233355] h-[160px] p-8 relative overflow-hidden flex justify-between items-start">
              <div className="relative z-10">
                <p className="text-[#8e9bb3] text-[10px] font-bold tracking-[0.15em] uppercase mb-1">AUTHORIZED PROFILE</p>
                <h2 className="text-white text-[28px] font-bold mb-1">{managerName}</h2>
                <p className="text-[#8e9bb3] text-[14px]">Operations Manager · {manager?.company?.companyName || "Security Services Ltd."}</p>
              </div>
              <button
                onClick={() => {
                  setName(manager?.name || `${manager?.firstName || ""} ${manager?.lastName || ""}`.trim());
                  setPhone(manager?.phone || "");
                  setActionError("");
                  setActionSuccess("");
                  setIsEditOpen(true);
                }}
                className="relative z-10 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
              >
                <Edit3 size={14} /> Edit Profile
              </button>
            </div>

            {/* Profile Avatar */}
            <div className="absolute top-[160px] left-8 -translate-y-1/2">
              <div className="w-24 h-24 rounded-2xl bg-[#f97316] border-4 border-white shadow-md flex items-center justify-center text-white font-bold text-[32px]">
                {userInitials}
              </div>
            </div>

            <div className="p-8 pt-16 grid grid-cols-2 gap-x-12 gap-y-8">
              <div className="border-b border-gray-100 pb-6">
                <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-2">WORK EMAIL</p>
                <p className="text-[#1a2642] font-semibold text-[14px]">{manager?.email || "—"}</p>
              </div>

              <div className="border-b border-gray-100 pb-6">
                <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-2">CONTACT PHONE</p>
                <p className="text-[#1a2642] font-semibold text-[14px]">{manager?.phone || "+31 6 1234 5678"}</p>
              </div>

              <div className="border-b border-gray-100 pb-6">
                <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-2">OPERATIONAL ROLE</p>
                <p className="text-[#1a2642] font-semibold text-[14px] capitalize">{manager?.role?.replace("_", " ") || "Manager"}</p>
              </div>

              <div className="border-b border-gray-100 pb-6">
                <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-2">ASSIGNED SITES</p>
                <p className="text-[#1a2642] font-semibold text-[14px]">
                  {locations.length > 0 ? `${locations.length} authorised locations` : "Company-wide Scope"}
                </p>
              </div>
            </div>

            {/* Authorized Locations List */}
            {locations.length > 0 && (
              <div className="p-8 pt-0">
                <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-3">Facility Locations Under Supervision:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {locations.map((loc: any) => (
                    <div key={loc._id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-2.5">
                      <MapPin size={16} className="text-[#f97316] shrink-0" />
                      <div>
                        <p className="font-semibold text-xs text-[#1a2642]">{loc.name}</p>
                        <p className="text-[11px] text-gray-400">{loc.address || "Active Facility Site"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[480px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-[#1a2642] font-bold text-base">Edit Manager Profile</h3>
                <p className="text-gray-400 text-xs mt-0.5">Update personal details</p>
              </div>
              <button onClick={() => setIsEditOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">
                ✕
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!name.trim()) {
                  setActionError("Name cannot be empty.");
                  return;
                }
                try {
                  await updateProfile({
                    name: name.trim(),
                    phone: phone.trim() || undefined,
                  }).unwrap();
                  setActionSuccess("Profile updated successfully!");
                  setIsEditOpen(false);
                  refetch();
                } catch (err: any) {
                  setActionError(err?.data?.message || "Failed to update profile.");
                }
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#b45f06]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+31 6 1234 5678"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#b45f06]"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 bg-[#b45f06] hover:bg-[#964f05] text-white rounded-lg text-xs font-semibold shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
