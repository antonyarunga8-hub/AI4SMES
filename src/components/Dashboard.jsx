import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Megaphone, 
  Target, 
  TrendingUp, 
  Smartphone, 
  Globe, 
  LogOut, 
  Bell, 
  Search, 
  Menu, 
  X,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Zap,
  ArrowUpRight,
  Sun,
  Moon,
  Building,
  CheckCircle2
} from 'lucide-react';

import JamboAIAssistant from './JamboAIAssistant';
import BookkeepingAssistant from './BookkeepingAssistant';
import CustomerServiceAgent from './CustomerServiceAgent';
import MarketingManager from './MarketingManager';
import SalesLeadAgent from './SalesLeadAgent';
import BusinessAdvisor from './BusinessAdvisor';
import WhatsAppSimulator from './WhatsAppSimulator';

export default function Dashboard({ onBackToLanding, theme, toggleTheme, businessProfile, setBusinessProfile }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [currency, setCurrency] = useState(businessProfile?.currency || 'KES');
  const [language, setLanguage] = useState('English');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currencies = [
    { code: 'KES', label: 'KES (KSh)', flag: '🇰🇪' },
    { code: 'USD', label: 'USD ($)', flag: '🇺🇸' },
    { code: 'NGN', label: 'NGN (₦)', flag: '🇳🇬' },
    { code: 'GHS', label: 'GHS (GH₵)', flag: '🇬🇭' },
    { code: 'ZAR', label: 'ZAR (R)', flag: '🇿🇦' }
  ];

  const languages = ['English', 'Swahili', 'Pidgin', 'French'];

  const navigationItems = [
    { id: 'overview', label: 'OS Command Overview', icon: LayoutDashboard },
    { id: 'whatsapp_sandbox', label: 'WhatsApp OS Simulator', icon: Smartphone, badge: 'Live' },
    { id: 'customer_service', label: 'AI Customer Service', icon: MessageSquare },
    { id: 'bookkeeping', label: 'AI Bookkeeping & Invoices', icon: FileText },
    { id: 'marketing', label: 'AI Marketing Manager', icon: Megaphone },
    { id: 'leads', label: 'AI Sales & Lead CRM', icon: Target },
    { id: 'advisor', label: 'AI Business Advisor', icon: TrendingUp }
  ];

  const handleCurrencyChange = (newCurr) => {
    setCurrency(newCurr);
    if (setBusinessProfile) {
      setBusinessProfile(prev => ({ ...prev, currency: newCurr }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0E17] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-200">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#0E1420] border-r border-slate-200 dark:border-slate-800 shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto transition-colors duration-200">
        {/* Brand Logo */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-md">
              AI4
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-none">AI4SMEs</h1>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase">Africa Business OS</span>
            </div>
          </div>
        </div>

        {/* Business Badge */}
        <div className="px-4 pt-4 pb-2">
          <div className="p-3 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white truncate">
              <Building className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate">{businessProfile?.name || 'Safari Ventures Africa'}</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block mt-0.5">
              {businessProfile?.sector || 'SME Business'} • Live
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-1 flex-1">
          <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 px-3 mb-2 tracking-wider">
            Core AI Suite Modules
          </div>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-md font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white dark:text-slate-950' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                    isActive 
                      ? 'bg-emerald-700 text-white dark:bg-slate-950 dark:text-emerald-400' 
                      : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom controls */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button
            onClick={onBackToLanding}
            className="w-full glass-button text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Public Landing & Pitch</span>
          </button>

          <div className="p-3 bg-slate-100/80 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="text-slate-900 dark:text-white font-semibold block">Pan-African AI Engine v1.5</span>
            Active Region: East & West Africa
          </div>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <div className="md:hidden bg-white dark:bg-[#0E1420] border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white dark:text-slate-950 font-black text-sm">
            AI4
          </div>
          <div>
            <span className="font-extrabold text-slate-900 dark:text-white text-sm block leading-none">AI4SMEs Africa OS</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">{businessProfile?.name || 'Safari Ventures'}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button Mobile */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0E1420] border-b border-slate-200 dark:border-slate-800 p-4 space-y-2 z-40">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                  activeTab === item.id 
                    ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 font-bold' 
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={onBackToLanding}
            className="w-full text-left px-3 py-2.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold"
          >
            ← Back to Pitch & Public Landing
          </button>
        </div>
      )}

      {/* Main OS Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        {/* Top OS Toolbar Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-4 rounded-2xl">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{businessProfile?.name || 'SME Business'} Operating System</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              Pan-African Virtual Business Team • Autonomous AI Operations
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Theme Toggle Button Desktop */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm"
              title={theme === 'dark' ? 'Switch to Clean Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium px-1">Currency:</span>
              <select
                value={currency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                className="bg-slate-100 dark:bg-slate-950 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 focus:outline-none"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs shadow-sm">
              <Globe className="w-3.5 h-3.5 text-amber-500 ml-1" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-200 font-medium px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 focus:outline-none"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* Global Jambo AI Assistant Command Center */}
        <JamboAIAssistant onSelectTab={(tab) => setActiveTab(tab)} theme={theme} />

        {/* Dynamic Tab Rendering */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* High Level Quick Overview Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl">
                <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">Net Monthly Profit</div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
                  {currency === 'USD' ? '$4,040' : currency === 'NGN' ? '₦5,050,000' : 'KES 525,000'}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">From KES 845,000 gross revenue</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl">
                <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">Customer Support AI</div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">1,482</p>
                <p className="text-emerald-600 dark:text-emerald-400 text-xs mt-1 font-medium">94% automated resolution rate</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl">
                <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">Lead Pipeline Value</div>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">
                  {currency === 'USD' ? '$4,920' : 'KES 640,000'}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">5 high-intent qualified deals</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl">
                <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">WhatsApp Status Automation</div>
                <p className="text-2xl sm:text-3xl font-extrabold text-violet-600 dark:text-violet-400 mt-2">Active</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">2 campaigns scheduled this week</p>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <WhatsAppSimulator 
                  theme={theme}
                  onTriggerAction={(action) => {
                    if (action === 'bookkeeping') setActiveTab('bookkeeping');
                    else if (action === 'marketing') setActiveTab('marketing');
                    else if (action === 'leads') setActiveTab('leads');
                    else if (action === 'financial_summary') setActiveTab('advisor');
                  }} 
                />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="glass-panel p-6 rounded-2xl space-y-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> AI Virtual Business Team Active
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    Your business operating system is continuously monitoring cash flow, answering customer WhatsApp chats, qualifying leads, and optimizing marketing campaigns in the background.
                  </p>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => setActiveTab('bookkeeping')}
                      className="w-full p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs transition-all text-slate-800 dark:text-slate-200"
                    >
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">Manage Invoices & Cash Flow</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      onClick={() => setActiveTab('marketing')}
                      className="w-full p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs transition-all text-slate-800 dark:text-slate-200"
                    >
                      <span className="font-semibold text-amber-700 dark:text-amber-400">Generate WhatsApp Marketing Copy</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      onClick={() => setActiveTab('leads')}
                      className="w-full p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs transition-all text-slate-800 dark:text-slate-200"
                    >
                      <span className="font-semibold text-violet-700 dark:text-violet-400">Review Qualified Lead Pipeline</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'whatsapp_sandbox' && (
          <div className="space-y-6">
            <WhatsAppSimulator 
              theme={theme}
              onTriggerAction={(action) => {
                if (action === 'bookkeeping') setActiveTab('bookkeeping');
                else if (action === 'marketing') setActiveTab('marketing');
                else if (action === 'leads') setActiveTab('leads');
                else if (action === 'financial_summary') setActiveTab('advisor');
              }} 
            />
          </div>
        )}

        {activeTab === 'customer_service' && <CustomerServiceAgent theme={theme} />}
        {activeTab === 'bookkeeping' && <BookkeepingAssistant currency={currency} theme={theme} businessName={businessProfile?.name} />}
        {activeTab === 'marketing' && <MarketingManager theme={theme} businessName={businessProfile?.name} />}
        {activeTab === 'leads' && <SalesLeadAgent currency={currency} theme={theme} />}
        {activeTab === 'advisor' && <BusinessAdvisor currency={currency} theme={theme} businessName={businessProfile?.name} />}
      </main>
    </div>
  );
}
