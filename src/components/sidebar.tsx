"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const isCompanyAdmin = pathname.startsWith("/company-admin");
  const isSuperAdmin = pathname.startsWith("/admin") && !isCompanyAdmin;

  const isMenuSelected = (path: string) => {
    if (path === "/admin" || path === "/company-admin") {
      return pathname === path;
    }
    return pathname === path || pathname.startsWith(path + "/");
  };

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
        { name: "Portal Users", path: "/company-admin/portal-users" },
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
        { name: "Support", path: "/company-admin/support" },
      ]
    },
    {
      title: "AI KNOWLEDGE",
      items: [
        { name: "Knowledge Sources", path: "/company-admin/knowledge" },
        { name: "Unresolved Questions", path: "/company-admin/unresolved" },
      ]
    },
    {
      title: "SETTINGS",
      items: [
        { name: "Company Profile", path: "/company-admin/profile" },
        { name: "Branding & Language", path: "/company-admin/branding" },
        { name: "Customer Portal", path: "/company-admin/portal-settings" },
        { name: "Audit Log", path: "/company-admin/audit" },
      ]
    }
  ];

  const menuGroups = isCompanyAdmin ? companyAdminMenuGroups : superAdminMenuGroups;

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
            {isCompanyAdmin ? "CA" : "SA"}
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-[13px] font-semibold truncate">{isCompanyAdmin ? "Company Admin" : "Super Admin"}</p>
            <p className="text-[#5e6b83] text-[12px] truncate">{isCompanyAdmin ? "admin@abcsecurity.io" : "admin@shiftpoint.io"}</p>
          </div>
        </div>
        <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-[#5e6b83] hover:text-white transition-colors text-[13px] font-medium rounded-lg hover:bg-[#233355]">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
