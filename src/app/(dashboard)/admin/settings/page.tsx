"use client";

import { useState, useEffect, useRef } from "react";
import {
  Bell,
  RefreshCw,
  Upload,
  Check,
  AlertCircle,
  FileText,
  Sliders,
  Shield,
  Lock,
  Globe,
  Server,
  Image as ImageIcon,
} from "lucide-react";
import {
  useGetSystemSettingsQuery,
  useUpdateSystemSettingsMutation,
} from "@/redux/api/superAdminApi";
import { toast } from "sonner";

const TABS = ["Platform", "Security", "Authentication", "Notifications", "Data", "Modules"];

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState("Platform");
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [pendingModuleToggle, setPendingModuleToggle] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string>("");

  const { data: response, isLoading, isError, refetch } = useGetSystemSettingsQuery(undefined);
  const [updateSettings, { isLoading: isUpdating }] = useUpdateSystemSettingsMutation();

  const settings = response?.data;

  // Tab 1: Platform State
  const [platformForm, setPlatformForm] = useState({
    platformName: "SHIFTPOINT",
    supportEmail: "support@shiftpoint.io",
    termsUrl: "https://shiftpoint.io/terms",
    privacyUrl: "https://shiftpoint.io/privacy",
    defaultLanguage: "English",
    defaultCurrency: "EUR (€)",
    timezone: "Europe/Amsterdam (CET)",
    dateTimeFormat: "DD/MM/YYYY · 24-hour",
    logoUrl: "",
    maintenanceMode: false,
  });

  // Tab 2: Security State
  const [securityForm, setSecurityForm] = useState({
    require2faForAdmins: true,
    ipAllowlisting: false,
    sessionTimeoutMinutes: 30,
    auditLoggingAllActions: true,
    passwordComplexityEnforced: true,
  });

  // Tab 3: Authentication State
  const [authForm, setAuthForm] = useState({
    mandatoryAdmin2fa: false,
    employeeBiometricUnlock: false,
    supportedLoginMethod: "Email address or mobile phone number",
    tokenLifetimeMinutes: 1440,
    adminInactivityTimeoutMinutes: 30,
    employeeAppInactivityLockMinutes: 5,
  });

  // Tab 4: Notifications State
  const [notificationsForm, setNotificationsForm] = useState({
    triggers: {
      newCompanyRegistrations: true,
      paymentsReceived: true,
      failedPayments: true,
      subscriptionPilotExpiry: true,
      supportTickets: true,
      securityAlerts: true,
      expiringEmployeeDocuments: true,
      missedTasks: true,
      missedNfcCheckpoints: true,
    },
    channels: {
      inApp: true,
      push: true,
      email: true,
    },
  });

  // Tab 5: Data State
  const [dataForm, setDataForm] = useState({
    companyDataRetentionYears: 7,
    backupRetentionDays: 90,
    dataStorageRegion: "EU only — Amsterdam region",
    backupStatus: "Healthy",
    lastBackupTime: "08:30",
  });

  // Tab 6: Modules State
  const [modulesForm, setModulesForm] = useState({
    enabledModules: {
      employees: true,
      customers: true,
      locations: true,
      gpsClockInOut: true,
      nfcPatrols: true,
      tasksChecklists: true,
      reportsIncidents: true,
      documentsCertificates: true,
      notifications: true,
      aiAssistant: false,
      customerGuestPortal: true,
    },
    assignedSector: "All sectors",
    assignedSubscriptionPlan: "All plans",
  });

  // Populate from API
  useEffect(() => {
    if (settings) {
      if (settings.platform) {
        setPlatformForm((prev) => ({
          ...prev,
          ...settings.platform,
        }));
      }
      if (settings.security) {
        setSecurityForm((prev) => ({
          ...prev,
          ...settings.security,
        }));
      }
      if (settings.authentication) {
        setAuthForm((prev) => ({
          ...prev,
          ...settings.authentication,
        }));
      }
      if (settings.notifications) {
        setNotificationsForm((prev) => ({
          triggers: { ...prev.triggers, ...(settings.notifications.triggers || {}) },
          channels: { ...prev.channels, ...(settings.notifications.channels || {}) },
        }));
      }
      if (settings.data) {
        setDataForm((prev) => ({
          ...prev,
          ...settings.data,
        }));
      }
      if (settings.modules) {
        setModulesForm((prev) => ({
          ...prev,
          ...settings.modules,
          enabledModules: {
            ...prev.enabledModules,
            ...(settings.modules.enabledModules || {}),
          },
        }));
      }
    }
  }, [settings]);

  // Handle Logo File Selection
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, SVG, WebP)");
      return;
    }

    setSelectedLogoFile(file);
    const localUrl = URL.createObjectURL(file);
    setLogoPreviewUrl(localUrl);
    toast.success(`Selected "${file.name}". Click "Save Changes" to update.`);
  };

  // Generic Save Handler for each Tab
  const handleSaveTab = async (tabName: string) => {
    try {
      let payload: any;
      if (tabName === "Platform") {
        if (selectedLogoFile) {
          const formData = new FormData();
          formData.append("image", selectedLogoFile);
          formData.append("data", JSON.stringify({ platform: platformForm }));
          payload = formData;
        } else {
          payload = { platform: platformForm };
        }
      } else if (tabName === "Security") {
        payload = { security: securityForm };
      } else if (tabName === "Authentication") {
        payload = { authentication: authForm };
      } else if (tabName === "Notifications") {
        payload = { notifications: notificationsForm };
      } else if (tabName === "Data") {
        payload = { data: dataForm };
      } else if (tabName === "Modules") {
        payload = { modules: modulesForm };
      }

      const res: any = await updateSettings(payload).unwrap();
      toast.success(res?.message || `${tabName} settings saved successfully!`);
      if (tabName === "Platform" && selectedLogoFile) {
        setSelectedLogoFile(null);
        setLogoPreviewUrl("");
      }
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || `Failed to update ${tabName} settings`);
    }
  };

  // Helper toggle component
  const ToggleRow = ({
    label,
    sublabel = "",
    checked = false,
    onToggle = () => {},
  }: {
    label: string;
    sublabel?: string;
    checked: boolean;
    onToggle: () => void;
  }) => (
    <div className="flex items-center justify-between py-5 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-[#1a2642] text-[14px] font-semibold">{label}</p>
        {sublabel && <p className="text-gray-400 text-[12px] mt-1">{sublabel}</p>}
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors shrink-0 ${
          checked ? "bg-[#f97316]" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-[22px]" : "translate-x-[3px]"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Hidden file input for logo replacement */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleLogoFileChange}
        className="hidden"
      />

      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">System Settings</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            title="Refresh settings"
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
        <div className="max-w-[850px]">
          <div className="mb-6">
            <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">System Settings</h2>
            <p className="text-gray-500 text-[14px]">
              Configure platform defaults, security controls and governance.
            </p>
          </div>

          {/* Error Banner */}
          {isError && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
              <AlertCircle size={20} />
              <div className="flex-1">
                <p className="font-semibold text-sm">Failed to load system settings</p>
                <p className="text-xs text-red-600">Please check connection or retry.</p>
              </div>
              <button
                onClick={() => refetch()}
                className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          )}

          {/* Tabs */}
          <div className="flex items-center p-1 bg-white border border-gray-200 rounded-lg w-fit mb-8 shadow-sm">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-[13px] font-medium rounded-md transition-colors ${
                  activeTab === tab
                    ? "bg-[#1a2642] text-white"
                    : "text-gray-500 hover:text-[#1a2642] hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
              <RefreshCw className="animate-spin text-[#f97316] mx-auto mb-3" size={28} />
              <p className="text-gray-500 font-medium">Loading system settings...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: PLATFORM */}
              {activeTab === "Platform" && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-6">
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        PLATFORM NAME
                      </label>
                      <input
                        type="text"
                        value={platformForm.platformName}
                        onChange={(e) =>
                          setPlatformForm({ ...platformForm, platformName: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        SUPPORT EMAIL
                      </label>
                      <input
                        type="email"
                        value={platformForm.supportEmail}
                        onChange={(e) =>
                          setPlatformForm({ ...platformForm, supportEmail: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        TERMS & CONDITIONS URL
                      </label>
                      <input
                        type="text"
                        value={platformForm.termsUrl}
                        onChange={(e) =>
                          setPlatformForm({ ...platformForm, termsUrl: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        PRIVACY POLICY URL
                      </label>
                      <input
                        type="text"
                        value={platformForm.privacyUrl}
                        onChange={(e) =>
                          setPlatformForm({ ...platformForm, privacyUrl: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        DEFAULT LANGUAGE
                      </label>
                      <select
                        value={platformForm.defaultLanguage}
                        onChange={(e) =>
                          setPlatformForm({ ...platformForm, defaultLanguage: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316] bg-white"
                      >
                        <option value="English">English</option>
                        <option value="Dutch">Dutch (Nederlands)</option>
                        <option value="German">German (Deutsch)</option>
                        <option value="French">French (Français)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        DEFAULT CURRENCY
                      </label>
                      <select
                        value={platformForm.defaultCurrency}
                        onChange={(e) =>
                          setPlatformForm({ ...platformForm, defaultCurrency: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316] bg-white"
                      >
                        <option value="EUR (€)">EUR (€)</option>
                        <option value="USD ($)">USD ($)</option>
                        <option value="GBP (£)">GBP (£)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        TIMEZONE
                      </label>
                      <select
                        value={platformForm.timezone}
                        onChange={(e) =>
                          setPlatformForm({ ...platformForm, timezone: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316] bg-white"
                      >
                        <option value="Europe/Amsterdam (CET)">Europe/Amsterdam (CET)</option>
                        <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                        <option value="America/New_York (EST)">America/New_York (EST)</option>
                        <option value="Asia/Dubai (GST)">Asia/Dubai (GST)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        DATE & TIME FORMAT
                      </label>
                      <select
                        value={platformForm.dateTimeFormat}
                        onChange={(e) =>
                          setPlatformForm({ ...platformForm, dateTimeFormat: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316] bg-white"
                      >
                        <option value="DD/MM/YYYY · 24-hour">DD/MM/YYYY · 24-hour</option>
                        <option value="MM/DD/YYYY · 12-hour">MM/DD/YYYY · 12-hour</option>
                        <option value="YYYY-MM-DD · 24-hour">YYYY-MM-DD · 24-hour</option>
                      </select>
                    </div>
                  </div>

                  {/* Logo Upload Replacement Section */}
                  <div className="border border-dashed border-gray-300 rounded-xl p-6 mb-8 text-center bg-gray-50/50">
                    <p className="text-[#1a2642] font-semibold text-[14px] mb-1">
                      Platform Logo & Branding
                    </p>
                    {logoPreviewUrl || platformForm.logoUrl ? (
                      <div className="my-4 flex flex-col items-center justify-center">
                        <img
                          src={logoPreviewUrl || platformForm.logoUrl}
                          alt="Platform Logo"
                          className="h-16 max-w-[240px] object-contain border border-gray-200 rounded-lg p-2 bg-white shadow-xs"
                        />
                        <p className="text-xs text-green-600 mt-2 font-medium">
                          {logoPreviewUrl ? "Selected replacement (click Save Changes to apply)" : "Active custom logo installed"}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-400 text-[13px] mb-3">
                        SHIFTPOINT Version 2 default logo is currently active.
                      </p>
                    )}
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 text-[#f97316] font-medium text-[13px] hover:underline disabled:opacity-50 cursor-pointer"
                    >
                      <Upload size={14} className={isUpdating ? "animate-bounce" : ""} />
                      {selectedLogoFile ? "Choose different file" : "Upload replacement"}
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => handleSaveTab("Platform")}
                    className="bg-[#f97316] hover:bg-[#e06511] disabled:opacity-50 text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}

              {/* TAB 2: SECURITY */}
              {activeTab === "Security" && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-2">
                  <ToggleRow
                    label="Require 2FA for all admin accounts"
                    sublabel="Super Admin and company administrators must verify via secondary code."
                    checked={securityForm.require2faForAdmins}
                    onToggle={() =>
                      setSecurityForm({
                        ...securityForm,
                        require2faForAdmins: !securityForm.require2faForAdmins,
                      })
                    }
                  />
                  <ToggleRow
                    label="IP allowlist enforcement"
                    sublabel="Restrict Super Admin console logins to approved enterprise IP addresses."
                    checked={securityForm.ipAllowlisting}
                    onToggle={() =>
                      setSecurityForm({
                        ...securityForm,
                        ipAllowlisting: !securityForm.ipAllowlisting,
                      })
                    }
                  />
                  <ToggleRow
                    label="Session timeout after inactivity"
                    sublabel="Automatically invalidate sessions after 30 minutes of idle status."
                    checked={securityForm.sessionTimeoutMinutes > 0}
                    onToggle={() =>
                      setSecurityForm({
                        ...securityForm,
                        sessionTimeoutMinutes: securityForm.sessionTimeoutMinutes > 0 ? 0 : 30,
                      })
                    }
                  />
                  <ToggleRow
                    label="Audit logging for all actions"
                    sublabel="Record mutation ledger entries for security, billing, and permission edits."
                    checked={securityForm.auditLoggingAllActions}
                    onToggle={() =>
                      setSecurityForm({
                        ...securityForm,
                        auditLoggingAllActions: !securityForm.auditLoggingAllActions,
                      })
                    }
                  />
                  <ToggleRow
                    label="Password complexity enforcement"
                    sublabel="Require minimum 8 characters with lowercase, uppercase, and special symbols."
                    checked={securityForm.passwordComplexityEnforced}
                    onToggle={() =>
                      setSecurityForm({
                        ...securityForm,
                        passwordComplexityEnforced: !securityForm.passwordComplexityEnforced,
                      })
                    }
                  />

                  <div className="py-6">
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleSaveTab("Security")}
                      className="bg-[#f97316] hover:bg-[#e06511] disabled:opacity-50 text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: AUTHENTICATION */}
              {activeTab === "Authentication" && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                  <div className="mb-8">
                    <ToggleRow
                      label="Mandatory administrator 2FA"
                      sublabel="All Super Admin and administrator accounts must use two-factor authentication."
                      checked={authForm.mandatoryAdmin2fa}
                      onToggle={() =>
                        setAuthForm({
                          ...authForm,
                          mandatoryAdmin2fa: !authForm.mandatoryAdmin2fa,
                        })
                      }
                    />
                    <ToggleRow
                      label="Employee biometric unlock"
                      sublabel="After first sign-in, employees can enable Face ID or fingerprint access in the mobile app."
                      checked={authForm.employeeBiometricUnlock}
                      onToggle={() =>
                        setAuthForm({
                          ...authForm,
                          employeeBiometricUnlock: !authForm.employeeBiometricUnlock,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-6 mb-8">
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        SUPPORTED LOGIN & VERIFICATION
                      </label>
                      <select
                        value={authForm.supportedLoginMethod}
                        onChange={(e) =>
                          setAuthForm({ ...authForm, supportedLoginMethod: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316] bg-white"
                      >
                        <option value="Email address or mobile phone number">
                          Email address or mobile phone number
                        </option>
                        <option value="Email address only">Email address only</option>
                        <option value="SSO / Google Workspace">SSO / Google Workspace</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        TOKEN LIFETIME (MINUTES)
                      </label>
                      <input
                        type="number"
                        value={authForm.tokenLifetimeMinutes}
                        onChange={(e) =>
                          setAuthForm({
                            ...authForm,
                            tokenLifetimeMinutes: parseInt(e.target.value, 10) || 1440,
                          })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        ADMINISTRATOR INACTIVITY TIMEOUT (MINUTES)
                      </label>
                      <input
                        type="number"
                        value={authForm.adminInactivityTimeoutMinutes}
                        onChange={(e) =>
                          setAuthForm({
                            ...authForm,
                            adminInactivityTimeoutMinutes: parseInt(e.target.value, 10) || 30,
                          })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        EMPLOYEE MOBILE APP INACTIVITY LOCK (MINUTES)
                      </label>
                      <input
                        type="number"
                        value={authForm.employeeAppInactivityLockMinutes}
                        onChange={(e) =>
                          setAuthForm({
                            ...authForm,
                            employeeAppInactivityLockMinutes: parseInt(e.target.value, 10) || 5,
                          })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 text-[#1e40af] text-[13px] leading-relaxed mb-8">
                    These are independent security settings: the {authForm.tokenLifetimeMinutes}
                    -minute token lifetime does not change the{" "}
                    {authForm.adminInactivityTimeoutMinutes}-minute administrator timeout or the{" "}
                    {authForm.employeeAppInactivityLockMinutes}-minute employee mobile-app lock period.
                  </div>

                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => handleSaveTab("Authentication")}
                    className="bg-[#f97316] hover:bg-[#e06511] disabled:opacity-50 text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}

              {/* TAB 4: NOTIFICATIONS */}
              {activeTab === "Notifications" && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                  <p className="text-gray-400 text-[13px] mb-6">
                    Enable each notification and choose which platform channels receive it.
                  </p>

                  <div className="space-y-6">
                    {[
                      { key: "newCompanyRegistrations", label: "New company registrations" },
                      { key: "paymentsReceived", label: "Payments received" },
                      { key: "failedPayments", label: "Failed payments" },
                      { key: "subscriptionPilotExpiry", label: "Subscription & pilot expiry" },
                      { key: "supportTickets", label: "Support tickets" },
                      { key: "securityAlerts", label: "Security alerts" },
                      { key: "expiringEmployeeDocuments", label: "Expiring employee documents" },
                      { key: "missedTasks", label: "Missed tasks" },
                      { key: "missedNfcCheckpoints", label: "Missed NFC checkpoints" },
                    ].map((item) => {
                      const isEnabled = (notificationsForm.triggers as any)[item.key] !== false;
                      return (
                        <div
                          key={item.key}
                          className="pb-6 border-b border-gray-50 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <p className="text-[#1a2642] text-[14px] font-semibold">{item.label}</p>
                            <button
                              type="button"
                              onClick={() =>
                                setNotificationsForm({
                                  ...notificationsForm,
                                  triggers: {
                                    ...notificationsForm.triggers,
                                    [item.key]: !isEnabled,
                                  },
                                })
                              }
                              className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors ${
                                isEnabled ? "bg-[#f97316]" : "bg-gray-200"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  isEnabled ? "translate-x-[22px]" : "translate-x-[3px]"
                                }`}
                              />
                            </button>
                          </div>
                          <select className="w-[300px] px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-600 focus:outline-none bg-white">
                            <option>Recipients: Super Admins</option>
                            <option>Recipients: Admins & Managers</option>
                          </select>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-8 mt-8 mb-8 border-t border-gray-100 pt-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <button
                        type="button"
                        onClick={() =>
                          setNotificationsForm({
                            ...notificationsForm,
                            channels: {
                              ...notificationsForm.channels,
                              inApp: !notificationsForm.channels.inApp,
                            },
                          })
                        }
                        className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors ${
                          notificationsForm.channels.inApp ? "bg-[#f97316]" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notificationsForm.channels.inApp
                              ? "translate-x-[22px]"
                              : "translate-x-[3px]"
                          }`}
                        />
                      </button>
                      <span className="text-[13px] text-[#1a2642] font-semibold">
                        In-app notifications
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <button
                        type="button"
                        onClick={() =>
                          setNotificationsForm({
                            ...notificationsForm,
                            channels: {
                              ...notificationsForm.channels,
                              push: !notificationsForm.channels.push,
                            },
                          })
                        }
                        className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors ${
                          notificationsForm.channels.push ? "bg-[#f97316]" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notificationsForm.channels.push
                              ? "translate-x-[22px]"
                              : "translate-x-[3px]"
                          }`}
                        />
                      </button>
                      <span className="text-[13px] text-[#1a2642] font-semibold">
                        Push notifications
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <button
                        type="button"
                        onClick={() =>
                          setNotificationsForm({
                            ...notificationsForm,
                            channels: {
                              ...notificationsForm.channels,
                              email: !notificationsForm.channels.email,
                            },
                          })
                        }
                        className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors ${
                          notificationsForm.channels.email ? "bg-[#f97316]" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notificationsForm.channels.email
                              ? "translate-x-[22px]"
                              : "translate-x-[3px]"
                          }`}
                        />
                      </button>
                      <span className="text-[13px] text-[#1a2642] font-semibold">
                        Email notifications
                      </span>
                    </label>
                  </div>

                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => handleSaveTab("Notifications")}
                    className="bg-[#f97316] hover:bg-[#e06511] disabled:opacity-50 text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}

              {/* TAB 5: DATA */}
              {activeTab === "Data" && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        COMPANY DATA RETENTION
                      </label>
                      <select
                        value={dataForm.companyDataRetentionYears}
                        onChange={(e) =>
                          setDataForm({
                            ...dataForm,
                            companyDataRetentionYears: parseInt(e.target.value, 10) || 7,
                          })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none bg-white"
                      >
                        <option value={1}>1 year</option>
                        <option value={3}>3 years</option>
                        <option value={5}>5 years</option>
                        <option value={7}>7 years</option>
                        <option value={10}>10 years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        BACKUP RETENTION
                      </label>
                      <select
                        value={dataForm.backupRetentionDays}
                        onChange={(e) =>
                          setDataForm({
                            ...dataForm,
                            backupRetentionDays: parseInt(e.target.value, 10) || 90,
                          })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none bg-white"
                      >
                        <option value={30}>30 days</option>
                        <option value={60}>60 days</option>
                        <option value={90}>90 days</option>
                        <option value={180}>180 days</option>
                        <option value={365}>365 days</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        EU DATA STORAGE
                      </label>
                      <select
                        value={dataForm.dataStorageRegion}
                        onChange={(e) =>
                          setDataForm({ ...dataForm, dataStorageRegion: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none bg-white"
                      >
                        <option value="EU only — Amsterdam region">
                          EU only — Amsterdam region
                        </option>
                        <option value="EU only — Frankfurt region">
                          EU only — Frankfurt region
                        </option>
                        <option value="Global AWS / GCP multi-region">
                          Global AWS / GCP multi-region
                        </option>
                      </select>
                    </div>
                    <div className="bg-green-50 rounded-lg border border-green-100 p-4">
                      <p className="text-green-800 text-[12px] font-bold mb-1">Backup status</p>
                      <p className="text-green-700 text-[14px]">
                        {dataForm.backupStatus} · Last backup {dataForm.lastBackupTime || "08:30"}
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-[#1a2642] text-[15px] font-bold mb-1">
                      Company data requests
                    </h3>
                    <p className="text-gray-400 text-[13px] mb-4">
                      Each request requires confirmation and is recorded in the platform audit log.
                    </p>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          toast.success("Platform data export request initiated and logged.")
                        }
                        className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-medium text-[#1a2642] hover:bg-gray-50 transition-colors"
                      >
                        Process data export
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to process data deletion? This requires audit clearance."
                            )
                          ) {
                            toast.info("Data anonymisation request logged in audit trail.");
                          }
                        }}
                        className="px-4 py-2 border border-red-100 bg-red-50 rounded-lg text-[13px] font-medium text-red-600 hover:bg-red-100 transition-colors"
                      >
                        Process deletion / anonymisation
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => handleSaveTab("Data")}
                    className="bg-[#f97316] hover:bg-[#e06511] disabled:opacity-50 text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}

              {/* TAB 6: MODULES */}
              {activeTab === "Modules" && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                  <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 text-[#a55a22] text-[12px] mb-8">
                    Disabling a module that is already used by tenant companies requires confirmation
                    and creates an audit-log entry.
                  </div>

                  <div className="space-y-2 mb-8">
                    {[
                      { key: "employees", label: "Employees" },
                      { key: "customers", label: "Customers" },
                      { key: "locations", label: "Locations" },
                      { key: "gpsClockInOut", label: "GPS clock-in/out" },
                      { key: "nfcPatrols", label: "NFC Patrols" },
                      { key: "tasksChecklists", label: "Tasks & Checklists" },
                      { key: "reportsIncidents", label: "Reports & Incidents" },
                      { key: "documentsCertificates", label: "Documents & Certificates" },
                      { key: "notifications", label: "Notifications" },
                      { key: "aiAssistant", label: "AI Assistant" },
                      { key: "customerGuestPortal", label: "Customer/Guest Portal" },
                    ].map((mod) => {
                      const isEnabled =
                        (modulesForm.enabledModules as any)[mod.key] !== false;
                      return (
                        <div
                          key={mod.key}
                          className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0"
                        >
                          <div>
                            <p className="text-[#1a2642] text-[14px] font-semibold">{mod.label}</p>
                            <p className="text-gray-400 text-[12px] mt-0.5">
                              Assign to sectors and subscription plans
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (isEnabled) {
                                setPendingModuleToggle(mod.key);
                                setShowModuleModal(true);
                              } else {
                                setModulesForm({
                                  ...modulesForm,
                                  enabledModules: {
                                    ...modulesForm.enabledModules,
                                    [mod.key]: true,
                                  },
                                });
                              }
                            }}
                            className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors shrink-0 ${
                              isEnabled ? "bg-[#f97316]" : "bg-gray-200"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                isEnabled ? "translate-x-[22px]" : "translate-x-[3px]"
                              }`}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8 pt-6 border-t border-gray-100">
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        ASSIGN ENABLED MODULES TO SECTOR
                      </label>
                      <select
                        value={modulesForm.assignedSector}
                        onChange={(e) =>
                          setModulesForm({ ...modulesForm, assignedSector: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none bg-white"
                      >
                        <option value="All sectors">All sectors</option>
                        <option value="Security">Security</option>
                        <option value="Facility Management">Facility Management</option>
                        <option value="Logistics">Logistics</option>
                        <option value="Retail">Retail</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-[11px] font-bold tracking-[0.1em] uppercase mb-2">
                        ASSIGN ENABLED MODULES TO SUBSCRIPTION PLAN
                      </label>
                      <select
                        value={modulesForm.assignedSubscriptionPlan}
                        onChange={(e) =>
                          setModulesForm({
                            ...modulesForm,
                            assignedSubscriptionPlan: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none bg-white"
                      >
                        <option value="All plans">All plans</option>
                        <option value="Starter">Starter</option>
                        <option value="Professional">Professional</option>
                        <option value="Enterprise">Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => handleSaveTab("Modules")}
                    className="bg-[#f97316] hover:bg-[#e06511] disabled:opacity-50 text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Module Disable Confirmation Modal */}
      {showModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a2642]/60 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[480px] p-8">
            <h2 className="text-[#1a2642] text-[20px] font-bold mb-3">Disable module in use?</h2>
            <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
              This action will disable the module for all tenants using the default setting. The
              change will be confirmed, processed and added to the platform audit log.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowModuleModal(false);
                  setPendingModuleToggle(null);
                }}
                className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (pendingModuleToggle) {
                    setModulesForm({
                      ...modulesForm,
                      enabledModules: {
                        ...modulesForm.enabledModules,
                        [pendingModuleToggle]: false,
                      },
                    });
                  }
                  setShowModuleModal(false);
                  setPendingModuleToggle(null);
                  toast.info("Module toggle confirmed");
                }}
                className="px-5 py-2.5 bg-[#f97316] text-white rounded-lg text-[14px] font-medium hover:bg-[#e06511] cursor-pointer"
              >
                Confirm & log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
