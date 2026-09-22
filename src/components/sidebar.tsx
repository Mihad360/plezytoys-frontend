"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const isCompanyAdmin = pathname.startsWith("/company-admin");
  const isManager = pathname.startsWith("/manager");
  const isCustomer = pathname.startsWith("/customer");
  const isSuperAdmin = pathname.startsWith("/admin") && !isCompanyAdmin && !isManager && !isCustomer;

  const isMenuSelected = (path: string) => {
    if (path === "/admin" || path === "/company-admin" || path === "/manager" || path === "/customer") {
      return pathname === path;
    }
    return pathname === path || pathname.startsWith(path + "/");
  };

  const managerMenuGroups = [
    {
      title: "WORKSPACE",
      items: [
        { name: "Overview", path: "/manager" },
        { name: "Employees", path: "/manager/employees" },
        { name: "Attendance", path: "/manager/attendance" },
      ]
    },
    {
      title: "OPERATIONS",
      items: [
        { name: "Patrol Monitoring", path: "/manager/patrols" },
        { name: "Tasks & Checklists", path: "/manager/tasks" },
        { name: "Reports", path: "/manager/reports" },
      ]
    },
    {
      title: "COMMUNICATION",
      items: [
        { name: "Messages", path: "/manager/messages" },
        { name: "Announcements", path: "/manager/announcements" },
        { name: "Alerts & Notifications", path: "/manager/alerts" },
      ]
    },
    {
      title: "RECORDS",
      items: [
        { name: "Documents & Certificates", path: "/manager/documents" },
      ]
    },
    {
      title: "ACCOUNT",
      items: [
        { name: "Manager Profile", path: "/manager/profile" },
        { name: "Security Settings", path: "/manager/security" },
      ]
    }
  ];

  const superAdminMenuGroups = [
    {
      title: "PLATFORM",
      items: [
        { name: "Dashboard", path: "/admin" },
        { name: "Companies", path: "/admin/companies" },
      ]
    },
    {
      title: "SUBSCRIPTIONS",
      items: [
        { name: "Subscription Plans", path: "/admin/subscription-plans" },
        { name: "Payment History", path: "/admin/payment-history" },
        { name: "Trials & Pilots", path: "/admin/trials" },
      ]
    },
    {
      title: "SYSTEM",
      items: [
        { name: "Support", path: "/admin/support" },
        { name: "System Settings", path: "/admin/settings" },
        { name: "Audit Logs", path: "/admin/audit-logs" },
      ]
    }
  ];

  const companyAdminMenuGroups = [
    {
      title: "DASHBOARD",
      items: [
        { name: "Overview", path: "/company-admin" },
      ]
    },
    {
      title: "PEOPLE",
      items: [
        { name: "Employees", path: "/company-admin/employees" },
        { name: "Managers", path: "/company-admin/managers" },
        { name: "Roles & Permissions", path: "/company-admin/roles" },
      ]
    },
    {
      title: "CUSTOMERS",
      items: [
        { name: "Customers", path: "/company-admin/customers" },
        { name: "Locations", path: "/company-admin/locations" },
      ]
    },
    {
      title: "ATTENDANCE",
      items: [
        { name: "Attendance", path: "/company-admin/attendance" },
        { name: "Working Time", path: "/company-admin/working-time" },
      ]
    },
    {
      title: "OPERATIONS",
      items: [
        { name: "NFC Checkpoints", path: "/company-admin/nfc-checkpoints" },
        { name: "Patrol Routes", path: "/company-admin/patrol-routes" },
        { name: "Tasks & Checklists", path: "/company-admin/tasks" },
        { name: "Reports", path: "/company-admin/reports" },
      ]
    },
    {
      title: "DOCUMENTS",
      items: [
        { name: "Documents & Certs", path: "/company-admin/documents" },
        { name: "Training Records", path: "/company-admin/training" },
      ]
    },
    {
      title: "COMMUNICATION",
      items: [
        { name: "Chat", path: "/company-admin/chat" },
        { name: "Announcements", path: "/company-admin/announcements" },
        { name: "Notifications", path: "/company-admin/notifications" },
      ]
    },
    {
      title: "AI KNOWLEDGE",
      items: [
        { name: "Knowledge Sources", path: "/company-admin/knowledge-sources" },
        { name: "Unresolved Questions", path: "/company-admin/unresolved-questions" },
      ]
    },
    {
      title: "SETTINGS",
      items: [
        { name: "Company Profile", path: "/company-admin/company-profile" },
        { name: "Branding & Language", path: "/company-admin/branding" },
        { name: "Customer Portal", path: "/company-admin/customer-portal" },
        { name: "Audit Log", path: "/company-admin/audit-log" },
      ]
    }
  ];

  const customerMenuGroups = [
    {
      title: "WORKSPACE",
      items: [
        { name: "Dashboard", path: "/customer" },
        { name: "Locations", path: "/customer/locations" },
      ]
    },
    {
      title: "OPERATIONS",
      items: [
        { name: "Patrols & Checkpoints", path: "/customer/patrols" },
        { name: "Reports", path: "/customer/reports" },
      ]
    },
    {
      title: "COMMUNICATION",
      items: [
        { name: "Announcements", path: "/customer/announcements" },
        { name: "AI Assistant", path: "/customer/ai-assistant" },
        { name: "Notifications", path: "/customer/notifications" },
      ]
    }
  ];

  const menuGroups = isCompanyAdmin 
    ? companyAdminMenuGroups 
    : isManager 
      ? managerMenuGroups 
      : isCustomer
        ? customerMenuGroups
        : superAdminMenuGroups;

  return (
    <aside className="w-[260px] bg-[#1a2642] h-full flex flex-col border-r border-[#1a2642] shrink-0">
      {/* Logo Area */}
      <div className="h-[72px] flex items-center px-6 border-b border-[#233355] shrink-0">
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 25.5C9.5 25.5 8.5 24 9.5 22.5L14 16.5C14.8 15.5 16 15 17.2 15H24" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M29 14.5C30.5 14.5 31.5 16 30.5 17.5L26 23.5C25.2 24.5 24 25 22.8 25H16" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16L9.5 14L7 16" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M28 24L30.5 26L33 24" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-white text-[16px] font-bold tracking-wide">SHIFT<span className="text-[#f97316]">POINT</span></span>
        </div>
      </div>

      {/* Menu Area */}
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
        
        {isCompanyAdmin ? (
          <div className="px-4 mb-6">
            <div className="bg-[#2a3a5a] rounded-lg p-3 cursor-pointer hover:bg-[#314365] transition-colors">
              <p className="text-[#f97316] text-[10px] font-bold tracking-[0.1em] uppercase mb-1">COMPANY ADMIN</p>
              <p className="text-white text-[13px] font-semibold">ABC Security Ltd.</p>
            </div>
          </div>
        ) : isManager ? (
          <div className="px-4 mb-6">
            <div className="bg-[#2a3a5a] rounded-lg p-3 cursor-pointer hover:bg-[#314365] transition-colors">
              <p className="text-[#f97316] text-[10px] font-bold tracking-[0.1em] uppercase mb-1">MANAGER WORKSPACE</p>
              <p className="text-white text-[13px] font-semibold">ABC Security Ltd.</p>
            </div>
          </div>
        ) : isCustomer ? (
          <div className="px-4 mb-6">
            <div className="bg-[#2a3a5a] rounded-lg p-3 cursor-pointer hover:bg-[#314365] transition-colors">
              <p className="text-[#f97316] text-[10px] font-bold tracking-[0.1em] uppercase mb-1">CUSTOMER PORTAL</p>
              <p className="text-white text-[13px] font-semibold">ARC Security Ltd.</p>
            </div>
          </div>
        ) : (
          <div className="text-[#f97316] text-[11px] font-bold tracking-[0.15em] mb-6 px-7">
            SUPER ADMIN
          </div>
        )}

        <div className="space-y-6 px-4">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <div className="text-[#5e6b83] text-[11px] font-bold tracking-[0.1em] uppercase mb-2 px-3">
                {group.title}
              </div>
              <ul className="space-y-0.5">
                {group.items.map((item, itemIdx) => {
                  const isActive = isMenuSelected(item.path);
                  return (
                    <li key={itemIdx}>
                      <Link 
                        href={item.path}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-[13px] font-medium ${
                          isActive 
                            ? "bg-[#f97316] text-white" 
                            : "text-[#8e9bb3] hover:text-white hover:bg-[#233355]"
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-white" : "bg-[#5e6b83]"}`}></div>
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* User Area */}
      <div className="p-4 border-t border-[#233355] shrink-0">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-10 h-10 shrink-0 rounded-full bg-[#f97316] flex items-center justify-center text-white font-bold text-sm">
            {isCompanyAdmin ? "CA" : isManager ? "DB" : isCustomer ? "SA" : "SA"}
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-[13px] font-semibold truncate">
              {isCompanyAdmin ? "Company Admin" : isManager ? "David Brown" : isCustomer ? "Sarah Ahmed" : "Super Admin"}
            </p>
            <p className="text-[#5e6b83] text-[12px] truncate">
              {isCompanyAdmin ? "admin@abcsecurity.io" : isManager ? "Operations Manager" : isCustomer ? "sarah@arc-security.nl" : "admin@shiftpoint.io"}
            </p>
          </div>
        </div>
        <button onClick={() => setShowSignOutModal(true)} className="flex items-center gap-3 px-3 py-2 w-full text-left text-[#5e6b83] hover:text-white transition-colors text-[13px] font-medium rounded-lg hover:bg-[#233355]">
          <LogOut size={16} />
          Sign out
        </button>
      </div>

      {/* Global Sign Out Modal */}
      {showSignOutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a2642]/60 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[450px] animate-in fade-in zoom-in-95 duration-200 my-8">
            <div className="flex justify-between items-start p-6 pb-2 border-b-0">
              <p className="text-[#f97316] text-[10px] font-bold tracking-[0.1em] uppercase mb-1">SECURE SESSION</p>
              <button onClick={() => setShowSignOutModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="px-6 pb-6 pt-0 space-y-4">
              <h3 className="text-[#1a2642] text-[24px] font-bold leading-tight">Sign out of ShiftPoint?</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                Your current {isCustomer ? "customer" : isManager ? "manager" : isCompanyAdmin ? "admin" : "super-admin"} session will end securely on this device
              </p>
            </div>

            <div className="p-6 pt-4 flex justify-end gap-3">
              <button onClick={() => setShowSignOutModal(false)} className="px-6 py-2.5 border border-gray-200 bg-white rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
                Cancel
              </button>
              <button onClick={() => window.location.href = '/login'} className="px-6 py-2.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[14px] font-medium transition-colors shadow-sm">
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
