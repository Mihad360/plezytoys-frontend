"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, RefreshCw, AlertCircle, Save, Check } from "lucide-react";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetEmployeeHomeSummaryQuery, useUpdateEmployeeProfileMutation } from "@/redux/api/employeeApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function EmployeeProfilePage() {
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
    refetch: refetchProfile,
  } = useGetMyProfileQuery(undefined);

  const {
    data: summaryData,
    refetch: refetchSummary,
  } = useGetEmployeeHomeSummaryQuery();

  const [updateProfile, { isLoading: isUpdating }] = useUpdateEmployeeProfileMutation();
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const user = profileData?.data || summaryData?.data?.employee;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState({
    reports: true,
    patrolActivity: true,
    announcements: true,
  });

  useEffect(() => {
    if (user) {
      setFullName(user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Employee");
      setPhone(user.phone || "");
      if (user.notificationPreferences) {
        setNotifications({
          reports: user.notificationPreferences.newReports ?? true,
          patrolActivity: user.notificationPreferences.patrolActivity ?? true,
          announcements: user.notificationPreferences.announcements ?? true,
        });
      }
      if (user.languagePreference) {
        setLanguage(user.languagePreference === "nl" ? "Dutch" : "English");
      }
    }
  }, [user]);

  const toggleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = async () => {
    try {
      setSaveSuccess(false);
      await updateProfile({
        name: fullName,
        phone,
        languagePreference: language === "Dutch" ? "nl" : "en",
        notificationPreferences: {
          newReports: notifications.reports,
          patrolActivity: notifications.patrolActivity,
          announcements: notifications.announcements,
        },
      }).unwrap();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      refetchProfile();
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  const handleRefresh = () => {
    refetchProfile();
    refetchSummary();
  };

  const initials =
    user?.initials ||
    `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase() ||
    (fullName ? fullName.slice(0, 2).toUpperCase() : "EM");

  const companyName =
    typeof user?.company === "object"
      ? user.company?.companyName || user.company?.name
      : user?.assignedCustomer?.companyName || "Assigned Company";

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">
            SHIFTPOINT • EMPLOYEE
          </p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Employee Profile</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            title="Refresh Profile"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isProfileLoading ? "animate-spin" : ""} />
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
          <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center text-white font-bold text-sm overflow-hidden">
            {user?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              initials
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto space-y-6 mt-4">
          {isProfileError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to retrieve latest user profile record.</p>
              </div>
              <button
                onClick={handleRefresh}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          <div className="mb-6">
            <p className="text-[#f97316] text-[11px] font-bold tracking-[0.1em] uppercase mb-1">
              EMPLOYEE PORTAL / PROFILE
            </p>
            <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">Profile</h2>
            <p className="text-gray-500 text-[14px]">
              View your personal portal settings. Organisation, access, and company details are managed by your administrator.
            </p>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-700 text-[13px] mb-8">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 mt-0.5"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <p>You can review and update your own personal details, language and notification preferences.</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Col: Avatar Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center h-fit">
              <div className="w-24 h-24 rounded-full bg-[#f97316] text-white flex items-center justify-center text-[28px] font-bold mb-4 shadow-sm overflow-hidden">
                {user?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <h3 className="text-[#1a2642] text-[18px] font-bold mb-1">{fullName || "Employee"}</h3>
              <p className="text-gray-400 text-[13px] mb-2">{user?.email || "—"}</p>
              {user?.employeeId && (
                <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-mono mb-6">
                  ID: {user.employeeId}
                </span>
              )}

              <p className="text-gray-400 text-[11px] text-center max-w-[200px] mt-4">
                Your login email is managed by your organization administrator.
              </p>
            </div>

            {/* Right Col: Personal Details & Settings */}
            <div className="col-span-2 space-y-6">
              {/* Personal Details */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Personal details</h3>
                <p className="text-gray-400 text-[12px] mb-6">
                  Information visible on your Employee portal profile
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-500 text-[12px] font-semibold mb-2">Full name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-[#f97316] shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[12px] font-semibold mb-2">Phone number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+31 6 1234 5678"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-[#f97316] shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[12px] font-semibold mb-2">
                      Language preference
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-[#f97316] shadow-sm bg-white"
                    >
                      <option>English</option>
                      <option>Dutch</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[12px] font-semibold mb-2">
                      Assigned Organisation
                    </label>
                    <div className="w-full px-4 py-2 bg-gray-50 border border-gray-200 border-dashed rounded-lg">
                      <p className="text-[#1a2642] text-[13px] font-bold">{companyName}</p>
                      <p className="text-gray-400 text-[11px]">Managed by Company Administrator</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-[#1a2642] text-[16px] font-bold mb-1">Personal notification preferences</h3>
                <p className="text-gray-400 text-[12px] mb-6">Choose which personal portal updates you receive</p>

                <div className="space-y-0">
                  <div className="flex justify-between items-center py-4 border-t border-gray-100">
                    <div>
                      <p className="text-gray-800 text-[13px] font-medium">New reports</p>
                      <p className="text-gray-400 text-[11px]">Receive updates when reports are submitted or approved</p>
                    </div>
                    <button
                      onClick={() => toggleToggle("reports")}
                      className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${
                        notifications.reports ? "bg-[#f97316]" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-transform ${
                          notifications.reports ? "translate-x-[22px]" : "translate-x-1"
                        }`}
                      ></div>
                    </button>
                  </div>

                  <div className="flex justify-between items-center py-4 border-t border-gray-100">
                    <div>
                      <p className="text-gray-800 text-[13px] font-medium">Patrol activity</p>
                      <p className="text-gray-400 text-[11px]">Receive updates on assigned route starts and completions</p>
                    </div>
                    <button
                      onClick={() => toggleToggle("patrolActivity")}
                      className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${
                        notifications.patrolActivity ? "bg-[#f97316]" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-transform ${
                          notifications.patrolActivity ? "translate-x-[22px]" : "translate-x-1"
                        }`}
                      ></div>
                    </button>
                  </div>

                  <div className="flex justify-between items-center py-4 border-t border-gray-100">
                    <div>
                      <p className="text-gray-800 text-[13px] font-medium">Announcements</p>
                      <p className="text-gray-400 text-[11px]">Stay informed on critical company operational notices</p>
                    </div>
                    <button
                      onClick={() => toggleToggle("announcements")}
                      className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${
                        notifications.announcements ? "bg-[#f97316]" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-transform ${
                          notifications.announcements ? "translate-x-[22px]" : "translate-x-1"
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>

                {/* Save Changes Button */}
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  {saveSuccess ? (
                    <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold">
                      <Check size={16} /> Profile changes saved successfully
                    </div>
                  ) : (
                    <p className="text-gray-400 text-[11px]">Settings sync automatically with your mobile app</p>
                  )}
                  <button
                    onClick={handleSaveProfile}
                    disabled={isUpdating}
                    className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] disabled:opacity-50 text-white rounded-lg text-[13px] font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Save size={15} />
                    {isUpdating ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
