"use client";

import { Bell, Search, Paperclip, Send, RefreshCw, MessageSquare, Plus, User, ArrowLeft, Check, CheckCheck } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  useGetMyConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useSendAttachmentMutation,
  useCreateOrGetConversationMutation,
} from "@/redux/api/chatApi";
import { useGetManagerEmployeesQuery } from "@/redux/api/managerApi";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function ManagerMessagesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "individual">("all");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageText, setMessageText] = useState("");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile
  const { data: profileData } = useGetMyProfileQuery(undefined);
  const currentUser = profileData?.data;

  // Notification count
  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  // Conversations
  const {
    data: conversationsData,
    isLoading: isConvLoading,
    refetch: refetchConversations,
  } = useGetMyConversationsQuery();
  const conversations = conversationsData?.data || [];

  // Team employees for starting a new chat
  const { data: employeesData } = useGetManagerEmployeesQuery();
  const employees = employeesData?.data || [];

  // Active messages
  const {
    data: messagesData,
    isLoading: isMsgLoading,
    refetch: refetchMessages,
  } = useGetMessagesQuery(
    { conversationId: selectedConversationId! },
    { skip: !selectedConversationId }
  );
  const messages = messagesData?.data || [];

  // Mutations
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
  const [sendAttachment, { isLoading: isUploading }] = useSendAttachmentMutation();
  const [createOrGetConversation] = useCreateOrGetConversationMutation();

  // Automatically select first conversation if available
  useEffect(() => {
    if (!selectedConversationId && conversations.length > 0) {
      setSelectedConversationId(conversations[0]._id);
    }
  }, [conversations, selectedConversationId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageText.trim() || !selectedConversationId) return;

    const text = messageText.trim();
    setMessageText("");
    try {
      await sendMessage({
        conversationId: selectedConversationId,
        content: text,
      }).unwrap();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !selectedConversationId) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    try {
      await sendAttachment({
        conversationId: selectedConversationId,
        formData,
      }).unwrap();
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Failed to upload attachment:", err);
    }
  };

  const handleStartChatWithEmployee = async (employeeUserId: string) => {
    try {
      const res = await createOrGetConversation({ recipientId: employeeUserId }).unwrap();
      const newConv = res.data;
      if (newConv?._id) {
        setSelectedConversationId(newConv._id);
        setIsNewChatOpen(false);
      }
    } catch (err) {
      console.error("Failed to create conversation:", err);
    }
  };

  // Find active conversation details
  const activeConversation = conversations.find(
    (c: any) => c._id === selectedConversationId
  );

  const getOtherParticipant = (conv: any) => {
    if (!conv?.participants || !currentUser) return null;
    return conv.participants.find((p: any) => {
      const id = p?._id || p;
      return id !== currentUser?._id;
    });
  };

  const activeOtherUser = activeConversation ? getOtherParticipant(activeConversation) : null;
  const activeChatName = activeOtherUser?.name || "Direct Message";
  const activeChatRole = activeOtherUser?.role?.replace("_", " ") || "Staff";

  // Filter conversations
  const filteredConversations = conversations.filter((c: any) => {
    const other = getOtherParticipant(c);
    const name = other?.name?.toLowerCase() || "";
    return name.includes(searchTerm.toLowerCase());
  });

  const userInitials = currentUser?.name
    ? currentUser.name
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
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">
            SHIFTPOINT • COMMUNICATION • CHAT
          </p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Messages & Team Dispatch</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              refetchConversations();
              if (selectedConversationId) refetchMessages();
            }}
            title="Refresh Conversations"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} className={isConvLoading || isMsgLoading ? "animate-spin" : ""} />
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

      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Conversations) */}
        <div className="w-[340px] bg-white border-r border-gray-100 flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-100 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-[#1a2642] text-[18px] font-bold">Conversations</h2>
              <button
                onClick={() => setIsNewChatOpen(true)}
                className="p-1.5 bg-[#b45f06] hover:bg-[#964f05] text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                title="Start New Chat"
              >
                <Plus size={15} /> New Chat
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#b45f06]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto divide-y divide-gray-50">
            {isConvLoading ? (
              <div className="p-8 text-center text-gray-400 text-xs">
                <RefreshCw size={20} className="mx-auto mb-2 animate-spin text-[#f97316]" />
                Loading conversations...
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-xs">
                <MessageSquare size={32} className="mx-auto mb-2 text-gray-300" />
                <p className="font-semibold text-gray-600">No conversations found</p>
                <p className="mt-1">Click &quot;New Chat&quot; to message field staff.</p>
              </div>
            ) : (
              filteredConversations.map((conv: any) => {
                const other = getOtherParticipant(conv);
                const isSelected = conv._id === selectedConversationId;
                const otherName = other?.name || "Team Member";
                const otherRole = other?.role?.replace("_", " ") || "Staff";
                const initials = otherName
                  .split(" ")
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();

                const timeFormatted = conv.lastMessageAt
                  ? new Date(conv.lastMessageAt).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "";

                return (
                  <div
                    key={conv._id}
                    onClick={() => setSelectedConversationId(conv._id)}
                    className={`p-4 cursor-pointer flex gap-3 relative transition-colors ${
                      isSelected
                        ? "border-l-4 border-[#b45f06] bg-orange-50/40"
                        : "hover:bg-gray-50/80"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[12px] shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <h4 className="text-[#1a2642] text-[13px] font-bold truncate">{otherName}</h4>
                        {timeFormatted && (
                          <span className="text-gray-400 text-[10px] shrink-0">{timeFormatted}</span>
                        )}
                      </div>
                      <p className="text-gray-400 text-[10px] capitalize mb-1">{otherRole}</p>
                      <p className="text-gray-500 text-[12px] truncate">
                        {conv.lastMessage || "No messages yet"}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedConversationId && activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="h-[72px] border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a2642] flex items-center justify-center text-white font-bold text-[12px]">
                    {activeChatName
                      .split(" ")
                      .map((n: string) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-[#1a2642] text-[15px] font-bold">{activeChatName}</h3>
                    <p className="text-emerald-500 text-[11px] font-medium capitalize flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {activeChatRole}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-auto p-8 flex flex-col gap-4 bg-gray-50/30">
                {isMsgLoading ? (
                  <div className="py-12 text-center text-gray-400 text-xs">Loading message history...</div>
                ) : messages.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 text-xs">
                    <MessageSquare size={32} className="mx-auto mb-2 text-gray-300" />
                    <p className="font-semibold text-gray-600">No messages in this chat yet.</p>
                    <p className="mt-1">Send a dispatch note or question below.</p>
                  </div>
                ) : (
                  messages.map((msg: any) => {
                    const senderId = msg.senderId?._id || msg.senderId;
                    const isMe = senderId === currentUser?._id;
                    const senderName = msg.senderId?.name || (isMe ? "You" : activeChatName);
                    const time = msg.createdAt
                      ? new Date(msg.createdAt).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "";

                    return (
                      <div
                        key={msg._id}
                        className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                      >
                        <span className="text-gray-400 text-[10px] mb-1 px-1">
                          {isMe ? "You" : senderName} • {time}
                        </span>

                        <div
                          className={`px-4 py-2.5 rounded-2xl text-[13px] max-w-[70%] break-words shadow-xs ${
                            isMe
                              ? "bg-[#1a2642] text-white rounded-tr-sm"
                              : "bg-white border border-gray-100 text-[#1a2642] rounded-tl-sm"
                          }`}
                        >
                          {msg.content}

                          {msg.attachments && msg.attachments.length > 0 && (
                            <div className="mt-2 space-y-1.5">
                              {msg.attachments.map((att: any, idx: number) => (
                                <a
                                  key={idx}
                                  href={att.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={`p-2 rounded flex items-center gap-2 text-xs font-medium ${
                                    isMe ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                  }`}
                                >
                                  <Paperclip size={13} />
                                  <span className="truncate">{att.name || "Attachment"}</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white flex items-center gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  id="chat-file-input"
                  multiple
                />
                <label
                  htmlFor="chat-file-input"
                  className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  title="Attach file"
                >
                  <Paperclip size={18} />
                </label>

                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message or operational dispatch..."
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#b45f06]"
                />

                <button
                  type="submit"
                  disabled={!messageText.trim() || isSending || isUploading}
                  className="px-5 py-2.5 bg-[#b45f06] hover:bg-[#964f05] text-white rounded-lg text-[13px] font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <Send size={15} /> Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
              <MessageSquare size={48} className="text-gray-300 mb-3" />
              <h3 className="font-bold text-[#1a2642] text-base">Select a conversation</h3>
              <p className="text-xs text-gray-400 mt-1">Or start a new chat with an employee or manager.</p>
              <button
                onClick={() => setIsNewChatOpen(true)}
                className="mt-4 px-4 py-2 bg-[#b45f06] hover:bg-[#964f05] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Start New Conversation
              </button>
            </div>
          )}
        </div>
      </main>

      {/* New Chat Modal */}
      {isNewChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[460px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-[#1a2642] font-bold text-base">New Direct Message</h3>
                <p className="text-gray-400 text-xs mt-0.5">Start communicating with facility staff</p>
              </div>
              <button onClick={() => setIsNewChatOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">
                ✕
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto divide-y divide-gray-50">
              {employees.length === 0 ? (
                <p className="text-gray-400 text-xs py-8 text-center">No team employees found.</p>
              ) : (
                employees.map((emp: any) => {
                  const empName = emp.name || `${emp.firstName || ""} ${emp.lastName || ""}`.trim() || emp.email;
                  const empInitials = empName
                    .split(" ")
                    .map((n: string) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();

                  return (
                    <div
                      key={emp._id}
                      onClick={() => handleStartChatWithEmployee(emp._id)}
                      className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#f97316] text-white font-bold text-xs flex items-center justify-center">
                          {empInitials}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1a2642]">{empName}</p>
                          <p className="text-[11px] text-gray-400">{emp.employeeId || emp.email}</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#b45f06] font-semibold">Message →</span>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setIsNewChatOpen(false)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
