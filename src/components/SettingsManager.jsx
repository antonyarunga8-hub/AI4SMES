import React, { useState } from 'react';
import { useSme } from '../context/SmeContext';
import { 
  Building, 
  Settings, 
  Smartphone, 
  ShieldCheck, 
  Check, 
  Bot, 
  Bell, 
  Share2, 
  Save, 
  Globe, 
  Zap,
  KeyRound
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SettingsManager({ theme }) {
  const { businessProfile, setBusinessProfile, addNotification } = useSme();
  const [profile, setProfile] = useState({ ...businessProfile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setBusinessProfile(profile);
    setSavedSuccess(true);
    addNotification({
      title: "Business Settings Updated",
      message: `Profile and AI automation rules saved successfully.`,
      type: "success"
    });
    confetti({ particleCount: 30, spread: 50 });
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold text-lg sm:text-xl">Business Settings & AI Automation Rules</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              Manage your company information, Mobile Money credentials, & autonomous virtual team settings
            </p>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
          <span>✅ Business Profile & AI Automation rules successfully saved!</span>
          <button onClick={() => setSavedSuccess(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Business Info */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 space-y-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Company Profile Details
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Official Company / SME Name
              </label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Industry / Sector
              </label>
              <select
                value={profile.sector}
                onChange={(e) => setProfile({ ...profile, sector: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Retail & Wholesale">Retail & Wholesale</option>
                <option value="Services & Consulting">Services & Consulting</option>
                <option value="Agribusiness & Food">Agribusiness & Food</option>
                <option value="Healthcare & Pharmacy">Healthcare & Pharmacy</option>
                <option value="Hospitality & Tourism">Hospitality & Tourism</option>
                <option value="Technology & Logistics">Technology & Logistics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Country
              </label>
              <select
                value={profile.country}
                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Kenya">🇰🇪 Kenya</option>
                <option value="Nigeria">🇳🇬 Nigeria</option>
                <option value="Ghana">🇬🇭 Ghana</option>
                <option value="South Africa">🇿🇦 South Africa</option>
                <option value="Rwanda">🇷🇼 Rwanda</option>
                <option value="Uganda">🇺🇬 Uganda</option>
                <option value="Tanzania">🇹🇿 Tanzania</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                WhatsApp Business Phone
              </label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Support Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                M-Pesa Till / Buy Goods Number
              </label>
              <input
                type="text"
                value={profile.tillNumber}
                onChange={(e) => setProfile({ ...profile, tillNumber: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                M-Pesa / Bank Paybill Number
              </label>
              <input
                type="text"
                value={profile.paybill}
                onChange={(e) => setProfile({ ...profile, paybill: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Physical Commercial Address
              </label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column: AI Automation Rules & Integration Status */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> AI Autopilot Rules
            </h4>

            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.autoBot}
                  onChange={(e) => setProfile({ ...profile, autoBot: e.target.checked })}
                  className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">24/7 WhatsApp AI Support</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Autonomously answer incoming customer inquiries in &lt;2 seconds</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.autoReminders}
                  onChange={(e) => setProfile({ ...profile, autoReminders: e.target.checked })}
                  className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Automatic Overdue Payment Reminders</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Auto-dispatch WhatsApp reminders 3 days before and after invoice due date</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.autoMarketing}
                  onChange={(e) => setProfile({ ...profile, autoMarketing: e.target.checked })}
                  className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Smart Marketing Drafts</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Generate weekly promotional flash sales based on inventory performance</span>
                </div>
              </label>
            </div>
          </div>

          {/* Integration Status Panel */}
          <div className="glass-panel rounded-2xl p-6 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> Live Gateway Connections
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  WhatsApp Cloud API Webhook
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                  Connected (14ms)
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Mobile Money Daraja STK
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                  Active Sandbox
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Cloud Firestore Ledger
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-mono font-bold">
                  Synced
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings & Rules</span>
          </button>
        </div>
      </form>
    </div>
  );
}
