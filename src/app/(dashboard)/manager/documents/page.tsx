"use client";

import { Bell, RefreshCw, AlertCircle, FileText, CheckCircle2, ShieldCheck, Download, Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  useGetManagerDocumentsQuery,
  useGetManagerEmployeesQuery,
  useUploadDocumentMutation,
} from "@/redux/api/managerApi";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function ManagerDocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [category, setCategory] = useState<"certificates" | "identification" | "qualifications">("certificates");
  const [documentType, setDocumentType] = useState("Security License (SIA/VCA)");
  const [issuedDate, setIssuedDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");
  const [actionError, setActionError] = useState("");

  const { data: profileData } = useGetMyProfileQuery(undefined);
  const manager = profileData?.data;

  const { data: employeesData } = useGetManagerEmployeesQuery();
  const employees = employeesData?.data || [];

  const [uploadDocument, { isLoading: isUploading }] = useUploadDocumentMutation();


  const {
    data: documentsData,
    isLoading,
    isError,
    refetch,
  } = useGetManagerDocumentsQuery();

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const documents = documentsData?.data || [];

  const userInitials = manager?.name
    ? manager.name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "MG";

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • MANAGER</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Documents & Compliance</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => refetch()}
            title="Refresh Documents"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
            {unreadCount > 0 && (
              <div className="absolute top-0 right-0 w-4 h-4 bg-[#b45f06] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </div>
            )}
          </div>
          <Link href="/manager/profile">
            <div className="w-10 h-10 rounded-full bg-[#b45f06] flex items-center justify-center text-white font-bold text-sm cursor-pointer">
              {userInitials}
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto space-y-4 mt-2">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">Certificates & Compliance Files</h2>
              <p className="text-gray-500 text-[14px]">Access shared training certifications, post orders, and compliance records.</p>
            </div>
            <button
              onClick={() => {
                setActionError("");
                setActionSuccess("");
                setIsUploadOpen(true);
              }}
              className="px-4 py-2 bg-[#b45f06] hover:bg-[#964f05] text-white rounded-lg text-[13px] font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus size={16} /> Register Document
            </button>
          </div>

          {actionSuccess && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between text-emerald-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} />
                <span className="text-sm font-medium">{actionSuccess}</span>
              </div>
              <button onClick={() => setActionSuccess("")} className="text-emerald-600 hover:text-emerald-800 text-sm font-bold">✕</button>
            </div>
          )}

          {actionError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-2">
                <AlertCircle size={18} />
                <span className="text-sm font-medium">{actionError}</span>
              </div>
              <button onClick={() => setActionError("")} className="text-red-600 hover:text-red-800 text-sm font-bold">✕</button>
            </div>
          )}

          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to retrieve compliance documents.</p>
              </div>
              <button
                onClick={() => refetch()}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
              >
                Retry
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
              <RefreshCw size={24} className="mx-auto mb-2 animate-spin text-[#f97316]" />
              <p className="text-sm font-medium">Loading documents repository...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
              <FileText size={36} className="mx-auto mb-2 text-gray-300" />
              <p className="font-semibold text-gray-600">No documents or certificates uploaded yet.</p>
              <p className="text-xs text-gray-400 mt-1">Company documents and verified staff credentials will appear here.</p>
            </div>
          ) : (
            documents.map((doc: any) => {
              const dateFormatted = doc.expiryDate
                ? `Expires ${new Date(doc.expiryDate).toLocaleDateString("en-GB")}`
                : doc.createdAt
                ? `Uploaded ${new Date(doc.createdAt).toLocaleDateString("en-GB")}`
                : "Active";

              const isValid = !doc.expiryDate || new Date(doc.expiryDate) > new Date();

              return (
                <div key={doc._id} className="bg-white rounded-xl border border-gray-100 p-6 flex justify-between items-center shadow-sm hover:border-gray-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="text-[#1a2642] font-bold text-[16px]">{doc.title || doc.name}</h3>
                      <p className="text-gray-500 text-[13px] mt-0.5">
                        {doc.user?.name || "Corporate Resource"} · {dateFormatted}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold border ${
                        isValid ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isValid ? "bg-emerald-500" : "bg-red-500"}`}></span>
                      {isValid ? "Valid" : "Expired"}
                    </span>
                    {doc.fileUrl && (
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 shadow-sm flex items-center gap-1.5"
                      >
                        <Download size={14} /> Download
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Upload Document Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[550px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-[#1a2642] font-bold text-base">Register Compliance Document</h3>
                <p className="text-gray-400 text-xs mt-0.5">Record security certifications, ID records, or qualifications</p>
              </div>
              <button onClick={() => setIsUploadOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">
                ✕
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!name.trim() || !issuedDate || !expiryDate) {
                  setActionError("Document name, issue date, and expiry date are required.");
                  return;
                }
                const targetUserId = selectedUser || manager?._id;
                if (!targetUserId) {
                  setActionError("Please select a target officer or manager.");
                  return;
                }
                try {
                  await uploadDocument({
                    name: name.trim(),
                    user: targetUserId,
                    category,
                    documentType,
                    issuedDate,
                    expiryDate,
                    fileUrl: fileUrl.trim() || undefined,
                  }).unwrap();

                  setActionSuccess("Compliance document registered successfully!");
                  setIsUploadOpen(false);
                  setName("");
                  setSelectedUser("");
                  setFileUrl("");
                  setIssuedDate("");
                  setExpiryDate("");
                } catch (err: any) {
                  setActionError(err?.data?.message || "Failed to register document.");
                }
              }}
              className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
            >
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Document Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. SIA Door Supervisor License"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#b45f06]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Applicable Person *</label>
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="">Myself ({manager?.name || "Manager"})</option>
                    {employees.map((emp: any) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name || `${emp.firstName || ""} ${emp.lastName || ""}`.trim()} ({emp.employeeId || emp.email})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="certificates">Certificates</option>
                    <option value="identification">Identification</option>
                    <option value="qualifications">Qualifications</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Issued Date *</label>
                  <input
                    type="date"
                    required
                    value={issuedDate}
                    onChange={(e) => setIssuedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Expiry Date *</label>
                  <input
                    type="date"
                    required
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Document Link / Cloud URL (Optional)</label>
                <input
                  type="url"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  placeholder="https://cloud-storage.com/documents/sia_cert.pdf"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#b45f06]"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2 bg-[#b45f06] hover:bg-[#964f05] text-white rounded-lg text-xs font-semibold shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isUploading ? "Registering..." : "Register Document"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

