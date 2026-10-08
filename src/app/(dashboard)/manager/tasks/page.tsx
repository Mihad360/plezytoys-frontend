"use client";

import { Bell, RefreshCw, AlertCircle, CheckCircle2, Clock, Search, ArrowRight, Plus, Check, X, Undo2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  useGetManagerTasksQuery,
  useGetManagerLocationsQuery,
  useGetManagerEmployeesQuery,
  useCreateTaskMutation,
  useReviewTaskMutation,
} from "@/redux/api/managerApi";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";

export default function ManagerTasksPage() {
  const [selectedLocationId, setSelectedLocationId] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  // Create Task Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [taskLocation, setTaskLocation] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [requiresEvidence, setRequiresEvidence] = useState(false);
  const [checklistItems, setChecklistItems] = useState<{ text: string; isMandatory: boolean }[]>([]);
  const [newChecklistText, setNewChecklistText] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  // Review task state
  const [reviewNotes, setReviewNotes] = useState("");

  const { data: profileData } = useGetMyProfileQuery(undefined);
  const manager = profileData?.data;

  const { data: locationsData } = useGetManagerLocationsQuery();
  const locations = locationsData?.data || [];

  const { data: employeesData } = useGetManagerEmployeesQuery(
    taskLocation ? { locationId: taskLocation } : undefined
  );
  const employees = employeesData?.data || [];

  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [reviewTask, { isLoading: isReviewing }] = useReviewTaskMutation();


  const {
    data: tasksData,
    isLoading,
    isError,
    refetch,
  } = useGetManagerTasksQuery({
    locationId: selectedLocationId === "all" ? undefined : selectedLocationId,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const { data: unreadNotifData } = useGetUnreadCountQuery(undefined);
  const unreadCount = unreadNotifData?.data?.unreadCount ?? 0;

  const tasks = tasksData?.data || [];

  const pendingCount = tasks.filter((t: any) => ["assigned", "pending", "in_progress"].includes(t.status)).length;
  const completedCount = tasks.filter((t: any) => ["completed", "submitted", "approved"].includes(t.status)).length;
  const overdueCount = tasks.filter((t: any) => t.status === "overdue").length;

  const filteredTasks = tasks.filter((t: any) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const title = (t.title || "").toLowerCase();
    const assignee = (t.assignedTo?.name || `${t.assignedTo?.firstName || ""} ${t.assignedTo?.lastName || ""}`).toLowerCase();
    return title.includes(term) || assignee.includes(term);
  });

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
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Tasks & Checklists</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 bg-orange-50 border border-orange-100 text-[#d97706] rounded-full text-[13px] font-medium">
            Location scope:{" "}
            {selectedLocationId === "all"
              ? "All Locations"
              : locations.find((l: any) => l._id === selectedLocationId)?.name || "Selected"}
          </div>
          <button
            onClick={() => refetch()}
            title="Refresh Tasks"
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
        <div className="max-w-[1200px] mx-auto">
          {/* Quick Metrics */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">TOTAL TASKS</p>
              <p className="text-[#1a2642] font-bold text-[32px] leading-none">
                {isLoading ? "..." : tasks.length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">PENDING / IN PROGRESS</p>
              <p className="text-orange-500 font-bold text-[32px] leading-none">
                {isLoading ? "..." : pendingCount}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">COMPLETED</p>
              <p className="text-emerald-500 font-bold text-[32px] leading-none">
                {isLoading ? "..." : completedCount}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-400 text-[11px] font-bold tracking-wide uppercase mb-2">OVERDUE</p>
              <p className="text-red-500 font-bold text-[32px] leading-none">
                {isLoading ? "..." : overdueCount}
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <div className="relative w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search task title or assignee..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#f97316] shadow-sm"
                />
              </div>
              <div className="relative w-[240px]">
                <select
                  value={selectedLocationId}
                  onChange={(e) => setSelectedLocationId(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-[13px] text-[#1a2642] focus:outline-none shadow-sm cursor-pointer"
                >
                  <option value="all">All assigned locations</option>
                  {locations.map((loc: any) => (
                    <option key={loc._id} value={loc._id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative w-[180px]">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-[13px] text-[#1a2642] focus:outline-none shadow-sm cursor-pointer"
                >
                  <option value="all">All statuses</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="submitted">Submitted</option>
                  <option value="completed">Completed</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                setActionError("");
                setActionSuccess("");
                setIsCreateModalOpen(true);
              }}
              className="px-4 py-2 bg-[#b45f06] hover:bg-[#964f05] text-white rounded-lg text-[13px] font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus size={16} /> Assign New Task
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
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-700">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">Failed to retrieve tasks list.</p>
              </div>
              <button
                onClick={() => refetch()}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
              >
                Retry
              </button>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-[10px] font-bold tracking-wider uppercase bg-gray-50/50">
                  <th className="py-4 px-6">Task</th>
                  <th className="py-4 px-6">Assignee</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Priority</th>
                  <th className="py-4 px-6">Due Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      Loading tasks...
                    </td>
                  </tr>
                ) : filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      No matching tasks found.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task: any) => {
                    const assigneeName =
                      task.assignedTo?.name ||
                      `${task.assignedTo?.firstName || ""} ${task.assignedTo?.lastName || ""}`.trim() ||
                      "Unassigned";
                    const locName = task.location?.name || "Assigned Site";

                    const dueDateFormatted = task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "Today 16:00";

                    return (
                      <tr key={task._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                        <td className="py-4 px-6">
                          <p className="font-semibold text-[#1a2642]">{task.title}</p>
                          <p className="text-[11px] text-gray-400 font-mono">
                            {task.taskId || `TSK-${task._id.slice(-5)}`}
                          </p>
                        </td>
                        <td className="py-4 px-6 text-gray-600">{assigneeName}</td>
                        <td className="py-4 px-6 text-gray-600">{locName}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${
                              task.priority === "high"
                                ? "bg-red-50 text-red-700"
                                : task.priority === "medium"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {task.priority || "Medium"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-600">{dueDateFormatted}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${
                              task.status === "completed" || task.status === "approved"
                                ? "bg-emerald-50 text-emerald-700"
                                : task.status === "overdue" || task.status === "rejected"
                                ? "bg-red-50 text-red-700"
                                : task.status === "submitted"
                                ? "bg-purple-50 text-purple-700 font-bold"
                                : "bg-orange-50 text-orange-700"
                            }`}
                          >
                            {task.status || "Pending"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => {
                              setSelectedTask(task);
                              setReviewNotes("");
                              setActionError("");
                            }}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                          >
                            {task.status === "submitted" ? "Review" : "Details"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Task Details & Review Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[580px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-[#1a2642] font-bold text-base">{selectedTask.title}</h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  {selectedTask.location?.name || "Facility"} • Assigned to: {selectedTask.assignedTo?.firstName || selectedTask.assignedTo?.name || "Staff"}
                </p>
              </div>
              <button onClick={() => setSelectedTask(null)} className="text-gray-400 hover:text-gray-600 text-lg">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs text-gray-700 max-h-[60vh] overflow-y-auto">
              <div>
                <p className="text-gray-400 font-semibold mb-1 uppercase text-[10px]">Status & Priority:</p>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 rounded bg-gray-100 font-medium capitalize text-gray-700">
                    Status: {selectedTask.status}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-amber-50 font-medium capitalize text-amber-700">
                    Priority: {selectedTask.priority}
                  </span>
                  {selectedTask.requiresEvidence && (
                    <span className="px-2.5 py-1 rounded bg-blue-50 font-medium text-blue-700">
                      Requires Photo Evidence
                    </span>
                  )}
                </div>
              </div>

              {selectedTask.description && (
                <div>
                  <p className="text-gray-400 font-semibold mb-1 uppercase text-[10px]">Instructions:</p>
                  <p className="bg-gray-50 p-3 rounded-lg border border-gray-100">{selectedTask.description}</p>
                </div>
              )}

              {selectedTask.checklist && selectedTask.checklist.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-gray-400 font-semibold mb-1 uppercase text-[10px]">Checklist Items:</p>
                  {selectedTask.checklist.map((c: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50/50 rounded border border-gray-100">
                      <input type="checkbox" checked={c.isCompleted} readOnly className="rounded border-gray-300" />
                      <span className={c.isCompleted ? "line-through text-gray-400" : "text-[#1a2642]"}>
                        {c.text || c.title} {c.isMandatory && <span className="text-red-500 font-bold">*</span>}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {selectedTask.completionNotes && (
                <div>
                  <p className="text-gray-400 font-semibold mb-1 uppercase text-[10px]">Employee Completion Notes:</p>
                  <p className="bg-purple-50 p-3 rounded-lg border border-purple-100 text-purple-900">
                    {selectedTask.completionNotes}
                  </p>
                </div>
              )}

              {selectedTask.attachments && selectedTask.attachments.length > 0 && (
                <div>
                  <p className="text-gray-400 font-semibold mb-1 uppercase text-[10px]">Submitted Evidence:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedTask.attachments.map((att: any, idx: number) => (
                      <a key={idx} href={att.fileUrl} target="_blank" rel="noreferrer" className="block border rounded p-1 hover:border-orange-500">
                        <img src={att.fileUrl} alt="Evidence" className="aspect-square object-cover rounded w-full" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Review Section if Submitted */}
              {selectedTask.status === "submitted" && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 bg-orange-50/30 p-3 rounded-lg border">
                  <p className="font-bold text-[#1a2642] text-[12px]">Manager Task Review</p>
                  <textarea
                    rows={2}
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add optional review or revision feedback..."
                    className="w-full p-2 bg-white border border-gray-200 rounded text-xs focus:outline-none focus:border-[#b45f06]"
                  />
                  <div className="flex gap-2">
                    <button
                      disabled={isReviewing}
                      onClick={async () => {
                        try {
                          await reviewTask({ id: selectedTask._id, status: "approved", reviewNotes }).unwrap();
                          setActionSuccess("Task approved successfully!");
                          setSelectedTask(null);
                        } catch (err: any) {
                          setActionError(err?.data?.message || "Failed to approve task.");
                        }
                      }}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <Check size={14} /> Approve Task
                    </button>
                    <button
                      disabled={isReviewing}
                      onClick={async () => {
                        try {
                          await reviewTask({ id: selectedTask._id, status: "returned", reviewNotes }).unwrap();
                          setActionSuccess("Task returned for revision!");
                          setSelectedTask(null);
                        } catch (err: any) {
                          setActionError(err?.data?.message || "Failed to return task.");
                        }
                      }}
                      className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <Undo2 size={14} /> Return for Fix
                    </button>
                    <button
                      disabled={isReviewing}
                      onClick={async () => {
                        try {
                          await reviewTask({ id: selectedTask._id, status: "rejected", reviewNotes }).unwrap();
                          setActionSuccess("Task rejected.");
                          setSelectedTask(null);
                        } catch (err: any) {
                          setActionError(err?.data?.message || "Failed to reject task.");
                        }
                      }}
                      className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <X size={14} /> Reject Task
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-5 py-2 bg-[#1a2642] hover:bg-[#233355] text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a2642]/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[620px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-[#1a2642] font-bold text-base">Assign New Facility Task</h3>
                <p className="text-gray-400 text-xs mt-0.5">Delegate checklist or action items to security / operations staff</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!title.trim()) {
                  setActionError("Task title is required.");
                  return;
                }
                try {
                  await createTask({
                    title,
                    description,
                    priority,
                    location: taskLocation || undefined,
                    assignedTo: assignedTo || undefined,
                    dueDate: dueDate || undefined,
                    requiresEvidence,
                    checklist: checklistItems,
                  }).unwrap();

                  setActionSuccess("Task created and assigned successfully!");
                  setIsCreateModalOpen(false);
                  // Reset fields
                  setTitle("");
                  setDescription("");
                  setTaskLocation("");
                  setAssignedTo("");
                  setDueDate("");
                  setChecklistItems([]);
                  setRequiresEvidence(false);
                } catch (err: any) {
                  setActionError(err?.data?.message || "Failed to create task.");
                }
              }}
              className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
            >
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Inspect Perimeter Cameras & Emergency Gates"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#b45f06]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Instructions / Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed guidelines or specific checklist actions to verify..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#b45f06]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Facility Location</label>
                  <select
                    value={taskLocation}
                    onChange={(e) => setTaskLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="">Select facility location...</option>
                    {locations.map((loc: any) => (
                      <option key={loc._id} value={loc._id}>{loc.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Assign Staff</label>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="">Assign to an employee...</option>
                    {employees.map((emp: any) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name || `${emp.firstName || ""} ${emp.lastName || ""}`.trim()} ({emp.employeeId || emp.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Due Date</label>
                  <input
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="evidence"
                  checked={requiresEvidence}
                  onChange={(e) => setRequiresEvidence(e.target.checked)}
                  className="rounded border-gray-300 text-[#b45f06]"
                />
                <label htmlFor="evidence" className="text-xs font-medium text-gray-700 cursor-pointer">
                  Require photo proof / evidence upon task completion
                </label>
              </div>

              {/* Checklist builder */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Checklist Items</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newChecklistText}
                    onChange={(e) => setNewChecklistText(e.target.value)}
                    placeholder="Add a checklist item..."
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (newChecklistText.trim()) {
                          setChecklistItems([...checklistItems, { text: newChecklistText.trim(), isMandatory: true }]);
                          setNewChecklistText("");
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newChecklistText.trim()) {
                        setChecklistItems([...checklistItems, { text: newChecklistText.trim(), isMandatory: true }]);
                        setNewChecklistText("");
                      }
                    }}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                {checklistItems.length > 0 && (
                  <div className="space-y-1.5 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    {checklistItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs bg-white p-2 rounded border border-gray-200">
                        <span>• {item.text}</span>
                        <button
                          type="button"
                          onClick={() => setChecklistItems(checklistItems.filter((_, i) => i !== idx))}
                          className="text-red-500 hover:text-red-700 text-xs font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-5 py-2 bg-[#b45f06] hover:bg-[#964f05] text-white rounded-lg text-xs font-semibold shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isCreating ? "Assigning..." : "Assign Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

