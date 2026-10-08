"use client";

import Link from "next/link";
import { Bell, ArrowRight, RefreshCw, AlertCircle, Check } from "lucide-react";
import {
  useGetMyNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
} from "@/redux/api/notificationApi";

export default function EmployeeNotificationsPage() {
  const {
    data: notifsData,
    isLoading: isNotifsLoading,
    isError: isNotifsError,
    refetch: refetchNotifs,
  } = useGetMyNotificationsQuery(undefined);

  const {
    data: unreadCountData,
    refetch: refetchUnreadCount,
  } = useGetUnreadCountQuery(undefined);

  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllAsRead, { isLoading: isMarkingAll }] = useMarkAllNotificationsAsReadMutation();

  const notifications = notifsData?.data || [];
  const unreadCount = unreadCountData?.data?.unreadCount ?? 0;

  const handleRefresh = () => {
    refetchNotifs();
    refetchUnreadCount();
  };

  const handleNotificationClick = async (notif: any) => {
    if (!notif.isRead && notif._id) {
      try {
        await markAsRead(notif._id).unwrap();
        refetchUnreadCount();
      } catch (err) {
        console.error("Failed to mark notification as read", err);
      }
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead(undefined).unwrap();
      refetchNotifs();
      refetchUnreadCount();
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  const getDestinationLink = (type?: string) => {
    const t = (type || "").toLowerCase();
    if (t === "report") return "/employee/reports";
    if (t === "patrol") return "/employee/patrols";
    if (t === "shift") return "/employee/schedule";
    if (t === "announcement") return "/employee/announcements";
    return "/employee";
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">
            SHIFTPOINT • EMPLOYEE
          </p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Notifications</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            title="Refresh Notifications"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isNotifsLoading ? "animate-spin" : ""} />
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 bg-gray-50 transition-colors">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#f97316] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
          </div>
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
          {isNotifsError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to retrieve notification alerts.</p>
              </div>
              <button
                onClick={handleRefresh}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Notifications</h2>
              <p className="text-gray-500 text-[14px]">
                Keep up to date with activity and shared Employee updates.
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                disabled={isMarkingAll}
                className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <Check size={14} className="text-emerald-600" />
                Mark all as read
              </button>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-2">
            {isNotifsLoading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-gray-50 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <Bell size={36} className="mx-auto mb-2 text-gray-300" />
                <p className="font-semibold text-[#1a2642] mb-1">No Notifications</p>
                <p className="text-sm">You have no new alerts or notifications.</p>
              </div>
            ) : (
              notifications.map((notif: any) => {
                const dateStr = new Date(notif.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const linkHref = getDestinationLink(notif.type);

                return (
                  <Link
                    key={notif._id}
                    href={linkHref}
                    onClick={() => handleNotificationClick(notif)}
                    className="block p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors group last:border-0 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div
                          className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${
                            !notif.isRead ? "bg-[#f97316]" : "bg-gray-300"
                          }`}
                        ></div>
                        <div>
                          <h3
                            className={`text-[15px] mb-1 group-hover:text-[#f97316] transition-colors ${
                              !notif.isRead ? "text-[#1a2642] font-bold" : "text-gray-700 font-semibold"
                            }`}
                          >
                            {notif.title}
                          </h3>
                          <p className="text-gray-500 text-[13px] mb-2 leading-relaxed">{notif.message}</p>
                          <p className="text-gray-400 text-[11px]">{dateStr}</p>
                        </div>
                      </div>
                      <span className="text-[#f97316] text-[12px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-4">
                        View <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
