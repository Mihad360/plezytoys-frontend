"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, ArrowRight, X, RefreshCw, AlertCircle } from "lucide-react";
import { useGetAnnouncementsQuery, useMarkAnnouncementAsReadMutation } from "@/redux/api/employeeApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function EmployeeAnnouncementsPage() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any | null>(null);

  const {
    data: announcementsData,
    isLoading: isAnnouncementsLoading,
    isError: isAnnouncementsError,
    refetch: refetchAnnouncements,
  } = useGetAnnouncementsQuery();

  const [markAsRead] = useMarkAnnouncementAsReadMutation();

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const announcements = announcementsData?.data || [];

  const handleOpenAnnouncement = (ann: any) => {
    setSelectedAnnouncement(ann);
    if (ann._id) {
      markAsRead(ann._id);
    }
  };

  const getPriorityBadge = (priority: string) => {
    const p = (priority || "").toLowerCase();
    if (p === "urgent" || p === "critical") {
      return { label: "Urgent", className: "bg-red-50 text-red-700" };
    }
    if (p === "important" || p === "high") {
      return { label: "Important", className: "bg-amber-50 text-amber-700" };
    }
    if (p === "update") {
      return { label: "Update", className: "bg-orange-50 text-[#f97316]" };
    }
    return { label: "Notice", className: "bg-blue-50 text-blue-600" };
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">
            SHIFTPOINT • EMPLOYEE
          </p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Announcements</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetchAnnouncements()}
            title="Refresh Announcements"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isAnnouncementsLoading ? "animate-spin" : ""} />
          </button>
          <Link href="/employee/notifications" className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#f97316] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
          </Link>
          <Link href="/employee/profile">
            <div className="w-10 h-10 rounded-full bg-[#f97316] hover:bg-[#e06511] cursor-pointer flex items-center justify-center text-white font-bold text-sm transition-colors">
              EM
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto space-y-6 mt-4">
          {/* Error Banner */}
          {isAnnouncementsError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to retrieve company announcements.</p>
              </div>
              <button
                onClick={() => refetchAnnouncements()}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Announcements</h2>
            <p className="text-gray-500 text-[14px]">
              Service notices and operational updates shared with your organisation.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-2">
            {isAnnouncementsLoading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-gray-50 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : announcements.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <p className="font-semibold text-[#1a2642] mb-1">No Active Announcements</p>
                <p className="text-sm">There are no operational notices published at this moment.</p>
              </div>
            ) : (
              announcements.map((ann: any) => {
                const dateStr = new Date(ann.publishedAt || ann.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
                const badge = getPriorityBadge(ann.priority || "notice");

                return (
                  <div
                    key={ann._id}
                    onClick={() => handleOpenAnnouncement(ann)}
                    className="p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group flex justify-between items-start last:border-0 rounded-lg"
                  >
                    <div className="flex gap-4">
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-full h-fit shrink-0 ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                      <div>
                        <h3 className="text-[#1a2642] text-[15px] font-bold mb-1 group-hover:text-[#f97316] transition-colors">
                          {ann.title}
                        </h3>
                        <p className="text-gray-500 text-[13px] mb-3 line-clamp-2 leading-relaxed">
                          {ann.content}
                        </p>
                        <p className="text-gray-400 text-[11px]">{dateStr}</p>
                      </div>
                    </div>
                    <span className="text-[#f97316] text-[12px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-4">
                      Details <ArrowRight size={12} />
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* DETAIL MODAL */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[700px] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start p-8 pb-4 border-b-0">
              <div>
                <p className="text-[#f97316] text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                  ANNOUNCEMENT NOTICE
                </p>
                <h3 className="text-[#1a2642] text-[24px] font-bold">{selectedAnnouncement.title}</h3>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">STATUS</p>
                  <p className="text-[#1a2642] text-[14px]">
                    {selectedAnnouncement.isActive ? "Published" : "Archived"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">AUDIENCE</p>
                  <p className="text-[#1a2642] text-[14px] capitalize">
                    {selectedAnnouncement.targetRoles?.join(", ") || "All employees"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">PUBLISHED</p>
                  <p className="text-[#1a2642] text-[14px]">
                    {new Date(
                      selectedAnnouncement.publishedAt || selectedAnnouncement.createdAt
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                  <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-1">PRIORITY</p>
                  <p className="text-[#1a2642] text-[14px] capitalize">
                    {selectedAnnouncement.priority || "Normal"}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                <p className="text-gray-400 text-[10px] font-bold tracking-wide uppercase mb-2">MESSAGE</p>
                <p className="text-[#1a2642] text-[14px] leading-relaxed whitespace-pre-wrap">
                  {selectedAnnouncement.content}
                </p>
              </div>

              {selectedAnnouncement.createdBy && (
                <div className="pt-2 text-xs text-gray-500">
                  Published by {selectedAnnouncement.createdBy.firstName}{" "}
                  {selectedAnnouncement.createdBy.lastName || ""}
                </div>
              )}
            </div>

            <div className="p-8 pt-6 flex justify-end">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors shadow-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
