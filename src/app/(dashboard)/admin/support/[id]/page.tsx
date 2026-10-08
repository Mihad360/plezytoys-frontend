"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Bell, RefreshCw, AlertCircle, Send, CheckCircle2 } from "lucide-react";
import {
  useGetSupportTicketByIdQuery,
  useUpdateSupportTicketMutation,
  useReplyToSupportTicketMutation,
} from "@/redux/api/superAdminApi";
import { toast } from "sonner";

export default function SupportDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";

  const [replyMessage, setReplyMessage] = useState("");

  const { data: response, isLoading, isError, refetch } = useGetSupportTicketByIdQuery(id, {
    skip: !id,
  });

  const [updateTicket, { isLoading: isUpdating }] = useUpdateSupportTicketMutation();
  const [replyToTicket, { isLoading: isReplying }] = useReplyToSupportTicketMutation();

  const ticket = response?.data;

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateTicket({ id, data: { status: newStatus } }).unwrap();
      toast.success(`Ticket marked as ${newStatus}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update ticket status");
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    try {
      await replyToTicket({ id, message: replyMessage }).unwrap();
      toast.success("Reply dispatched to customer");
      setReplyMessage("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to post reply");
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const compName =
    typeof ticket?.company === "object" ? ticket?.company?.name || "Company" : "Company";
  const userName =
    typeof ticket?.user === "object"
      ? ticket?.user?.name || `${ticket?.user?.firstName || ""} ${ticket?.user?.lastName || ""}`.trim() || ticket?.user?.email
      : "Client Admin";

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-[#1a2642] text-xl font-bold">Support Request</h1>
          <p className="text-gray-400 text-xs mt-0.5">SHIFTPOINT • Super Admin</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            title="Refresh"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1100px] mx-auto">
          <Link
            href="/admin/support"
            className="inline-flex items-center text-gray-500 font-medium text-[13px] hover:text-[#1a2642] transition-colors mb-6"
          >
            <span className="mr-2">←</span> Back to all support requests
          </Link>

          {isLoading ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
              <RefreshCw className="animate-spin text-[#f97316] mx-auto mb-3" size={28} />
              <p className="text-gray-500 font-medium">Loading ticket details...</p>
            </div>
          ) : isError || !ticket ? (
            <div className="bg-white rounded-xl border border-red-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 text-red-600 mb-2">
                <AlertCircle size={22} />
                <h3 className="text-lg font-bold">Ticket Not Found</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Unable to locate ticket with ID: {id}
              </p>
              <Link
                href="/admin/support"
                className="inline-block px-4 py-2 bg-[#1a2642] text-white rounded-lg text-sm font-medium"
              >
                Return to Support Center
              </Link>
            </div>
          ) : (
            <>
              {/* Title Row */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-gray-400">
                      {ticket.ticketNumber || `#${ticket._id?.slice(-5).toUpperCase()}`}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border bg-blue-50 text-blue-700 border-blue-200 capitalize">
                      {ticket.status?.replace("_", " ") || "Open"}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border bg-orange-50 text-[#f97316] border-orange-200 capitalize">
                      {ticket.priority || "Normal"} Priority
                    </span>
                  </div>
                  <h2 className="text-[#1a2642] text-[24px] font-bold mb-1">{ticket.subject}</h2>
                  <p className="text-gray-500 text-[14px]">
                    {compName} · Created by {userName} · {formatDate(ticket.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={ticket.status || "open"}
                    disabled={isUpdating}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-[#1a2642] focus:outline-none"
                  >
                    <option value="open">Status: Open</option>
                    <option value="in_progress">Status: In Progress</option>
                    <option value="resolved">Status: Resolved</option>
                    <option value="closed">Status: Closed</option>
                  </select>

                  {ticket.status !== "resolved" && (
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleStatusChange("resolved")}
                      className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[13px] px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <CheckCircle2 size={16} /> Resolve Ticket
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* LEFT COLUMN: Request description + thread */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Original Request */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-3">
                      REQUEST DESCRIPTION
                    </p>
                    <p className="text-[#1a2642] text-[14px] leading-relaxed whitespace-pre-wrap">
                      {ticket.description}
                    </p>
                  </div>

                  {/* Conversation History */}
                  {ticket.messages && ticket.messages.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                      <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase mb-4">
                        CONVERSATION THREAD ({ticket.messages.length})
                      </p>

                      <div className="space-y-4">
                        {ticket.messages.map((msg: any, idx: number) => {
                          const isStaff = msg.senderRole === "super_admin" || msg.senderRole === "admin";
                          return (
                            <div
                              key={idx}
                              className={`p-4 rounded-xl border ${
                                isStaff
                                  ? "bg-orange-50/50 border-orange-100 ml-4"
                                  : "bg-gray-50 border-gray-100 mr-4"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="font-semibold text-xs text-[#1a2642]">
                                  {isStaff ? "Support Team (Staff)" : userName}
                                </span>
                                <span className="text-[11px] text-gray-400">
                                  {formatDate(msg.createdAt)}
                                </span>
                              </div>
                              <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {msg.message}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Reply Form */}
                  <form onSubmit={handleSendReply} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-gray-400 text-[11px] font-bold tracking-[0.1em] uppercase">
                        REPLY TO CUSTOMER
                      </p>
                      <span className="text-[11px] text-green-600 bg-green-50 px-2 py-0.5 rounded">
                        Sends instant notification
                      </span>
                    </div>

                    <textarea
                      rows={4}
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Write a clear, helpful reply..."
                      className="w-full p-4 border border-gray-200 rounded-lg text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316] mb-4 resize-none"
                    />

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isReplying || !replyMessage.trim()}
                        className="bg-[#f97316] hover:bg-[#e06511] text-white font-medium text-[13px] px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        {isReplying ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                        Send Reply
                      </button>
                    </div>
                  </form>
                </div>

                {/* RIGHT COLUMN: Ticket metadata */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-xs space-y-4">
                    <h3 className="font-bold text-[#1a2642] text-[14px] pb-3 border-b border-gray-100">
                      Ticket Metadata
                    </h3>

                    <div>
                      <span className="text-gray-400 block mb-1 uppercase font-semibold">Company</span>
                      <Link
                        href={`/admin/companies/${ticket.company?._id || ticket.company}`}
                        className="font-bold text-[#f97316] hover:underline"
                      >
                        {compName} →
                      </Link>
                    </div>

                    <div>
                      <span className="text-gray-400 block mb-1 uppercase font-semibold">Requester</span>
                      <span className="font-medium text-[#1a2642]">{userName}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block mb-1 uppercase font-semibold">Category</span>
                      <span className="capitalize text-gray-700">{ticket.category || "General"}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block mb-1 uppercase font-semibold">Ticket ID</span>
                      <span className="font-mono text-gray-500 break-all">{ticket._id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
