"use client";

import { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";

export default function CreatePatrolRoutePage() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
        <div>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase mb-0.5">SHIFTPOINT • Operations • Create Patrol Route</p>
          <h1 className="text-[#1a2642] text-[18px] font-bold leading-tight">Create Patrol Route</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-orange-50 border border-orange-100 rounded-lg text-[#f97316] text-[13px] font-medium hover:bg-orange-100 transition-colors">
            <span className="text-[16px]">★</span> Subscription
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
              <Bell size={20} />
            </button>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center text-white font-bold text-sm">
            SA
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-[1000px] mx-auto p-8">
          
          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-8 bg-white py-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 1 ? 'bg-[#f97316] text-white' : 'bg-gray-100 text-gray-400'}`}>
                {step > 1 ? '✓' : '1'}
              </div>
              <span className={`text-[13px] font-medium ${step >= 1 ? 'text-[#f97316]' : 'text-gray-400'}`}>Details</span>
            </div>
            <div className={`w-12 h-0.5 mx-3 ${step > 1 ? 'bg-[#f97316]' : 'bg-gray-100'}`}></div>

            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 2 ? 'bg-[#f97316] text-white' : 'bg-gray-100 text-gray-400'}`}>
                {step > 2 ? '✓' : '2'}
              </div>
              <span className={`text-[13px] font-medium ${step >= 2 ? 'text-[#f97316]' : 'text-gray-400'}`}>Checkpoints</span>
            </div>
            <div className={`w-12 h-0.5 mx-3 ${step > 2 ? 'bg-[#f97316]' : 'bg-gray-100'}`}></div>

            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 3 ? 'bg-[#f97316] text-white' : 'bg-gray-100 text-gray-400'}`}>
                {step > 3 ? '✓' : '3'}
              </div>
              <span className={`text-[13px] font-medium ${step >= 3 ? 'text-[#f97316]' : 'text-gray-400'}`}>Schedule</span>
            </div>
            <div className={`w-12 h-0.5 mx-3 ${step > 3 ? 'bg-[#f97316]' : 'bg-gray-100'}`}></div>

            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 4 ? 'bg-[#f97316] text-white' : 'bg-gray-100 text-gray-400'}`}>
                {step > 4 ? '✓' : '4'}
              </div>
              <span className={`text-[13px] font-medium ${step >= 4 ? 'text-[#f97316]' : 'text-gray-400'}`}>Reminders & Escalation</span>
            </div>
            <div className={`w-12 h-0.5 mx-3 ${step > 4 ? 'bg-[#f97316]' : 'bg-gray-100'}`}></div>

            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 5 ? 'bg-[#f97316] text-white' : 'bg-gray-100 text-gray-400'}`}>
                5
              </div>
              <span className={`text-[13px] font-medium ${step >= 5 ? 'text-[#f97316]' : 'text-gray-400'}`}>Review & Activate</span>
            </div>
          </div>

          {/* Step Contents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-[#1a2642] text-[20px] font-bold mb-1">Route Details</h2>
                  <p className="text-gray-500 text-[14px]">Create a reusable patrol route template.</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Route name <span className="text-red-500">*</span></label>
                    <input type="text" defaultValue="Night Security Round" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Customer <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                        <option>ABC Security</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Location <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                        <option>Main Office</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                    <p className="text-gray-400 text-[11px] mt-2">Only locations belonging to the selected customer are available.</p>
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Description</label>
                    <input type="text" placeholder="Optional route description" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-6">
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#f97316] text-white flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5">i</div>
                    <div>
                      <h4 className="text-[#b45f06] text-[13px] font-bold mb-1">Employee assignment</h4>
                      <p className="text-[#b45f06] text-[13px]">Employee, team or role assignment is configured for each scheduled patrol occurrence — not on the route template.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-[#1a2642] text-[20px] font-bold mb-1">Checkpoints</h2>
                  <p className="text-gray-500 text-[14px]">Define the sequence of NFC checkpoints for this route.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-[13px]">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 border-b border-gray-200 text-[11px] font-semibold uppercase">
                        <th className="px-4 py-3">Order</th>
                        <th className="px-4 py-3">Checkpoint</th>
                        <th className="px-4 py-3">NFC Tag ID</th>
                        <th className="px-4 py-3">Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-3 font-bold text-[#f97316]">01</td>
                        <td className="px-4 py-3 text-[#1a2642]">Main Entrance</td>
                        <td className="px-4 py-3"><span className="px-2 py-1 bg-gray-100 rounded text-[11px] font-mono">NFC-001284</span></td>
                        <td className="px-4 py-3 text-gray-500">Main Entrance</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-3 font-bold text-[#f97316]">02</td>
                        <td className="px-4 py-3 text-[#1a2642]">Reception</td>
                        <td className="px-4 py-3"><span className="px-2 py-1 bg-gray-100 rounded text-[11px] font-mono">NFC-001285</span></td>
                        <td className="px-4 py-3 text-gray-500">Reception</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-3 font-bold text-[#f97316]">03</td>
                        <td className="px-4 py-3 text-[#1a2642]">Parking Area</td>
                        <td className="px-4 py-3"><span className="px-2 py-1 bg-gray-100 rounded text-[11px] font-mono">NFC-001286</span></td>
                        <td className="px-4 py-3 text-gray-500">Parking Area</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold text-[#f97316]">04</td>
                        <td className="px-4 py-3 text-[#1a2642]">Warehouse Gate</td>
                        <td className="px-4 py-3"><span className="px-2 py-1 bg-gray-100 rounded text-[11px] font-mono">NFC-001287</span></td>
                        <td className="px-4 py-3 text-gray-500">Warehouse Gate</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="bg-gray-50 p-3 text-center border-t border-gray-200">
                    <button className="text-[#f97316] text-[13px] font-medium">+ Add checkpoint</button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-[#1a2642] text-[20px] font-bold mb-1">Schedule</h2>
                  <p className="text-gray-500 text-[14px]">Define when the task runs and who can perform each scheduled occurrence.</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Effective start date <span className="text-red-500">*</span></label>
                    <input type="date" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Effective end date</label>
                    <div className="flex items-center gap-3">
                      <input type="date" disabled className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px]" />
                      <label className="flex items-center gap-2 text-[13px] text-gray-600">
                        <input type="checkbox" className="rounded text-[#f97316]" /> Set end date
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Start time <span className="text-red-500">*</span></label>
                    <input type="time" defaultValue="23:00" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">End time <span className="text-red-500">*</span></label>
                    <input type="time" defaultValue="01:00" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#f97316]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Company / Location time zone <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                      <option>Select a location above</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                  <p className="text-gray-400 text-[11px] mt-2">All task and checkpoint times are calculated using this time zone.</p>
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Repeat patrol</label>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-[#f97316] text-white rounded-lg text-[13px] font-medium">Once</button>
                    <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-[13px] font-medium hover:bg-gray-50">Every day</button>
                    <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-[13px] font-medium hover:bg-gray-50">Selected weekdays</button>
                    <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-[13px] font-medium hover:bg-gray-50">Weekends</button>
                    <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-[13px] font-medium hover:bg-gray-50">Custom interval</button>
                  </div>
                </div>

                <div>
                  <label className="block text-[#1a2642] text-[13px] font-medium mb-3">Assign each patrol occurrence to</label>
                  <div className="flex gap-6 mb-3">
                    <label className="flex items-center gap-2 text-[13px] text-[#1a2642]">
                      <input type="radio" name="assign" defaultChecked className="text-[#f97316]" /> Employee(s)
                    </label>
                    <label className="flex items-center gap-2 text-[13px] text-gray-600">
                      <input type="radio" name="assign" /> Team
                    </label>
                    <label className="flex items-center gap-2 text-[13px] text-gray-600">
                      <input type="radio" name="assign" /> Role
                    </label>
                  </div>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                      <option>Select employee(s)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Available in employee app</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                        <option>At scheduled start time</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Late after</label>
                      <div className="relative">
                        <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                          <option>10 minutes</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Missed after</label>
                      <div className="relative">
                        <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                          <option>30 minutes</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 text-green-700 text-[13px] p-4 rounded-lg border border-green-100">
                  Each scheduled patrol occurrence is stored separately. Employee assignments can change for future occurrences without changing the route template or previous patrol records.
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-[#1a2642] text-[20px] font-bold mb-1">Reminders & Escalation</h2>
                  <p className="text-gray-500 text-[14px]">Configure optional patrol reminders and checkpoint escalation rules.</p>
                </div>

                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="p-5 flex justify-between items-center bg-white border-b border-gray-100">
                    <div>
                      <p className="font-semibold text-[#1a2642] text-[14px]">Patrol Reminder</p>
                      <p className="text-gray-500 text-[13px] mt-0.5">Reminders are optional and apply only to the specific scheduled patrol occurrence.</p>
                    </div>
                    <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                    </div>
                  </div>

                  <div className="p-5 bg-white border-b border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="font-semibold text-[#1a2642] text-[14px]">Checkpoint Late Warning</p>
                        <p className="text-gray-500 text-[13px] mt-0.5">The assigned employee receives the first warning when a checkpoint becomes late.</p>
                      </div>
                      <div className="w-10 h-5 bg-[#f97316] rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Warning recipient</label>
                      <div className="relative w-[250px]">
                        <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                          <option>Assigned employee</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-white border-b border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <p className="font-semibold text-[#1a2642] text-[14px]">Missed Checkpoint</p>
                      <div className="w-10 h-5 bg-[#f97316] rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#1a2642] text-[13px] font-medium mb-2">Escalate after</label>
                      <div className="relative w-[250px]">
                        <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#1a2642] focus:outline-none focus:border-[#f97316]">
                          <option>15 minutes</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-red-200 bg-red-50/50 rounded-xl p-5">
                  <p className="font-semibold text-[#1a2642] text-[13px] mb-3">Alert Preview</p>
                  <div className="bg-white border border-red-200 rounded-lg p-4">
                    <p className="text-red-500 text-[13px] font-bold flex items-center gap-2 mb-2">⚠️ Late checkpoint</p>
                    <p className="text-[#1a2642] font-semibold text-[14px] mb-1">Checkpoint is late</p>
                    <div className="text-gray-600 text-[12px] leading-relaxed">
                      Route: Night Security Round<br />
                      Checkpoint: Parking Area<br />
                      Employee: John Smith<br />
                      Location: Main Office<br />
                      Planned time: 23:30<br />
                      Status: Late
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-[#1a2642] text-[20px] font-bold mb-1">Review Patrol Route</h2>
                  <p className="text-gray-500 text-[14px]">Review your route configuration before activating it.</p>
                </div>

                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wider uppercase">ROUTE DETAILS</p>
                  </div>
                  <div className="p-5 grid grid-cols-3 gap-y-4">
                    <div className="col-span-1 text-gray-500 text-[13px]">Route name</div>
                    <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">Night Security Round</div>
                    
                    <div className="col-span-1 text-gray-500 text-[13px]">Customer</div>
                    <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">ABC Security</div>
                    
                    <div className="col-span-1 text-gray-500 text-[13px]">Location</div>
                    <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">Main Office</div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wider uppercase">SCHEDULE</p>
                  </div>
                  <div className="p-5 grid grid-cols-3 gap-y-4">
                    <div className="col-span-1 text-gray-500 text-[13px]">Effective period</div>
                    <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">01 Sep 2026 – No end date</div>
                    
                    <div className="col-span-1 text-gray-500 text-[13px]">Patrol time</div>
                    <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">23:00 – 01:00 (+1 day)</div>
                    
                    <div className="col-span-1 text-gray-500 text-[13px]">Time zone</div>
                    <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">Europe/Amsterdam</div>
                    
                    <div className="col-span-1 text-gray-500 text-[13px]">Recurrence</div>
                    <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">Every day</div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                    <p className="text-gray-400 text-[10px] font-bold tracking-wider uppercase">ASSIGNMENT</p>
                  </div>
                  <div className="p-5 grid grid-cols-3 gap-y-4">
                    <div className="col-span-1 text-gray-500 text-[13px]">Assignment type</div>
                    <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">Team</div>
                    
                    <div className="col-span-1 text-gray-500 text-[13px]">Assigned team</div>
                    <div className="col-span-2 text-[#1a2642] text-[13px] font-medium">Night Security Team</div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
              <div className="flex gap-3">
                <button className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-600 hover:bg-gray-50">
                  Save as Draft
                </button>
              </div>
              <div className="flex gap-3">
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="px-5 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-[#1a2642] hover:bg-gray-50">
                    Back
                  </button>
                )}
                <button 
                  onClick={() => {
                    if (step < 5) setStep(step + 1);
                    else window.location.href = '/company-admin/patrol-routes';
                  }}
                  className={`px-6 py-2.5 text-white rounded-lg text-[14px] font-medium ${step === 5 ? 'bg-[#10b981] hover:bg-[#059669]' : 'bg-[#f97316] hover:bg-[#e06511]'}`}
                >
                  {step === 5 ? 'Save & Activate Route' : 'Continue'}
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
