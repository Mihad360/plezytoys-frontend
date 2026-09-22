"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  return (
    <div className="flex min-h-screen">
      
      {/* Left Panel */}
      <div className="w-[50%] bg-[#1a2642] flex flex-col justify-between p-12">
        <div>
          <div className="flex items-center gap-2 mb-32">
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 25.5C9.5 25.5 8.5 24 9.5 22.5L14 16.5C14.8 15.5 16 15 17.2 15H24" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M29 14.5C30.5 14.5 31.5 16 30.5 17.5L26 23.5C25.2 24.5 24 25 22.8 25H16" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16L9.5 14L7 16" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M28 24L30.5 26L33 24" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-white text-[18px] font-bold tracking-wide">SHIFT<span className="text-[#f97316]">POINT</span></span>
          </div>

          <h1 className="text-white text-[36px] font-medium leading-[1.2] max-w-[450px]">
            Securely restore access to your ShiftPoint account.
          </h1>
        </div>

        <p className="text-[#5e6b83] text-[12px]">© 2026 ShiftPoint Operations</p>
      </div>

      {/* Right Panel */}
      <div className="w-[50%] bg-[#f8f9fa] flex items-center justify-center p-12">
        <div className="w-full max-w-[480px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10">
          
          {step < 4 && (
            <button 
              onClick={() => step > 1 ? setStep((step - 1) as 1 | 2 | 3) : window.location.href = '/login'} 
              className="text-[#f97316] text-[14px] hover:underline mb-8 inline-block"
            >
              ← {step === 1 ? 'Back to sign in' : 'Back'}
            </button>
          )}

          {/* Progress Bar */}
          {step < 4 && (
            <div className="flex gap-2 mb-8">
              <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-[#f97316]' : 'bg-gray-100'}`}></div>
              <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-[#f97316]' : 'bg-gray-100'}`}></div>
              <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-[#f97316]' : 'bg-gray-100'}`}></div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <p className="text-[#f97316] text-[11px] font-bold tracking-[0.1em] uppercase mb-3">PASSWORD RECOVERY</p>
              <h2 className="text-[#1a2642] text-[28px] font-medium mb-3">Reset your password</h2>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
                Enter the email address associated with your account. We'll send a six-digit verification code.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Email address</label>
                  <input 
                    type="email" 
                    defaultValue="mahmudul14286@gmail.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]"
                  />
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[15px] font-medium transition-colors shadow-sm mt-2"
                >
                  Send verification code
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <p className="text-[#f97316] text-[11px] font-bold tracking-[0.1em] uppercase mb-3">PASSWORD RECOVERY</p>
              <h2 className="text-[#1a2642] text-[28px] font-medium mb-3">Verify your email</h2>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
                We sent a six-digit code to<br/>mahmudul14286@gmail.com.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Verification code</label>
                  <input 
                    type="text" 
                    placeholder="0 0 0 0 0 0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[16px] tracking-[0.5em] text-center focus:outline-none focus:border-[#f97316]"
                  />
                </div>
                <button className="text-[#f97316] text-[14px] hover:underline">Resend code</button>
                <button 
                  onClick={() => setStep(3)}
                  className="w-full py-3.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[15px] font-medium transition-colors shadow-sm"
                >
                  Verify code
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <p className="text-[#f97316] text-[11px] font-bold tracking-[0.1em] uppercase mb-3">PASSWORD RECOVERY</p>
              <h2 className="text-[#1a2642] text-[28px] font-medium mb-3">Create a new password</h2>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
                Choose a strong password with at least 8 characters.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">New password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]"
                  />
                </div>
                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Confirm new password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]"
                  />
                </div>
                <button 
                  onClick={() => setStep(4)}
                  className="w-full py-3.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[15px] font-medium transition-colors shadow-sm mt-2"
                >
                  Save new password
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 pt-8">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <Check className="text-emerald-500" size={24} />
              </div>
              <p className="text-[#f97316] text-[11px] font-bold tracking-[0.1em] uppercase mb-3">PASSWORD RECOVERY</p>
              <h2 className="text-[#1a2642] text-[28px] font-medium mb-3">Password updated</h2>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
                Your password has been reset successfully. You can now sign in with your new password.
              </p>

              <Link 
                href="/login"
                className="w-full flex items-center justify-center py-3.5 bg-[#f97316] hover:bg-[#e06511] text-white rounded-lg text-[15px] font-medium transition-colors shadow-sm"
              >
                Return to sign in
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
