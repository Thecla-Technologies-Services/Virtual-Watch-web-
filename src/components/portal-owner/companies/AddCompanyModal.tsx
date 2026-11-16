import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { ChevronDown } from "lucide-react";
import type { Company, SubscriptionPlanId } from "./types";

export interface CompanyFormData {
  name: string;
  workspace: string;
  registrationNumber: string;
  industry: string;
  contactEmail: string;
  contactPhone: string;
  address1: string;
  address2: string;
  postcode: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  adminRole: string;
  planId: SubscriptionPlanId;
  enterpriseFeatures: string[];
}

interface AddCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CompanyFormData) => void;
  initialCompany?: Company | null;
}

const PLAN_OPTIONS: {
  id: SubscriptionPlanId;
  title: string;
  usersLabel: string;
  price: string;
  period: string;
  features: string[];
}[] = [
  {
    id: "free_trial",
    title: "Free trial",
    usersLabel: "Up to 25 users",
    price: "£0",
    period: "for 14 days",
    features: [
      "Full Growth Plan access",
      "No card required",
      "Auto-downgrades to Starter after trial",
    ],
  },
  {
    id: "starter",
    title: "Starter",
    usersLabel: "Up to 25 users",
    price: "£990",
    period: "/year",
    features: ["1 workspace", "Link management", "Notifications"],
  },
  {
    id: "growth",
    title: "Growth",
    usersLabel: "Up to 100 users",
    price: "£2490",
    period: "/year",
    features: [
      "Everything in Starter",
      "Payroll module",
      "Advanced reporting",
    ],
  },
  {
    id: "business",
    title: "Business",
    usersLabel: "Up to 250 users",
    price: "£4990",
    period: "/year",
    features: [
      "Everything in Growth",
      "Multiple departments",
      "Advanced analytics",
    ],
  },
];

const ENTERPRISE_CHECKBOXES = [
  "Everything in Growth",
  "Multiple departments",
  "Advanced analytics",
  "Payroll module",
  "Dedicated support",
  "Custom integrations",
];

const DEFAULT_FORM: CompanyFormData = {
  name: "",
  workspace: "",
  registrationNumber: "",
  industry: "",
  contactEmail: "",
  contactPhone: "",
  address1: "",
  address2: "",
  postcode: "",
  adminName: "",
  adminEmail: "",
  adminPhone: "",
  adminRole: "",
  planId: "growth",
  enterpriseFeatures: [],
};

export function AddCompanyModal({
  isOpen,
  onClose,
  onSubmit,
  initialCompany,
}: AddCompanyModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<CompanyFormData>(DEFAULT_FORM);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (initialCompany) {
        setForm({
          name: initialCompany.name,
          workspace: initialCompany.workspace,
          registrationNumber: initialCompany.registrationNumber,
          industry: initialCompany.industry,
          contactEmail: initialCompany.contactEmail,
          contactPhone: initialCompany.contactPhone,
          address1: initialCompany.address1,
          address2: initialCompany.address2 || "",
          postcode: initialCompany.postcode,
          adminName: initialCompany.adminName,
          adminEmail: initialCompany.adminEmail,
          adminPhone: initialCompany.adminPhone,
          adminRole: initialCompany.adminRole,
          planId: initialCompany.planId,
          enterpriseFeatures: [],
        });
      } else {
        setForm(DEFAULT_FORM);
      }
    }
  }, [isOpen, initialCompany]);

  const updateField = <K extends keyof CompanyFormData>(
    key: K,
    value: CompanyFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleEnterpriseFeature = (feature: string) => {
    setForm((prev) => ({
      ...prev,
      enterpriseFeatures: prev.enterpriseFeatures.includes(feature)
        ? prev.enterpriseFeatures.filter((f) => f !== feature)
        : [...prev.enterpriseFeatures, feature],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    onSubmit(form);
  };

  const isEditing = Boolean(initialCompany);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="xl" height="3xl">
      <div className="flex flex-col h-full max-h-[84vh]">
        {/* Header */}
        <div className="px-2 pb-4 border-b border-slate-100 shrink-0">
          <h2 className="text-[15px] font-bold text-slate-800">
            {isEditing ? "Edit company" : "Add company"}{" "}
            <span className="font-normal text-slate-400">
              - <span className="text-[12px] tracking-wider">STEP {step} OF 2</span>
            </span>
          </h2>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-2 pt-4 pb-2 space-y-5"
        >
          {step === 1 ? (
            <>
              <p className="text-[13px] font-medium text-slate-500">
                Company details
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Company name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="e.g Mira Inc."
                    className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Workspace name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.workspace}
                    onChange={(e) => updateField("workspace", e.target.value)}
                    placeholder="e.g mira-inc."
                    className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Business registration number
                  </label>
                  <input
                    type="text"
                    value={form.registrationNumber}
                    onChange={(e) =>
                      updateField("registrationNumber", e.target.value)
                    }
                    placeholder="e.g REG-2024-XXX"
                    className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Industry
                  </label>
                  <div className="relative">
                    <select
                      value={form.industry}
                      onChange={(e) => updateField("industry", e.target.value)}
                      className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 cursor-pointer"
                    >
                      <option value="">Select</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Retail">Retail</option>
                      <option value="Technology">Technology</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Finance">Finance</option>
                      <option value="Security">Security</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Contact email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.contactEmail}
                    onChange={(e) => updateField("contactEmail", e.target.value)}
                    placeholder="e.g admin@mira.co"
                    className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Contact phone
                  </label>
                  <input
                    type="tel"
                    value={form.contactPhone}
                    onChange={(e) => updateField("contactPhone", e.target.value)}
                    placeholder="e.g +27 11 555 0000"
                    className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
                  />
                </div>
              </div>

              {/* BILLING ADDRESS */}
              <div className="pt-2 space-y-3">
                <h4 className="text-[12px] font-bold uppercase tracking-wider text-slate-700">
                  BILLING ADDRESS
                </h4>

                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Address 1
                  </label>
                  <textarea
                    rows={2}
                    value={form.address1}
                    onChange={(e) => updateField("address1", e.target.value)}
                    placeholder="12 Innovation Drive, Cape Town, 8001"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Address 2
                  </label>
                  <textarea
                    rows={2}
                    value={form.address2}
                    onChange={(e) => updateField("address2", e.target.value)}
                    placeholder="12 Innovation Drive, Cape Town, 8001"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Postcode
                  </label>
                  <input
                    type="text"
                    value={form.postcode}
                    onChange={(e) => updateField("postcode", e.target.value)}
                    placeholder="EN34AB"
                    className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
                  />
                </div>
              </div>

              {/* Footer Step 1 */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="submit"
                  className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
                >
                  Next: Admin details
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-[13px] font-medium text-slate-500">
                Company administrator &amp; subscription
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Admin Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.adminName}
                    onChange={(e) => updateField("adminName", e.target.value)}
                    placeholder="e.g Maria Oche"
                    className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Admin email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.adminEmail}
                    onChange={(e) => updateField("adminEmail", e.target.value)}
                    placeholder="e.g maria@mira.co"
                    className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Admin phone
                  </label>
                  <input
                    type="tel"
                    value={form.adminPhone}
                    onChange={(e) => updateField("adminPhone", e.target.value)}
                    placeholder="e.g +27 82 000 0000"
                    className="w-full h-10 rounded-full border border-slate-200 px-4 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                    Admin role
                  </label>
                  <div className="relative">
                    <select
                      value={form.adminRole}
                      onChange={(e) => updateField("adminRole", e.target.value)}
                      className="w-full h-10 appearance-none rounded-full border border-slate-200 bg-white px-4 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15 cursor-pointer"
                    >
                      <option value="">Select</option>
                      <option value="Admin">Admin</option>
                      <option value="Company Admin">Company Admin</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* SUBSCRIPTION PLAN */}
              <div className="pt-2 space-y-3">
                <h4 className="text-[12px] font-bold uppercase tracking-wider text-slate-700">
                  SUBSCRIPTION PLAN
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {PLAN_OPTIONS.map((plan) => {
                    const isSelected = form.planId === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => updateField("planId", plan.id)}
                        className={`rounded-2xl border p-4 cursor-pointer transition-all ${
                          isSelected
                            ? "border-[#37AADF]/50 bg-[#F4FAFE]"
                            : "border-slate-100 bg-[#FAFBFC] hover:border-slate-200"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-[14px] font-bold text-slate-800">
                              {plan.title}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {plan.usersLabel}
                            </p>
                          </div>
                          <span
                            className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected
                                ? "border-[#37AADF] bg-[#37AADF]"
                                : "border-slate-300 bg-white"
                            }`}
                          />
                        </div>

                        <div className="mb-3">
                          <span className="text-[20px] font-extrabold text-slate-800">
                            {plan.price}
                          </span>{" "}
                          <span className="text-[12px] text-slate-500">
                            {plan.period}
                          </span>
                        </div>

                        <ul className="space-y-1">
                          {plan.features.map((feat) => (
                            <li
                              key={feat}
                              className="text-[11.5px] text-slate-500 flex items-start gap-1.5"
                            >
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-400 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}

                  {/* Enterprise Card */}
                  <div
                    onClick={() => updateField("planId", "enterprise")}
                    className={`rounded-2xl border p-4 cursor-pointer transition-all ${
                      form.planId === "enterprise"
                        ? "border-[#37AADF]/50 bg-[#F4FAFE]"
                        : "border-slate-100 bg-[#FAFBFC] hover:border-slate-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-[14px] font-bold text-slate-800">
                          Enterprise
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Up to 250 users
                        </p>
                      </div>
                      <span
                        className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          form.planId === "enterprise"
                            ? "border-[#37AADF] bg-[#37AADF]"
                            : "border-slate-300 bg-white"
                        }`}
                      />
                    </div>

                    <p className="text-[13px] font-bold text-slate-800 mb-2.5">
                      Custom
                    </p>

                    <div
                      className="space-y-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {ENTERPRISE_CHECKBOXES.map((feat) => (
                        <label
                          key={feat}
                          className="flex items-center gap-2 text-[11.5px] text-slate-500 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={form.enterpriseFeatures.includes(feat)}
                            onChange={() => toggleEnterpriseFeature(feat)}
                            className="h-3.5 w-3.5 rounded border-slate-300 accent-[#37AADF]"
                          />
                          <span>{feat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Step 2 */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="submit"
                  className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
                >
                  {isEditing ? "Save changes" : "Create company"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
                >
                  Back
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </Modal>
  );
}

