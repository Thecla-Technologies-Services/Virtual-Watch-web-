import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Upload,
} from "lucide-react";
import {User, Camera} from "@duo-icons/react"

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvitation?: (email: string) => void;
  onCreateUser?: (userData: any) => void;
  defaultTab?: "Personal info" | "Bank details";
}

export function CreateUserModal({
  isOpen,
  onClose,
  onSendInvitation,
  onCreateUser,
  defaultTab = "Personal info",
}: CreateUserModalProps) {
  const [activeTab, setActiveTab] = useState<"Personal info" | "Bank details">(
    defaultTab
  );
  const [openAccordion, setOpenAccordion] = useState<
    "userInfo" | "inviteWorker"
  >("userInfo");

  // Form states
  const [inviteEmail, setInviteEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userRole, setUserRole] = useState("Support Worker");
  const [department, setDepartment] = useState("Domiciliary Care");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateClick = () => {
    setIsCreating(true);
    setTimeout(() => {
      setIsCreating(false);
      if (onCreateUser) {
        onCreateUser({
          name: userName || accountName || "New User",
          email: userEmail || inviteEmail || "new.user@medstar.co.uk",
          phone: phone || "+44 7700 900077",
          role: userRole,
          department: department,
          insuranceNumber: insuranceNumber || "AB123456C",
          image: selectedImage,
          bankName: bankName || "Barclays Bank UK",
          accountNumber: accountNumber || "09847362527",
          accountName: accountName || userName || "Autoloads",
        });
      }
      onClose();
    }, 800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="2xl" height="4xl">
      {/* Modal Title Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <h3 className="text-base font-bold">Create new user</h3>
      </div>

      <div className="space-y-5 max-h-[78vh] overflow-y-auto pr-1 no-scrollbar">
        <p className="text-[14px] font-medium text-slate-600 -mt-1">
          Add a new user to the system
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b mt-5">
          <button
            type="button"
            onClick={() => setActiveTab("Personal info")}
            className={`px-4 py-2 rounded-t-xl text-[14px] transition-all cursor-pointer select-none ${
              activeTab === "Personal info"
                ? "bg-[#EBF7FD] text-[#38BDF8] font-bold"
                : "text-muted hover:text-slate-600 font-medium bg-transparent"
            }`}
          >
            Personal info
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("Bank details")}
            className={`px-5 py-2 rounded-t-xl text-[14px] transition-all cursor-pointer select-none ${
              activeTab === "Bank details"
                ? "bg-[#EBF7FD] text-[#38BDF8] font-bold"
                : "text-muted hover:text-slate-600 font-medium bg-transparent"
            }`}
          >
            Bank details
          </button>
        </div>

        {activeTab === "Personal info" ? (
          <div className="space-y-4">
            {/* Accordion 1: User info */}
            <div className="border-b pb-4">
              <button
                type="button"
                onClick={() =>
                  setOpenAccordion(
                    openAccordion === "userInfo" ? "inviteWorker" : "userInfo"
                  )
                }
                className="w-full flex items-center justify-between py-2 text-left cursor-pointer group"
              >
                <span className="text-[15px] font-bold text-[#38BDF8] group-hover:opacity-90">
                  User info
                </span>
                {openAccordion === "userInfo" ? (
                  <ChevronDown size={18} className="text-[#38BDF8]" />
                ) : (
                  <ChevronRight size={18} className="text-[#38BDF8]" />
                )}
              </button>

              {openAccordion === "userInfo" && (
                <div className="pt-4 space-y-5 animate-fade-in duration-200">
                  {/* Image Upload / Profile Photo */}
                  <div>
                    <label className="block text-[13px] font-medium mb-2.5 text-slate-800">
                      Profile photo
                    </label>
                    <div className="flex items-center gap-4">
                      <label>
                        <div className="w-16 h-16 rounded-full bg-primary/8 text-primary flex items-center justify-center cursor-pointer relative">
                          {selectedImage ? (
                            <img
                              src={selectedImage}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User size={28} />
                          )}
                          <div className="absolute bottom-0 right-0">
                            <Camera size={26} />
                          </div>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setSelectedImage(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </label>
                  </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-[13px] font-medium mb-1.5 text-slate-800">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g Sabrina Marsh"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted"
                    />
                  </div>

                  {/* Email & Phone number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium mb-1.5 text-slate-800">
                        Email address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g sabrina@medstar.co.uk"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium mb-1.5 text-slate-800">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g +44 7700 900077"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted"
                      />
                    </div>
                  </div>

                  {/* Role & Department */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium mb-1.5 text-slate-800">
                        Role
                      </label>
                      <div className="relative">
                        <select
                          value={userRole}
                          onChange={(e) => setUserRole(e.target.value)}
                          className="w-full px-4 py-3 pr-10 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer"
                        >
                          <option value="Support Worker">Support Worker</option>
                          <option value="Nurse">Nurse</option>
                          <option value="Manager">Manager</option>
                          <option value="Company Admin">Company Admin</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <ChevronDown size={18} className="text-slate-700" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium mb-1.5 text-slate-800">
                        Department
                      </label>
                      <div className="relative">
                        <select
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          className="w-full px-4 py-3 pr-10 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer"
                        >
                          <option value="Domiciliary Care">Domiciliary Care</option>
                          <option value="Clinical Services">Clinical Services</option>
                          <option value="Executive Management">Executive Management</option>
                          <option value="Community Health">Community Health</option>
                          <option value="Operations">Operations</option>
                          <option value="Night Care Shift">Night Care Shift</option>
                          <option value="Temporary Relief">Temporary Relief</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <ChevronDown size={18} className="text-slate-700" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* National Insurance / UTR number */}
                  <div>
                    <label className="block text-[13px] font-medium mb-1.5 text-slate-800">
                      Insurance number / UTR number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g AB123456C or 1234567890"
                      value={insuranceNumber}
                      onChange={(e) => setInsuranceNumber(e.target.value)}
                      className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] font-mono uppercase focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted placeholder:font-sans placeholder:normal-case"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Invite support worker */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setOpenAccordion(
                    openAccordion === "inviteWorker"
                      ? "userInfo"
                      : "inviteWorker"
                  )
                }
                className="w-full flex items-center justify-between py-2 text-left cursor-pointer"
              >
                <span className="text-[15px] font-bold text-muted">
                  Invite support worker
                </span>
                {openAccordion === "inviteWorker" ? (
                  <ChevronDown size={18} className="text-slate-500" />
                ) : (
                  <ChevronRight size={18} className="text-muted" />
                )}
              </button>

              {openAccordion === "inviteWorker" && (
                <div className="pt-3 space-y-4 animate-fade-in duration-200">
                  {/* Green Notice Banner */}
                  <div className="bg-[#36C328] text-white p-3.5 px-4 rounded-xl flex items-center gap-3 text-xs font-medium shadow-sm">
                    <div className="bg-white text-[#36C328] p-0.5 rounded flex items-center justify-center shrink-0 font-black text-[11px] w-5 h-5">
                      !
                    </div>
                    <span>
                      You're signed in as{" "}
                      <strong className="font-extrabold">
                        Sabrina Marsh
                      </strong>
                      , Company Admin for{" "}
                      <strong className="font-extrabold">
                        MedStar Domiciliary
                      </strong>
                    </span>
                  </div>

                  {/* Email address input */}
                  <div>
                    <label className="block text-[13px] font-medium mb-1.5 text-slate-800">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="e.g maria.adeyemi@example.com"
                      className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted"
                    />
                    <p className="text-[12px] text-muted mt-2 font-medium">
                      Only an email address is needed - they'll complete the rest
                      of their profile themselves
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Footer for Personal info */}
            <div className="flex items-center justify-end gap-3 pt-5 border-t mt-8">
              {openAccordion === "userInfo" ? (
                <button
                  type="button"
                  onClick={() => setActiveTab("Bank details")}
                  className="px-7 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer shadow-xs"
                >
                  Create User
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (onSendInvitation) {
                      onSendInvitation(
                        inviteEmail || "maria.adeyemi@example.com"
                      );
                    }
                    onClose();
                  }}
                  className="px-7 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer shadow-xs"
                >
                  Send invitation
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#FBFBFB] hover:bg-slate-100 border text-slate-800 text-[14px] font-bold rounded-full transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* Bank details Tab */
          <div className="space-y-5 animate-fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] font-medium mb-1.5 text-slate-800">
                  Bank name
                </label>
                <div className="relative">
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-4 py-3 pr-10 bg-white border rounded-2xl text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all cursor-pointer"
                  >
                    <option value="">e.g enter</option>
                    <option value="Barclays Bank UK">Barclays Bank UK</option>
                    <option value="HSBC UK">HSBC UK</option>
                    <option value="Lloyds Bank">Lloyds Bank</option>
                    <option value="NatWest Bank">NatWest Bank</option>
                    <option value="Santander UK">Santander UK</option>
                    <option value="Monzo Bank">Monzo Bank</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronDown size={18} className="text-slate-700" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium mb-1.5 text-slate-800">
                  Account number
                </label>
                <input
                  type="text"
                  placeholder="e.g 09847362527"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1.5 text-slate-800">
                Account name
              </label>
              <input
                type="text"
                placeholder="Autoloads"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full px-4 py-3 bg-white border rounded-2xl text-[14px] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all placeholder:text-muted"
              />
            </div>

            {/* Action Footer for Bank details */}
            <div className="flex items-center justify-end gap-3 pt-5 border-t mt-8">
              <button
                type="button"
                onClick={handleCreateClick}
                disabled={isCreating}
                className="px-7 py-2.5 bg-[#38BDF8] hover:bg-[#2BA5DF] text-white text-[14px] font-bold rounded-full transition-all cursor-pointer min-w-[130px] flex items-center justify-center shadow-xs"
              >
                {isCreating ? "Creating..." : "Create user"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#FBFBFB] hover:bg-slate-100 border text-slate-800 text-[14px] font-bold rounded-full transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
