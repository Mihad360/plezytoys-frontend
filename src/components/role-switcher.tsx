"use client";

import Link from "next/link";
import { useState } from "react";
import { Settings, Building2, Users, UserCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export function RoleSwitcher() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname() || "";

  // Don't show the role switcher if we are on a login or auth page, though we could just show it everywhere.
  // For development, showing it everywhere is fine.

  const roles = [
    { name: "Super Admin", href: "/admin", icon: Settings, color: "bg-blue-600" },
    { name: "Company Admin", href: "/company-admin", icon: Building2, color: "bg-orange-600" },
    { name: "Manager", href: "/manager", icon: Users, color: "bg-purple-600" },
    { name: "Customer", href: "/customer", icon: UserCircle2, color: "bg-green-600" },
  ];

  return (
    <div className={`fixed top-1/2 -translate-y-1/2 right-0 z-[100] flex transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-[200px]'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-12 bg-white border border-gray-200 border-r-0 rounded-l-md shadow-md flex items-center justify-center text-gray-500 hover:text-gray-700"
      >
        {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <div className="w-[200px] bg-white border border-gray-200 shadow-xl rounded-l-xl overflow-hidden flex flex-col">
        <div className="bg-gray-50 p-3 border-b border-gray-100">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Role Switcher (Dev)</p>
        </div>
        <div className="p-2 flex flex-col gap-1">
          {roles.map((role) => {
            const isActive = pathname.startsWith(role.href);
            return (
              <Link
                key={role.name}
                href={role.href}
                className={`flex items-center gap-3 p-2 rounded-lg text-[13px] font-medium transition-colors ${
                  isActive 
                    ? "bg-gray-100 text-[#1a2642]" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#1a2642]"
                }`}
              >
                <div className={`w-6 h-6 rounded flex items-center justify-center text-white ${role.color}`}>
                  <role.icon size={12} />
                </div>
                {role.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
