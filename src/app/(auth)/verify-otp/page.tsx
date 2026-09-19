"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const onVerify = () => {
    console.log("Verifying OTP:", otp.join(""));
    // Add verification logic
    router.push("/login");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple chars
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
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
          
          {/* Logo inside card */}
          <div className="flex items-center gap-2 mb-10">
            <div className="bg-[#1a2642] rounded-md p-1.5 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 25.5C9.5 25.5 8.5 24 9.5 22.5L14 16.5C14.8 15.5 16 15 17.2 15H24" stroke="#f97316" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M29 14.5C30.5 14.5 31.5 16 30.5 17.5L26 23.5C25.2 24.5 24 25 22.8 25H16" stroke="#f97316" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[#1a2642] text-[15px] font-bold tracking-wide">SHIFT<span className="text-[#f97316]">POINT</span></span>
          </div>

          <div className="flex flex-col items-center text-center">
            <Lock className="w-8 h-8 text-[#1a2642] mb-4" strokeWidth={1.5} />
            <h2 className="text-[#1a2642] text-[26px] font-bold mb-3">
              Verify your identity
            </h2>
            <p className="text-gray-500 text-[14px] mb-8 max-w-[280px]">
              Enter the 6-digit verification code sent to your registered authentication method.
            </p>

            {/* OTP Inputs */}
            <div className="flex gap-2 sm:gap-3 mb-8 w-full justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-10 h-12 sm:w-12 sm:h-14 border border-gray-200 rounded-lg text-center text-xl font-semibold text-[#1a2642] focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] outline-none transition-all"
                />
              ))}
            </div>

            <button
              onClick={onVerify}
              className="w-full bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[15px] py-[10px] px-4 rounded-md transition-colors mb-6 h-[46px]"
            >
              Verify →
            </button>

            <div className="flex flex-col items-center gap-4 text-[13px]">
              <button className="text-[#f97316] font-medium hover:underline">
                Resend code
              </button>
              <button className="text-gray-500 font-medium hover:underline">
                Use another verification method
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
