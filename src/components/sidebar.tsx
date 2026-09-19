"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Building2, 
  CreditCard, 
  History, 
  FlaskConical, 
  LifeBuoy, 
  Settings, 
  ShieldCheck, 
  LogOut,
  User
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const isMenuSelected = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin";
    }
    return pathname === path || pathname.startsWith(path + "/");
  };

  const menuGroups = [
    {
      title: "PLATFORM",
      items: [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
        { name: "Companies", path: "/admin/companies", icon: Building2 },
      ]
    },
    {
      title: "SUBSCRIPTIONS",
      items: [
        { name: "Subscription Plans", path: "/admin/subscription-plans", icon: CreditCard },
        { name: "Payment History", path: "/admin/payment-history", icon: History },
        { name: "Trials & Pilots", path: "/admin/trials", icon: FlaskConical },
      ]
    },
    {
      title: "SYSTEM",
      items: [
        { name: "Support", path: "/admin/support", icon: LifeBuoy },
        { name: "System Settings", path: "/admin/settings", icon: Settings },
        { name: "Audit Logs", path: "/admin/audit-logs", icon: ShieldCheck },
      ]
    }
  ];

  return (
    <aside className="w-[260px] bg-[#1a2642] h-full flex flex-col border-r border-[#1a2642]">
      {/* Logo Area */}
      <div className="h-[72px] flex items-center px-6 border-b border-[#233355]">
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
      <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
        <div className="text-[#f97316] text-[11px] font-bold tracking-[0.15em] mb-6 px-3">
          SUPER ADMIN
        </div>

        <div className="space-y-8">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <div className="text-[#5e6b83] text-[11px] font-bold tracking-[0.1em] uppercase mb-3 px-3">
                {group.title}
              </div>
              <ul className="space-y-1">
                {group.items.map((item, itemIdx) => {
                  const isActive = isMenuSelected(item.path);
                  return (
                    <li key={itemIdx}>
                      <Link 
                        href={item.path}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-[14px] font-medium ${
                          isActive 
                            ? "bg-[#f97316] text-white" 
                            : "text-[#8e9bb3] hover:text-white hover:bg-[#233355]"
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white" : "bg-[#5e6b83]"}`}></div>
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
      <div className="p-4 border-t border-[#233355]">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center text-white font-bold text-sm">
            SA
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-[13px] font-semibold truncate">Super Admin</p>
            <p className="text-[#5e6b83] text-[12px] truncate">admin@shiftpoint.io</p>
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
