import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  Smartphone, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  MessageSquare, 
  FileText, 
  Megaphone, 
  Target, 
  DollarSign, 
  ShieldCheck, 
  Zap, 
  Layers, 
  ChevronDown,
  Sun,
  Moon,
  Building,
  Check,
  HelpCircle,
  Clock,
  Briefcase
} from 'lucide-react';

import WhatsAppSimulator from './WhatsAppSimulator';

export default function LandingPage({ onLaunchPortal, theme, toggleTheme, businessProfile }) {
  const [selectedService, setSelectedService] = useState(0);
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [customName, setCustomName] = useState(businessProfile?.name || 'Safari Ventures Africa');
  const [customCurrency, setCustomCurrency] = useState(businessProfile?.currency || 'KES');
  const [customSector, setCustomSector] = useState(businessProfile?.sector || 'Retail & Wholesale');

  const services = [
    {
      title: "AI Customer Service Agent",
      icon: MessageSquare,
      color: "emerald",
      badge: "24/7 Autopilot",
      features: [
        "Automated 24/7 customer support via WhatsApp & Web",
        "Self-learning FAQ & business knowledgebase",
        "Instant quotation & product inquiries in <2s",
        "Appointment & consultation calendar scheduling",
        "Multilingual engagement (English, Swahili, Pidgin, French)"
      ],
      benefits: [
        "Zero missed inquiries after business hours",
        "Over 94% resolved without human intervention",
        "Reduces customer support staffing overhead by 75%"
      ]
    },
    {
      title: "AI Bookkeeping Assistant",
      icon: FileText,
      color: "amber",
      badge: "Smart Ledger",
      features: [
        "Instant invoice generation with direct WhatsApp dispatch",
        "M-Pesa & Mobile Money payment link reconciliation",
        "Expense tracking & receipt scanning via camera",
        "Real-time cash flow summaries & profit calculations",
        "Automated overdue payment reminders"
      ],
      benefits: [
        "Complete financial visibility in real time",
        "Faster invoice settlement times (-8 days DSO)",
        "Zero manual bookkeeping errors or lost paper receipts"
      ]
    },
    {
      title: "AI Marketing Manager",
      icon: Megaphone,
      color: "violet",
      badge: "Growth Engine",
      features: [
        "High-converting WhatsApp Status & Story promotions",
        "Localized African social copy (Instagram, FB, LinkedIn)",
        "Automated promotional calendar scheduling",
        "Personalized customer re-engagement campaigns",
        "ROI & customer acquisition performance tracking"
      ],
      benefits: [
        "Consistent brand presence across all channels",
        "Generates weeks of marketing campaigns in seconds",
        "Boosts repeat sales by up to +35%"
      ]
    },
    {
      title: "AI Sales & Lead Generation Agent",
      icon: Target,
      color: "sapphire",
      badge: "Deal Closer",
      features: [
        "Automated lead capture & qualification scoring",
        "Intelligent WhatsApp follow-up cadence",
        "High-intent buyer prioritization",
        "Pipeline deal tracking across 5 sales stages",
        "Customer conversation history & CRM intelligence"
      ],
      benefits: [
        "Never lose a warm sales lead again",
        "Higher deal conversion with timely follow-ups",
        "Empowers solo founders to sell like a 10-person team"
      ]
    },
    {
      title: "AI Business Advisor",
      icon: TrendingUp,
      color: "emerald",
      badge: "Executive Intel",
      features: [
        "Predictive 6-month revenue & profit forecasting",
        "Cost-leak detection & supplier price optimization",
        "Inventory restock alerts before stockouts happen",
        "Business health score (0-100 benchmark)",
        "One-click executive PDF report generation"
      ],
      benefits: [
        "Data-driven decisions instead of guesswork",
        "Increases net profit margins by 15-25%",
        "Bankable financial records ready for SME growth capital"
      ]
    }
  ];

  const challenges = [
    "Drowning in manual paper invoices, receipts, and disjointed notebooks",
    "Slow customer response times on WhatsApp leading to lost sales to competitors",
    "Struggling to track real daily profits versus operational expenses",
    "Zero time for consistent social media marketing or follow-ups",
    "Existing enterprise software is built for western giants and too complex or expensive"
  ];

  const pricingTiers = [
    {
      name: "Starter SME",
      price: "KES 2,900",
      period: "/ month ($22)",
      desc: "Ideal for solo entrepreneurs, kiosks, and emerging shops.",
      features: [
        "Jambo AI Natural Language Command Assistant",
        "WhatsApp Business AI (Up to 500 inquiries/mo)",
        "Automated Invoice & Receipt Creator",
        "Basic P&L Cash Flow Monitoring",
        "Community & Knowledgebase Support"
      ],
      button: "Start Free Trial",
      popular: false
    },
    {
      name: "Growth Business",
      price: "KES 7,500",
      period: "/ month ($58)",
      desc: "For growing enterprises needing full automation.",
      features: [
        "Unlimited Jambo AI Voice & Text Assistant",
        "Full WhatsApp Business OS Integration",
        "Automated Overdue Payment Reminders",
        "AI Marketing Content Studio & Scheduler",
        "Lead Qualification CRM & Pipeline Tracking",
        "AI Strategic Business Advisor & Forecasting",
        "Priority 24/7 WhatsApp Tech Support"
      ],
      button: "Launch Operating System",
      popular: true
    },
    {
      name: "Enterprise & Hubs",
      price: "Custom",
      period: "Tailored Plan",
      desc: "For SME associations, co-operatives, and franchises.",
      features: [
        "Custom Fine-Tuned AI Models for Your Sector",
        "Multi-branch & Multi-agent Team Logins",
        "Direct Core Banking & ERP Connectors",
        "Dedicated Account Engineer",
        "SLA 99.9% High Availability Guarantee"
      ],
      button: "Contact Solution Team",
      popular: false
    }
  ];

  const faqs = [
    {
      q: "Do I or my staff need technical or coding skills to use AI4SMEs?",
      a: "Not at all. AI4SMEs is built specifically for African business owners. You can operate the entire system by simply typing or speaking commands in everyday English, Swahili, or Pidgin—or by chatting directly with your assistant on WhatsApp."
    },
    {
      q: "Does it support M-Pesa, Mobile Money, and local payment methods?",
      a: "Yes! AI4SMEs incorporates automated Mobile Money and M-Pesa payment links directly into invoice generation and payment reminder workflows, giving your customers an effortless 1-tap checkout."
    },
    {
      q: "Can I manage multiple staff members or team functions?",
      a: "Yes. Different modules (Customer Support, Bookkeeping, Marketing, Leads, and Executive Advisor) work simultaneously so your sales team, accountant, and marketing manager all have the exact tools they need."
    },
    {
      q: "Is my business financial and customer data secure?",
      a: "Your data is encrypted end-to-end with enterprise-grade cloud security and isolated per tenant. Your proprietary business data is never shared or used to train public AI models."
    }
  ];

  const handleLaunchWithCustomProfile = (e) => {
    e?.preventDefault();
    onLaunchPortal({
      name: customName || 'Safari Ventures Africa',
      currency: customCurrency,
      sector: customSector
    });
    setShowOnboardModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0E17] text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Public Header Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 dark:bg-[#0A0E17]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-md">
              AI4
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">AI4SMEs Africa</span>
              <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase">Building Africa's AI Business OS</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#vision" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Vision & Mission</a>
            <a href="#services" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Core AI Suite</a>
            <a href="#whatsapp" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">WhatsApp-First</a>
            <a href="#pricing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">FAQ</a>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all hover:scale-105"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Launch CTA */}
            <button
              onClick={() => setShowOnboardModal(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-extrabold px-4 sm:px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <span>Launch Business OS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-hero-gradient">
        {/* Glow Effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles className="w-4 h-4" /> Building Africa's AI Business Operating System
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight max-w-5xl mx-auto leading-[1.1]">
            Empowering African SMEs with <span className="gradient-text-pan-african">Intelligent AI Digital Tools</span>
          </h1>

          <p className="mt-6 text-slate-600 dark:text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            AI4SMEs Africa provides an affordable, practical, and African-centric AI operating system that automates customer service, bookkeeping, digital marketing, sales leads, and business analytics.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowOnboardModal(true)}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-extrabold px-8 py-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-1"
            >
              <Bot className="w-5 h-5" />
              <span>Explore Live SME Operating System</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#whatsapp"
              className="w-full sm:w-auto glass-button font-bold px-8 py-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Try WhatsApp AI Simulator</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-panel p-4 rounded-2xl">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">44M+</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">SMEs Across Africa</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">80%</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Operational Cost Reduction</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl">
              <p className="text-2xl sm:text-3xl font-extrabold text-violet-600 dark:text-violet-400">WhatsApp</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">First Operating System</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl">
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">24/7</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Virtual Business Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-20 bg-slate-100/60 dark:bg-[#0E1420] border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 rounded-3xl border border-emerald-500/20 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                To become Africa's leading AI-powered business platform, enabling millions of SMEs to access intelligent tools that drive growth, efficiency, and continuous innovation.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-amber-500/20 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                To simplify and democratize Artificial Intelligence for African businesses through affordable, practical, and accessible solutions designed specifically for the African market.
              </p>
            </div>
          </div>

          {/* Challenge vs Solution */}
          <div className="mt-16 glass-panel p-8 sm:p-12 rounded-3xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                The African SME Challenge & <span className="gradient-text-emerald">Our Solution</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                Enterprise software is too costly and complex. African business owners need practical AI built into tools they already use.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Challenge Box */}
              <div className="bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/20 p-6 rounded-2xl">
                <h4 className="text-rose-700 dark:text-rose-400 font-bold text-lg mb-4 flex items-center gap-2">
                  ❌ What African SMEs Struggle With Today
                </h4>
                <ul className="space-y-3">
                  {challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <span className="text-rose-600 dark:text-rose-400 font-bold">✕</span> {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution Box */}
              <div className="bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20 p-6 rounded-2xl">
                <h4 className="text-emerald-700 dark:text-emerald-400 font-bold text-lg mb-4 flex items-center gap-2">
                  ✅ The AI4SMEs Business Operating System
                </h4>
                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  A single centralized AI-powered virtual team that executes bookkeeping, customer support, marketing, and sales via a unified voice and text assistant.
                </p>
                <div className="space-y-2.5">
                  <div className="p-3 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    Works directly inside WhatsApp & Web Browsers
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    Affordable pay-as-you-grow subscription pricing
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    M-Pesa and African Mobile Money ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Core Services */}
      <section id="services" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5" /> Comprehensive Platform Suite
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              5 Core AI Virtual Agents for <span className="gradient-text-gold">Every SME Function</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              Each AI agent acts as a specialized virtual team member focused on driving efficiency and growing bottom-line profits.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Service Navigation List */}
            <div className="lg:col-span-5 space-y-3">
              {services.map((srv, idx) => {
                const Icon = srv.icon;
                const isSelected = selectedService === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedService(idx)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-slate-800/90 border-emerald-500 shadow-md dark:shadow-xl'
                        : 'glass-panel hover:bg-slate-100/70 dark:hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected 
                          ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 font-bold' 
                          : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{srv.title}</h4>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{srv.badge}</span>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-600'}`} />
                  </button>
                );
              })}
            </div>

            {/* Service Detail Display */}
            <div className="lg:col-span-7 glass-panel p-8 rounded-3xl relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  {React.createElement(services[selectedService].icon, { className: "w-7 h-7" })}
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{services[selectedService].title}</h3>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{services[selectedService].badge} — Virtual Team Capability</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Key Features & Automated Workflows</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {services[selectedService].features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200 bg-slate-100/70 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3">Business Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {services[selectedService].benefits.map((b, bIdx) => (
                      <span key={bIdx} className="text-xs px-3 py-1.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-medium">
                        ✦ {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Fully integrated with WhatsApp & Business OS API</span>
                  <button
                    onClick={() => setShowOnboardModal(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow"
                  >
                    Test Live in OS <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp First Strategy Showcase */}
      <section id="whatsapp" className="py-20 bg-slate-100/60 dark:bg-[#0E1420] border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Smartphone className="w-3.5 h-3.5" /> High Adoption Pan-African Strategy
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
              WhatsApp-First Business Operations
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              African business owners don't want complex dashboards. They want to manage invoicing, sales, customer support, and financial reporting right from WhatsApp.
            </p>
          </div>

          <WhatsAppSimulator onTriggerAction={() => setShowOnboardModal(true)} />
        </div>
      </section>

      {/* Pricing & Business Model */}
      <section id="pricing" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
              Affordable <span className="gradient-text-emerald">Pan-African Pricing</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              Designed to be accessible for micro-enterprises and scalable for growing African mid-market businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`glass-panel rounded-3xl p-8 border flex flex-col justify-between relative ${
                  tier.popular 
                    ? 'border-emerald-500 shadow-xl bg-white dark:bg-slate-900/90' 
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow">
                    Most Popular for SMEs
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tier.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 min-h-[36px]">{tier.desc}</p>

                  <div className="my-6">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">{tier.price}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs ml-1">{tier.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setShowOnboardModal(true)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    tier.popular
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 shadow-lg'
                      : 'glass-button text-slate-900 dark:text-white'
                  }`}
                >
                  {tier.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section id="faq" className="py-20 bg-slate-100/60 dark:bg-[#0E1420] border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" /> Got Questions?
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
              Everything you need to know about setting up and running your AI Virtual Business Team.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">Q:</span> {faq.q}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Launch CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Ready to Automate Your Business Operations?
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Join thousands of forward-thinking African entrepreneurs using AI4SMEs to handle customer service, bookkeeping, and digital marketing.
          </p>
          <button
            onClick={() => setShowOnboardModal(true)}
            className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold px-8 py-4 rounded-xl text-sm sm:text-base inline-flex items-center gap-3 shadow-2xl transition-all transform hover:-translate-y-1"
          >
            <span>Launch SME Operating System Now</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-[#0A0E17] border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-xs">
              AI4
            </div>
            <span className="text-slate-900 dark:text-white font-bold">AI4SMEs Africa</span>
            <span>© 2026. All rights reserved.</span>
          </div>

          <div>
            <span>Africa's AI Business Operating System • Empowering 44M+ African Entrepreneurs</span>
          </div>
        </div>
      </footer>

      {/* Quick Launch / Personalize Onboarding Modal */}
      {showOnboardModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel bg-white dark:bg-[#121824] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enter Your SME Business Details</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Launch directly into your personalized AI Operating System</p>
                </div>
              </div>
              <button 
                onClick={() => setShowOnboardModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLaunchWithCustomProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Business / Company Name
                </label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Nairobi Fresh Supplies Ltd"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                    Default Currency
                  </label>
                  <select
                    value={customCurrency}
                    onChange={(e) => setCustomCurrency(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="KES">🇰🇪 KES (Kenyan Shilling)</option>
                    <option value="USD">🇺🇸 USD (US Dollar)</option>
                    <option value="NGN">🇳🇬 NGN (Nigerian Naira)</option>
                    <option value="GHS">🇬🇭 GHS (Ghanaian Cedi)</option>
                    <option value="ZAR">🇿🇦 ZAR (South African Rand)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                    Industry Sector
                  </label>
                  <select
                    value={customSector}
                    onChange={(e) => setCustomSector(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Retail & Wholesale">Retail & Wholesale</option>
                    <option value="Services & Consulting">Services & Consulting</option>
                    <option value="Agribusiness & Food">Agribusiness & Food</option>
                    <option value="Healthcare & Pharmacy">Healthcare & Pharmacy</option>
                    <option value="Hospitality & Tourism">Hospitality & Tourism</option>
                    <option value="Technology & Logistics">Technology & Logistics</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Pre-configures AI Bookkeeping, WhatsApp bot, & sales pipeline for your business.</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => handleLaunchWithCustomProfile()}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Skip & Use Default Demo
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-lg flex items-center gap-2"
                >
                  <span>Launch Business OS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
