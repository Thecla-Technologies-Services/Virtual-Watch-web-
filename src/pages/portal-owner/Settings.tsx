import { useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ChevronDown, CheckCircle2, X, Check } from "lucide-react";

type SettingsTab = "General" | "Security" | "Notifications" | "Integrations";

const TABS: SettingsTab[] = [
  "General",
  "Security",
  "Notifications",
  "Integrations",
];

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  ariaLabel: string;
}

function ToggleSwitch({ checked, onChange, ariaLabel }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
        checked ? "bg-[#37AADF]" : "bg-slate-300"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition-transform ${
          checked ? "translate-x-[18px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

interface IntegrationItem {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  badgeBg: string;
  badgeText: string;
  badgeSymbol: string;
}

const INITIAL_INTEGRATIONS: IntegrationItem[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Payment processing",
    connected: true,
    badgeBg: "bg-[#635BFF]",
    badgeText: "text-white",
    badgeSymbol: "S",
  },
  {
    id: "sendgrid",
    name: "SendGrid",
    description: "Transactional email",
    connected: true,
    badgeBg: "bg-[#E0F2FE]",
    badgeText: "text-[#0284C7]",
    badgeSymbol: "SG",
  },
  {
    id: "twilio",
    name: "Twilio",
    description: "SMS notifications",
    connected: false,
    badgeBg: "bg-[#FEF2F2]",
    badgeText: "text-[#EF4444]",
    badgeSymbol: "TW",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Internal alerts",
    connected: false,
    badgeBg: "bg-[#F8FAFC]",
    badgeText: "text-slate-700",
    badgeSymbol: "#",
  },
];

export default function PortalOwnerSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("General");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // General state
  const [platformName, setPlatformName] = useState("Nexus Platform");
  const [supportEmail, setSupportEmail] = useState("support@nexusplatform.io");
  const [timezone, setTimezone] = useState("Africa/Johannesburg (UTC+2)");
  const [language, setLanguage] = useState("English");

  // Security state
  const [passwordExpiry, setPasswordExpiry] = useState("50");
  const [lockoutAttempts, setLockoutAttempts] = useState("5");
  const [sessionTimeout, setSessionTimeout] = useState("60");
  const [mfaRequired, setMfaRequired] = useState(true);

  // Notifications state
  const [notifications, setNotifications] = useState({
    subscriptionExpiry: true,
    newCompanyReg: true,
    paymentFailures: true,
    securityAlerts: true,
    weeklySummary: false,
  });

  // Integrations state
  const [integrations, setIntegrations] =
    useState<IntegrationItem[]>(INITIAL_INTEGRATIONS);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = () => {
    showToast("Platform settings saved");
  };

  const handleCancel = () => {
    setPlatformName("Nexus Platform");
    setSupportEmail("support@nexusplatform.io");
    setTimezone("Africa/Johannesburg (UTC+2)");
    setLanguage("English");
    setPasswordExpiry("50");
    setLockoutAttempts("5");
    setSessionTimeout("60");
    setMfaRequired(true);
    setNotifications({
      subscriptionExpiry: true,
      newCompanyReg: true,
      paymentFailures: true,
      securityAlerts: true,
      weeklySummary: false,
    });
    setIntegrations(INITIAL_INTEGRATIONS);
    showToast("Changes discarded");
  };

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    );
  };

  return (
    <div className="animate-fade-in duration-300 space-y-5 pb-8">
      <Breadcrumb
        pageTitle="PLATFORM SETTINGS"
        subtext="Configure platform-wide behaviour and integrations"
        activePage="Platform settings"
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-lg">
          <CheckCircle2 size={15} className="text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main White Card */}
      <div className="bg-white rounded-2xl p-6  border border-slate-100/80">
        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-100 pb-0 mb-6 overflow-x-auto">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-[13px] font-semibold rounded-t-xl transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#F4F7FA] text-[#37AADF] border border-b-0 border-slate-100"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Tab 1: General */}
        {activeTab === "General" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                Platform name
              </label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                Support email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                Default timezone
              </label>
              <div className="relative">
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full h-10 appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] cursor-pointer"
                >
                  <option value="Africa/Johannesburg (UTC+2)">
                    Africa/Johannesburg (UTC+2)
                  </option>
                  <option value="Europe/London (UTC+0)">
                    Europe/London (UTC+0)
                  </option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York (UTC-5)">
                    America/New_York (UTC-5)
                  </option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                Default language
              </label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full h-10 appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-9 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="German">German</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Security */}
        {activeTab === "Security" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                  Password expiry (days)
                </label>
                <input
                  type="number"
                  value={passwordExpiry}
                  onChange={(e) => setPasswordExpiry(e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                  Failed login lockout (attempts)
                </label>
                <input
                  type="number"
                  value={lockoutAttempts}
                  onChange={(e) => setLockoutAttempts(e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
                  Session timeout (minutes)
                </label>
                <input
                  type="number"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#37AADF] focus:ring-2 focus:ring-[#37AADF]/15"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <div>
                <p className="text-[13.5px] font-bold text-slate-800">
                  Multi-Factor Authentication
                </p>
                <p className="text-[12px] text-slate-400 mt-0.5">
                  Require MFA for all admin logins
                </p>
              </div>
              <ToggleSwitch
                checked={mfaRequired}
                onChange={() => setMfaRequired((v) => !v)}
                ariaLabel="Multi-Factor Authentication"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Notifications */}
        {activeTab === "Notifications" && (
          <div className="space-y-3">
            {[
              {
                key: "subscriptionExpiry" as const,
                label: "Subscription expiry reminders",
              },
              {
                key: "newCompanyReg" as const,
                label: "New company registrations",
              },
              {
                key: "paymentFailures" as const,
                label: "Payment failures",
              },
              {
                key: "securityAlerts" as const,
                label: "Security alerts",
              },
              {
                key: "weeklySummary" as const,
                label: "Weekly platform summary",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="rounded-xl bg-[#F8FAFC] px-5 py-3.5 flex items-center justify-between gap-4"
              >
                <span className="text-[13px] font-medium text-slate-700">
                  {item.label}
                </span>
                <ToggleSwitch
                  checked={notifications[item.key]}
                  onChange={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.key]: !prev[item.key],
                    }))
                  }
                  ariaLabel={item.label}
                />
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Integrations */}
        {activeTab === "Integrations" && (
          <div className="space-y-3">
            {integrations.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-[#F8FAFC] px-5 py-3.5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`h-8 w-8 rounded-lg ${item.badgeBg} ${item.badgeText} flex items-center justify-center text-[12px] font-extrabold shrink-0 border border-slate-200/60`}
                  >
                    {item.badgeSymbol}
                  </div>
                  <div>
                    <p className="text-[13.5px] font-bold text-slate-800 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-[12px] text-slate-400 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleIntegration(item.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200/80 hover:bg-slate-50 px-3.5 py-1.5 text-[12px] font-semibold text-slate-700 transition-colors cursor-pointer shrink-0"
                >
                  {item.connected ? (
                    <>
                      <span className="h-4 w-4 rounded-full bg-[#EF4444] text-white flex items-center justify-center">
                        <X size={10} strokeWidth={3} />
                      </span>
                      <span>Disconnect</span>
                    </>
                  ) : (
                    <>
                      <span className="h-4 w-4 rounded-full bg-[#22C55E] text-white flex items-center justify-center">
                        <Check size={10} strokeWidth={3} />
                      </span>
                      <span>Connect</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-5 mt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-full bg-[#37AADF] hover:bg-[#2F99CA] text-white px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Save settings
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 px-6 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

