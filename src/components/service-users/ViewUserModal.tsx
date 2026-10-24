import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import type { ServiceUser } from "@/constants/serviceUsers";
import margaretJohnsonAvatar from "../../assets/margaret_johnson.png";
import { ArchiveUserModal } from "./ArchiveUserModal";
import { UpdateRiskModal } from "./UpdateRiskModal";
import { Edit, AlertTriangle, Info, Trash2, Eye, User, Phone, MapPin, PhoneCall } from "lucide-react";

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: ServiceUser | null;
}

export function ViewUserModal({ isOpen, onClose, user }: ViewUserModalProps) {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isUpdateRiskModalOpen, setIsUpdateRiskModalOpen] = useState(false);

  if (!user) return null;

  // Fallback to empty arrays if data is missing for some mock users
  const assignedStaff = user.assignedStaff || [];
  const incidents = user.incidents || [];
  const auditHistory = user.auditHistory || {
    createdBy: "system_admin",
    createdAt: "N/A"
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} width="3xl" height="3xl">
        <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-5">
          <h3 className="text-base font-bold ">View details</h3>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            {user.name === "Margaret Johnson" || user.name === "Margaret Thompson" ? (
              <img
                src={margaretJohnsonAvatar}
                alt={user.name}
                className="h-16 w-16 rounded-full object-cover border border-slate-100"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-[#EBF6FC] text-primary flex items-center justify-center text-xl font-bold border border-slate-100">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold  m-0">{user.name}</h2>
              <p className="text-sm font-medium text-muted mt-0.5">{user.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-full transition-all cursor-pointer">
              <Edit size={14} />
              <span>Edit</span>
            </button>
            <button 
              onClick={() => setIsUpdateRiskModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-full transition-all cursor-pointer"
            >
              <AlertTriangle size={14} />
              <span>Update risk</span>
            </button>
            <button 
              onClick={() => setIsArchiveModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full transition-all cursor-pointer"
            >
              <div className="bg-white text-red-600 rounded-full p-0.5 flex items-center justify-center h-4 w-4">
                <Info size={12} strokeWidth={3} />
              </div>
              <span>Archive</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="flex overflow-x-auto gap-4 mb-6 pb-2 no-scrollbar">
          <div className="bg-slate-50/70 p-4 rounded-xl min-w-[140px] flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 mb-1">
              <div className={`h-2 w-2 rounded-full ${user.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`}></div>
              <span className="font-semibold  text-[15px]">{user.status}</span>
            </div>
            <p className="text-xs font-medium text-muted">Status</p>
          </div>
          
          <div className="bg-slate-50/70 p-4 rounded-xl min-w-[140px] flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 mb-1">
              <div className={`h-2 w-2 rounded-full ${user.riskLevel === "High" ? "bg-red-500" : user.riskLevel === "Medium" ? "bg-amber-500" : "bg-emerald-500"}`}></div>
              <span className="font-semibold  text-[15px]">{user.riskLevel}</span>
            </div>
            <p className="text-xs font-medium text-muted">Risk level</p>
          </div>

          <div className="bg-slate-50/70 p-4 rounded-xl min-w-[120px] flex-1 flex flex-col justify-center">
            <div className="mb-1">
              <span className="font-semibold  text-[15px]">{user.age}</span>
            </div>
            <p className="text-xs font-medium text-muted">Age</p>
          </div>

          <div className="bg-slate-50/70 p-4 rounded-xl min-w-[140px] flex-1 flex flex-col justify-center">
            <div className="mb-1">
              <span className="font-semibold  text-[15px]">{assignedStaff.length}</span>
            </div>
            <p className="text-xs font-medium text-muted">Assigned staff</p>
          </div>

          <div className="bg-slate-50/70 p-4 rounded-xl min-w-[120px] flex-1 flex flex-col justify-center">
            <div className="mb-1">
              <span className="font-semibold  text-[15px]">{incidents.length}</span>
            </div>
            <p className="text-xs font-medium text-muted">Incidents</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 mb-6">
          {["Overview", "Assigned staff", "Incidents", "Audit history"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs font-semibold transition-all border-b-2 ${
                activeTab === tab
                  ? "border-[#38BDF8] bg-sky-50/30 text-[#38BDF8] rounded-t-xl"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              } cursor-pointer`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[200px]">
          {activeTab === "Overview" && (
            <div className="animate-fade-in duration-200">
              {/* Contact Information */}
              <div className="mb-8">
                <h4 className="text-[13px] font-bold  uppercase tracking-wider mb-4">Contact Information</h4>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Phone size={16} className="text-[#38BDF8]" />
                      <span className="text-[13px] font-medium text-muted">Phone</span>
                    </div>
                    <p className="text-[14px] font-medium  ml-6">{user.phone || "N/A"}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={16} className="text-[#38BDF8]" />
                      <span className="text-[13px] font-medium text-muted">Address</span>
                    </div>
                    <p className="text-[14px] font-medium  ml-6">{user.address || "N/A"}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <PhoneCall size={16} className="text-[#38BDF8]" />
                      <span className="text-[13px] font-medium text-muted">Emergency contact</span>
                    </div>
                    <div className="ml-6">
                      <p className="text-[14px] font-medium ">
                        {user.emergencyContact ? `${user.emergencyContact.name} (${user.emergencyContact.relation})` : "N/A"}
                      </p>
                      {user.emergencyContact && (
                        <p className="text-[14px] font-medium  mt-0.5">{user.emergencyContact.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Border separator */}
              <div className="border-b border-slate-100 mb-8"></div>

              {/* Medical Information */}
              <div className="mb-8">
                <h4 className="text-[13px] font-bold  uppercase tracking-wider mb-4">Medical Information</h4>
                
                <div className="mb-5">
                  <p className="text-[13px] font-medium text-muted mb-2">Medical conditions</p>
                  <div className="flex flex-wrap gap-2">
                    {user.medicalInfo?.conditions?.length ? (
                      user.medicalInfo.conditions.map(c => (
                        <span key={c} className="px-3 py-1 bg-slate-50 text-slate-700 text-[13px] font-semibold rounded-full border border-slate-100">{c}</span>
                      ))
                    ) : <span className="text-[13px] text-slate-400">None</span>}
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-[13px] font-medium text-muted mb-2">Allergies information</p>
                  <div className="flex flex-wrap gap-2">
                    {user.medicalInfo?.allergies?.length ? (
                      user.medicalInfo.allergies.map(a => (
                        <span key={a} className="px-3 py-1 bg-slate-50 text-slate-700 text-[13px] font-semibold rounded-full border border-slate-100">{a}</span>
                      ))
                    ) : <span className="text-[13px] text-slate-400">None</span>}
                  </div>
                </div>

                <div>
                  <p className="text-[13px] font-medium text-muted mb-2">Risk flags</p>
                  <div className="flex flex-wrap gap-2">
                    {user.medicalInfo?.riskFlags?.length ? (
                      user.medicalInfo.riskFlags.map(r => (
                        <span key={r} className="px-3 py-1 bg-red-50 text-red-600 text-[13px] font-semibold rounded-full border border-red-100">{r}</span>
                      ))
                    ) : <span className="text-[13px] text-slate-400">None</span>}
                  </div>
                </div>
              </div>

              {/* Border separator */}
              <div className="border-b border-slate-100 mb-8"></div>

              {/* Primary Care Team */}
              <div>
                <h4 className="text-[13px] font-bold  uppercase tracking-wider mb-4">Primary Care Team</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User size={16} className="text-[#38BDF8]" />
                      <span className="text-[13px] font-medium text-muted">Primary care worker</span>
                    </div>
                    <p className="text-[14px] font-medium  ml-6">{user.careTeam?.primary || "N/A"}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User size={16} className="text-[#38BDF8]" />
                      <span className="text-[13px] font-medium text-muted">Secondary care worker</span>
                    </div>
                    <p className="text-[14px] font-medium  ml-6">{user.careTeam?.secondary || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Assigned staff" && (
            <div className="animate-fade-in duration-200">
              <h4 className="text-[13px] font-extrabold  uppercase tracking-wider mb-1">Assigned Care Workers</h4>
              <p className="text-xs font-medium text-muted mb-4">Staff members assigned to this service user</p>

              {assignedStaff.length > 0 ? (
                <div className="border border-slate-100 rounded-2xl bg-white flex flex-col">
                  {assignedStaff.map((staff, i) => (
                    <div key={staff.id} className={`flex items-center justify-between p-4 ${i !== assignedStaff.length - 1 ? "border-b border-slate-100" : ""}`}>
                      <div className="flex items-center gap-3">
                        <User size={16} className="text-[#38BDF8]" />
                        <span className="text-[13px] font-semibold ">{staff.name}</span>
                      </div>
                      <button className="text-red-500 hover:text-red-600 transition-colors cursor-pointer p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-sm font-medium text-muted">No staff members assigned</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "Incidents" && (
            <div className="animate-fade-in duration-200">
              <h4 className="text-[13px] font-extrabold  uppercase tracking-wider mb-1">Recent Incidents</h4>
              <p className="text-xs font-medium text-muted mb-4">{incidents.length} incidents this month</p>

              {incidents.length > 0 ? (
                <div className="border border-slate-100 rounded-2xl bg-white flex flex-col">
                  {incidents.map((incident, i) => (
                    <div key={incident.id} className={`flex items-center justify-between p-4 ${i !== incidents.length - 1 ? "border-b border-slate-100" : ""}`}>
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-400 text-white rounded-full p-0.5 flex items-center justify-center h-4 w-4">
                          <Info size={12} strokeWidth={3} />
                        </div>
                        <div>
                          <p className="text-[13px] font-bold ">{incident.title}</p>
                          <p className="text-[11px] font-medium text-slate-400 mt-0.5">Reported on {incident.date}</p>
                        </div>
                      </div>
                      <button className="text-[#38BDF8] hover:text-sky-500 transition-colors cursor-pointer p-1">
                        <Eye size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-sm font-medium text-muted">No incidents reported</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "Audit history" && (
            <div className="animate-fade-in duration-200">
              <h4 className="text-[13px] font-extrabold  uppercase tracking-wider mb-1">Audit History</h4>
              <p className="text-xs font-medium text-muted mt-1">Created by {auditHistory.createdBy} on {auditHistory.createdAt}</p>
            </div>
          )}
        </div>
      </Modal>

      {/* Nested Modals */}
      <ArchiveUserModal
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        onConfirm={() => {
          setIsArchiveModalOpen(false);
          onClose(); // maybe close main modal too or trigger toast
        }}
      />

      <UpdateRiskModal
        isOpen={isUpdateRiskModalOpen}
        onClose={() => setIsUpdateRiskModalOpen(false)}
        onConfirm={() => {
          setIsUpdateRiskModalOpen(false);
        }}
      />
    </>
  );
}
