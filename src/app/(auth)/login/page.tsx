"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UseForm from "@/components/ui/UseForm";
import UseInput from "@/components/ui/UseInput";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { handleLoginSuccess } from "@/lib/auth/auth.handlers";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res: any = await loginUser(data).unwrap();
      const payload = res?.data || res;

      if (payload?.isVerified === false) {
        toast.warning(payload?.message || "Please verify your account.");
        router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
        return;
      }

      if (payload?.accessToken) {
        const targetPath = handleLoginSuccess({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          user: payload.user,
          role: payload.role || payload.user?.role,
        });

        toast.success("Signed in successfully!");
        router.push(redirectParam || targetPath);
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (err: any) {
      const message =
        err?.data?.message ||
        err?.data?.data?.message ||
        err?.message ||
        "Failed to sign in. Please check your credentials.";
      toast.error(message);
    }
  };

  return (
    <UseForm onSubmit={onSubmit} resolver={zodResolver(loginSchema)}>
      <div className="space-y-1">
        <div className="mb-5">
          <UseInput
            name="email"
            label="Email"
            type="email"
            placeholder="name@shiftpoint.io"
            size="large"
          />
        </div>

        <div className="mb-6">
          <UseInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            size="large"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#f97316] hover:bg-[#e06511] disabled:opacity-60 text-white font-medium text-[15px] py-[10px] px-4 rounded-md transition-colors mt-2 h-[42px] flex items-center justify-center cursor-pointer"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </div>
    </UseForm>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[55%] bg-[#1a2642] flex-col justify-between p-12 lg:p-20 xl:p-24 relative overflow-hidden">
        {/* Background decorative circle */}
        <div className="absolute -bottom-[30%] -right-[15%] w-[900px] h-[900px] rounded-full border-[70px] border-[#1e2d4a] opacity-50 pointer-events-none"></div>

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-40">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 25.5C9.5 25.5 8.5 24 9.5 22.5L14 16.5C14.8 15.5 16 15 17.2 15H24" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M29 14.5C30.5 14.5 31.5 16 30.5 17.5L26 23.5C25.2 24.5 24 25 22.8 25H16" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16L9.5 14L7 16" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M28 24L30.5 26L33 24" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-white text-[22px] font-bold tracking-wide">SHIFT<span className="text-[#f97316]">POINT</span></span>
          </div>

          <h1 className="text-white text-[52px] lg:text-[60px] font-bold leading-[1.1] mb-6">
            Service operations, <br />
            clearly controlled.
          </h1>
          <p className="text-[#8e9bb3] text-xl max-w-lg leading-relaxed">
            One secure place to manage tenant companies, modules, platform access and the records behind every change.
          </p>
        </div>

        <div className="relative z-10 text-[#5e6b83] text-[13px]">
          © 2026 SHIFTPOINT · Service Management Platform
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-0">
        <div className="w-full max-w-[420px]">
          <p className="text-[#f97316] font-bold text-[11px] tracking-[0.15em] uppercase mb-5">
            SECURE ACCESS
          </p>
          <h2 className="text-[#1a2642] text-[32px] font-bold mb-3">
            Welcome to SHIFTPOINT
          </h2>
          <p className="text-gray-500 text-[15px] mb-10">
            Manage your service management platform securely.
          </p>

          <Suspense fallback={<div className="text-center py-6 text-gray-400">Loading form...</div>}>
            <LoginForm />
          </Suspense>

          <div className="mt-8 text-center">
            <Link href="/forgot-password" className="text-[#1a2642] font-semibold text-[14px] hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
