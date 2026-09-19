"use client";

import Link from "next/link";
import { Bell, X } from "lucide-react";
import { useState } from "react";
import UseForm from "@/components/ui/UseForm";
import UseInput from "@/components/ui/UseInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
});

type FormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const router = useRouter();
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [logoutOthers, setLogoutOthers] = useState(true);

  const onSubmit = (data: FormValues) => {
    console.log("Update password:", data);
    // Open sign out modal instead of immediate save
    setShowSignoutModal(true);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Change Password</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[800px] mx-auto">
          
          <Link href="/admin/profile" className="inline-flex items-center text-gray-500 font-medium text-[13px] hover:text-[#1a2642] transition-colors mb-6">
            <span className="mr-2">←</span> Back to profile
          </Link>

          <div className="mb-8">
            <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Change password</h2>
            <p className="text-gray-500 text-[14px]">Use a unique password you do not use elsewhere.</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            <UseForm onSubmit={onSubmit} resolver={zodResolver(changePasswordSchema)}>
              
              <div className="mb-6">
                <UseInput
                  name="currentPassword"
                  label="Current password"
                  type={showPasswords ? "text" : "password"}
                  size="large"
                />
              </div>

              <div className="mb-3">
                <UseInput
                  name="newPassword"
                  label="New password"
                  type={showPasswords ? "text" : "password"}
                  size="large"
                />
              </div>

              {/* Password Strength Indicator */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-400 text-[12px]">Password strength</p>
                  <p className="text-[#f97316] text-[12px] font-medium">Too weak</p>
                </div>
                <div className="flex gap-1 mb-4">
                  <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                  <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                  <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                  <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                  <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[12px] text-gray-400">
                  <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full border border-gray-300"></span> At least 12 characters</p>
                  <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full border border-gray-300"></span> An uppercase letter</p>
                  <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full border border-gray-300"></span> A number</p>
                  <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full border border-gray-300"></span> A symbol</p>
                </div>
              </div>

              <div className="mb-8">
                <UseInput
                  name="confirmPassword"
                  label="Confirm new password"
                  type={showPasswords ? "text" : "password"}
                  size="large"
                />
              </div>

              <div className="flex items-center gap-2 mb-6">
                <input 
                  type="checkbox" 
                  id="showPasswords" 
                  checked={showPasswords} 
                  onChange={(e) => setShowPasswords(e.target.checked)} 
                  className="w-4 h-4 text-[#f97316] rounded border-gray-300 focus:ring-[#f97316]"
                />
                <label htmlFor="showPasswords" className="text-[14px] text-gray-600 font-medium">Show passwords</label>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-8 flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="logoutOthers"
                  checked={logoutOthers} 
                  onChange={(e) => setLogoutOthers(e.target.checked)} 
                  className="w-4 h-4 text-[#f97316] rounded border-gray-300 focus:ring-[#f97316] mt-0.5 shrink-0"
                />
                <label htmlFor="logoutOthers" className="text-[14px] text-gray-700 font-medium">Log out of all other active sessions after changing my password</label>
              </div>

              <button
                type="submit"
                className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[14px] px-6 py-2.5 rounded-lg transition-colors mb-6"
              >
                Update password
              </button>

              <p className="text-gray-400 text-[12px]">Password changes are always recorded in the security audit log.</p>

            </UseForm>
          </div>

        </div>
      </main>

      {/* Sign Out Modal */}
      {showSignoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a2642]/60 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[480px] p-8">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[#f97316] font-bold text-[10px] tracking-[0.15em] uppercase mb-1">SECURE SESSION</p>
              <button onClick={() => setShowSignoutModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <h2 className="text-[#1a2642] text-[22px] font-bold mb-3">Sign out of ShiftPoint?</h2>
            <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
              Your current super-admin session will end securely on this device.
            </p>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowSignoutModal(false)}
                className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => router.push("/login")}
                className="px-5 py-2.5 bg-[#f97316] text-white rounded-lg text-[14px] font-medium hover:bg-[#e06511] transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
