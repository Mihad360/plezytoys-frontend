"use client";

import { Bell, RefreshCw, AlertCircle, Megaphone, Calendar, Plus, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  useGetManagerAnnouncementsQuery,
  useGetManagerLocationsQuery,
  useCreateAnnouncementMutation,
} from "@/redux/api/managerApi";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function ManagerAnnouncementsPage() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [target, setTarget] = useState<"all" | "managers" | "employees">("all");
  const [actionSuccess, setActionSuccess] = useState("");
  const [actionError, setActionError] = useState("");

  const { data: profileData } = useGetMyProfileQuery(undefined);
  const manager = profileData?.data;

  const { data: locationsData } = useGetManagerLocationsQuery();

  const [createAnnouncement, { isLoading: isCreating }] = useCreateAnnouncementMutation();


  const {
    data: announcementsData,
    isLoading,
    isError,
    refetch,
  } = useGetManagerAnnouncementsQuery();

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const announcements = announcementsData?.data || [];

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
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Company Announcements</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => refetch()}
            title="Refresh Announcements"
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
          <Link href="/manager/profile">
            <div className="w-10 h-10 rounded-full bg-[#b45f06] flex items-center justify-center text-white font-bold text-sm cursor-pointer">
              {userInitials}
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto space-y-6 mt-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Operational Bulletins</h2>
              <p className="text-gray-500 text-[14px]">Authorized operational notices broadcasted to facility teams.</p>
            </div>
            <button
              onClick={() => {
                setActionError("");
                setActionSuccess("");
                setIsCreateOpen(true);
              }}
              className="px-4 py-2 bg-[#b45f06] hover:bg-[#964f05] text-white rounded-lg text-[13px] font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus size={16} /> Broadcast Bulletin
            </button>
          </div>

          {actionSuccess && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between text-emerald-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} />
                <span className="text-sm font-medium">{actionSuccess}</span>
              </div>
              <button onClick={() => setActionSuccess("")} className="text-emerald-600 hover:text-emerald-800 text-sm font-bold">✕</button>
            </div>
          )}

          {actionError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-2">
                <AlertCircle size={18} />
                <span className="text-sm font-medium">{actionError}</span>
              </div>
              <button onClick={() => setActionError("")} className="text-red-600 hover:text-red-800 text-sm font-bold">✕</button>
            </div>
          )}

          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to retrieve company announcements.</p>
              </div>
              <button
                onClick={() => refetch()}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
              >
                Retry
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
              <RefreshCw size={24} className="mx-auto mb-2 animate-spin text-[#f97316]" />
              <p className="text-sm font-medium">Loading operational updates...</p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
              <Megaphone size={36} className="mx-auto mb-2 text-gray-300" />
              <p className="font-semibold text-gray-600">No announcements posted yet.</p>
              <p className="text-xs text-gray-400 mt-1">All broadcasted updates will be shown here.</p>
            </div>
          ) : (
            announcements.map((ann: any) => {
              const dateFormatted = new Date(ann.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

              return (
                <div key={ann._id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:border-gray-200 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-orange-50 text-orange-700 uppercase">
                        {ann.priority || "Normal"}
                      </span>
                      <h3 className="text-[#1a2642] font-bold text-[16px]">{ann.title}</h3>
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar size={13} /> {dateFormatted}
                    </span>
                  </div>
                  <p className="text-gray-600 text-[14px] mb-4">{ann.content || ann.message}</p>
                  <button
                    onClick={() => setSelectedAnnouncement(ann)}
                    className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-700 hover:bg-gray-50 shadow-sm cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Announcement Details Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[550px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-[#1a2642] font-bold text-base">{selectedAnnouncement.title}</h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  Published: {new Date(selectedAnnouncement.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
              <button onClick={() => setSelectedAnnouncement(null)} className="text-gray-400 hover:text-gray-600 text-lg">
                ✕
              </button>
            </div>
            <div className="p-6 text-sm text-gray-700 leading-relaxed bg-gray-50/50 whitespace-pre-wrap">
              {selectedAnnouncement.content || selectedAnnouncement.message}
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-5 py-2 bg-[#1a2642] hover:bg-[#233355] text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Announcement Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[560px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-[#1a2642] font-bold text-base">Broadcast Operational Bulletin</h3>
                <p className="text-gray-400 text-xs mt-0.5">Publish an urgent bulletin or update to staff</p>
              </div>
              <button onClick={() => setIsCreateOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">
                ✕
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!title.trim() || !content.trim()) {
                  setActionError("Please provide both title and content.");
                  return;
                }
                try {
                  await createAnnouncement({
                    title: title.trim(),
                    content: content.trim(),
                    target,
                  }).unwrap();
                  setActionSuccess("Bulletin broadcasted successfully!");
                  setIsCreateOpen(false);
                  setTitle("");
                  setContent("");
                  setTarget("all");
                } catch (err: any) {
                  setActionError(err?.data?.message || "Failed to broadcast bulletin.");
                }
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Bulletin Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Mandatory Weekend Shift Protocol Update"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#b45f06]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Audience Target</label>
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none cursor-pointer"
                >
                  <option value="all">Entire Facility Staff (All)</option>
                  <option value="employees">Field Officers / Employees Only</option>
                  <option value="managers">Supervisory Staff (Managers Only)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Bulletin Details / Message *</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Specify protocol changes, emergency directives, or operational instructions..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#b45f06]"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-5 py-2 bg-[#b45f06] hover:bg-[#964f05] text-white rounded-lg text-xs font-semibold shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isCreating ? "Broadcasting..." : "Broadcast Bulletin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
