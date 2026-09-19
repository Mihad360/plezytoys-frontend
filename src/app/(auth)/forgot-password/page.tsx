"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UseForm from "@/components/ui/UseForm";
import UseInput from "@/components/ui/UseInput";
import { useRouter } from "next/navigation";

const resetSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();

  const onResetSubmit = (data: ResetFormValues) => {
    console.log("Reset email:", data);
    // Add logic to send reset email here
    router.push("/verify-otp");
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
          
          {/* Back to sign in */}
          <Link href="/login" className="inline-flex items-center text-[#f97316] font-medium text-[14px] hover:underline mb-8">
            <span className="mr-2">←</span> Back to sign in
          </Link>

          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            <div className="h-1 flex-1 bg-[#f97316] rounded-full"></div>
            <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
            <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
          </div>

          <p className="text-[#f97316] font-bold text-[11px] tracking-[0.15em] uppercase mb-4">
            PASSWORD RECOVERY
          </p>
          <h2 className="text-[#1a2642] text-[28px] font-semibold mb-3">
            Reset your password
          </h2>
          <p className="text-gray-500 text-[14px] mb-8 leading-relaxed">
            Enter the email address associated with your account.<br />
            We'll send a six-digit verification code.
          </p>

          <UseForm onSubmit={onResetSubmit} resolver={zodResolver(resetSchema)}>
            <div className="space-y-6">
              <div>
                <UseInput
                  name="email"
                  label="Email address"
                  type="email"
                  placeholder="mahmudul14286@gmail.com"
                  size="large"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[15px] py-[10px] px-4 rounded-md transition-colors mt-2 h-[46px]"
              >
                Send verification code
              </button>
            </div>
          </UseForm>

        </div>
      </div>
    </div>
  );
}
