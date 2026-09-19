"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UseForm from "@/components/ui/UseForm";
import UseInput from "@/components/ui/UseInput";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const createPasswordSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

type CreatePasswordValues = z.infer<typeof createPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = (data: CreatePasswordValues) => {
    console.log("New password set:", data);
    // Add API logic to update password here
    setIsSuccess(true);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[50%] bg-[#1a2642] flex-col justify-between p-10 lg:p-14 xl:p-20">
        <div className="relative z-10">
          {/* Small Logo at Top Left */}
          <div className="flex items-center gap-2 mb-32">
            <div className="bg-white rounded p-1 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 25.5C9.5 25.5 8.5 24 9.5 22.5L14 16.5C14.8 15.5 16 15 17.2 15H24" stroke="#f97316" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M29 14.5C30.5 14.5 31.5 16 30.5 17.5L26 23.5C25.2 24.5 24 25 22.8 25H16" stroke="#f97316" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-white text-[15px] font-bold tracking-wide">SHIFT<span className="text-[#f97316]">POINT</span></span>
          </div>

          <h1 className="text-white text-[32px] lg:text-[40px] font-medium leading-[1.2] mb-6 max-w-md">
            Securely restore access to your ShiftPoint account.
          </h1>
        </div>

        <div className="relative z-10 text-[#5e6b83] text-[13px]">
          © 2026 ShiftPoint Operations
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-0">
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-gray-100 p-10 lg:p-12">
          
          {/* Back link */}
          <Link href={isSuccess ? "/login" : "/verify-otp"} className="inline-flex items-center text-[#f97316] font-medium text-[14px] hover:underline mb-8">
            <span className="mr-2">←</span> Back
          </Link>

          {/* Progress Bar - All 3 filled in this stage */}
          <div className="flex gap-2 mb-8">
            <div className="h-1 flex-1 bg-[#f97316] rounded-full"></div>
            <div className="h-1 flex-1 bg-[#f97316] rounded-full"></div>
            <div className="h-1 flex-1 bg-[#f97316] rounded-full"></div>
          </div>

          {!isSuccess ? (
            <>
              <p className="text-[#f97316] font-bold text-[11px] tracking-[0.15em] uppercase mb-4">
                PASSWORD RECOVERY
              </p>
              <h2 className="text-[#1a2642] text-[28px] font-semibold mb-3">
                Create a new password
              </h2>
              <p className="text-gray-500 text-[14px] mb-8">
                Choose a strong password with at least 8 characters.
              </p>

              <UseForm onSubmit={onSubmit} resolver={zodResolver(createPasswordSchema)}>
                <div className="space-y-4">
                  <div>
                    <UseInput
                      name="password"
                      label="New password"
                      type="password"
                      size="large"
                    />
                  </div>

                  <div>
                    <UseInput
                      name="confirmPassword"
                      label="Confirm new password"
                      type="password"
                      size="large"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[15px] py-[10px] px-4 rounded-md transition-colors mt-4 h-[46px]"
                  >
                    Save new password
                  </button>
                </div>
              </UseForm>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-6">
                <Check className="w-6 h-6 text-green-500" strokeWidth={3} />
              </div>

              <p className="text-[#f97316] font-bold text-[11px] tracking-[0.15em] uppercase mb-4">
                PASSWORD RECOVERY
              </p>
              <h2 className="text-[#1a2642] text-[28px] font-semibold mb-3">
                Password updated
              </h2>
              <p className="text-gray-500 text-[14px] mb-8 leading-relaxed">
                Your password has been reset successfully. You can now sign in with your new password.
              </p>

              <Link
                href="/login"
                className="w-full inline-flex justify-center items-center bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[15px] py-[10px] px-4 rounded-md transition-colors h-[46px]"
              >
                Return to sign in
              </Link>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
