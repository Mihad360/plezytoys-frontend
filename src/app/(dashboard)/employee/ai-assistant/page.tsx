"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, ArrowRight, Bot, Send, RefreshCw, User as UserIcon } from "lucide-react";
import { useAskAIQuestionMutation } from "@/redux/api/employeeApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

interface IMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

export default function EmployeeAIAssistantPage() {
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [askAI, { isLoading: isAsking }] = useAskAIQuestionMutation();

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isAsking) return;

    const userMsg: IMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");

    try {
      const response = await askAI({ question: textToSend.trim() }).unwrap();
      const botAnswer =
        response?.data?.answer ||
        response?.message ||
        "I have processed your query based on our authorized operational knowledge base.";

      const botMsg: IMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botAnswer,
        time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: IMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text:
          err?.data?.message ||
          "I couldn't process your request right now. Please try again or contact your site manager.",
        time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">
            SHIFTPOINT • EMPLOYEE
          </p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">AI Assistant</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/employee/notifications" className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#f97316] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
          </Link>
          <Link href="/employee/profile">
            <div className="w-10 h-10 rounded-full bg-[#f97316] hover:bg-[#e06511] cursor-pointer flex items-center justify-center text-white font-bold text-sm transition-colors">
              EM
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 flex flex-col">
        <div className="max-w-[1000px] mx-auto w-full flex-1 flex flex-col">
          <div className="mb-4 shrink-0 flex justify-between items-end">
            <div>
              <h2 className="text-[#1a2642] text-[28px] font-bold mb-1">AI Assistant</h2>
              <p className="text-gray-500 text-[14px]">
                Ask about your authorised locations, patrol activity, safety procedures, and reports.
              </p>
            </div>
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="text-xs text-gray-500 hover:text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RefreshCw size={12} /> Clear Chat
              </button>
            )}
          </div>

          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden min-h-[500px]">
            {/* Chat Messages or Welcome Screen */}
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-[650px] mx-auto">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-orange-50 rounded-full transform translate-x-2 translate-y-2"></div>
                  <div className="w-16 h-16 bg-[#1a2642] rounded-2xl flex items-center justify-center relative z-10 text-white shadow-lg">
                    <Bot size={32} />
                  </div>
                </div>

                <h3 className="text-[#1a2642] text-[26px] font-bold mb-2">How can I help today?</h3>
                <p className="text-gray-500 text-[14px] mb-8">
                  I can answer operational questions and locate records in your Employee portal.
                </p>

                <div className="flex flex-wrap justify-center gap-2.5">
                  <button
                    onClick={() => handleSend("What are the procedures for reporting missed checkpoints?")}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-[13px] text-gray-600 hover:border-[#f97316] hover:text-[#f97316] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    Checkpoint procedures <ArrowRight size={13} />
                  </button>
                  <button
                    onClick={() => handleSend("What should I do during emergency evacuation?")}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-[13px] text-gray-600 hover:border-[#f97316] hover:text-[#f97316] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    Emergency protocol <ArrowRight size={13} />
                  </button>
                  <button
                    onClick={() => handleSend("How do I submit an incident report?")}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-[13px] text-gray-600 hover:border-[#f97316] hover:text-[#f97316] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    Incident reports guide <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        msg.sender === "user"
                          ? "bg-[#f97316] text-white"
                          : "bg-[#1a2642] text-white"
                      }`}
                    >
                      {msg.sender === "user" ? <UserIcon size={16} /> : <Bot size={16} />}
                    </div>
                    <div
                      className={`max-w-[75%] rounded-xl px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
                        msg.sender === "user"
                          ? "bg-[#1a2642] text-white rounded-tr-none"
                          : "bg-gray-50 border border-gray-100 text-gray-800 rounded-tl-none whitespace-pre-wrap"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span
                        className={`text-[10px] block mt-1 text-right ${
                          msg.sender === "user" ? "text-gray-300" : "text-gray-400"
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
                {isAsking && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a2642] text-white flex items-center justify-center shrink-0">
                      <Bot size={16} />
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs text-gray-500 flex items-center gap-2">
                      <RefreshCw size={13} className="animate-spin text-[#f97316]" />
                      Thinking and reviewing knowledge base...
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about your locations, patrols or safety procedures..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316] shadow-sm"
                  disabled={isAsking}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputQuery.trim() || isAsking}
                  className="px-6 py-3 bg-[#f97316] hover:bg-[#e06511] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-[14px] font-medium shadow-sm transition-colors flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Send</span>
                  <Send size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
