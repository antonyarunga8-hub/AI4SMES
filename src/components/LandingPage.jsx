import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  Smartphone, 
  TrendingUp, 
  Users, 
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
  Award,
  BarChart3,
  Calendar
} from 'lucide-react';

import FoundersSection from './FoundersSection';
import WhatsAppSimulator from './WhatsAppSimulator';

export default function LandingPage({ onLaunchPortal }) {
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      title: "AI Customer Service Agent",
      icon: MessageSquare,
      color: "emerald",
      features: ["Automated 24/7 customer support", "FAQ & Knowledgebase management", "Website chat assistant", "Appointment & call scheduling", "WhatsApp customer engagement"],
      benefits: ["Faster response times (<2s)", "Improved customer satisfaction", "Reduced staffing costs"]
    },
    {
      title: "AI Bookkeeping Assistant",
      icon: FileText,
      color: "amber",
      features: ["Expense tracking & receipt scanning", "Automated invoice generation", "Revenue monitoring & cash flow summaries", "M-Pesa & Mobile Money reconciliation", "Financial health reporting"],
      benefits: ["Better financial control", "Error-free record keeping", "Enhanced business visibility"]
    },
    {
      title: "AI Marketing Manager",
      icon: Megaphone,
      color: "violet",
      features: ["African-centric content generation", "Social media post scheduling", "WhatsApp status campaigns", "Email marketing automation", "Campaign performance analytics"],
      benefits: ["Increased online presence", "Consistent marketing activity", "80% reduced marketing workload"]
    },
    {
      title: "AI Sales & Lead Generation Agent",
      icon: Target,
      color: "sapphire",
      features: ["Lead discovery & web scraping", "Lead qualification scoring", "Sales follow-up automation", "WhatsApp & SMS outreach", "Pipeline management"],
      benefits: ["3x increased sales opportunities", "Higher deal conversion rates", "Streamlined customer acquisition"]
    },
    {
      title: "AI Business Advisor",
      icon: TrendingUp,
      color: "emerald",
      features: ["Predictive revenue forecasting", "Growth & expansion recommendations", "Operational bottleneck detection", "Inventory & supplier optimization", "Executive PDF report generation"],
      benefits: ["Smarter business decisions", "Increased net profitability", "Sustainable long-term growth"]
    }
  ];

  const challenges = [
    "Manual business operations & paperwork",
    "Inefficient customer management",
    "Poor financial record keeping & lost receipts",
    "Limited marketing capabilities & reach",
    "Inadequate lead generation systems",
    "High operational & software licensing costs"
  ];

  const roadmapPhases = [
    { phase: "Phase 1", time: "Year 1", title: "Foundation & MVP", desc: "Company registration, core MVP development, pilot customers, & initial SME partnerships." },
    { phase: "Phase 2", time: "Years 1–2", title: "Product Launch", desc: "Full customer service automation, bookkeeping assistant, & digital marketing automation suite." },
    { phase: "Phase 3", time: "Years 2–4", title: "Regional Expansion", desc: "Multi-country Pan-African operations, local African language models (Swahili, Pidgin, French), & enterprise API integration." },
    { phase: "Phase 4", time: "Years 4–10", title: "Financial Ecosystem", desc: "SME credit scoring, lending partnerships, embedded micro-finance services, & advanced AI business intelligence." }
  ];

  const pricingTiers = [
    {
      name: "Starter SME",
      price: "KES 2,900",
      period: "/ month ($22)",
      desc: "Perfect for sole proprietors & micro businesses.",
      features: ["Jambo AI Assistant", "WhatsApp Support (500 chats/mo)", "Basic Bookkeeping & Invoices", "Community Support"],
      button: "Start Free Trial",
      popular: false
    },
    {
      name: "Growth Business",
      price: "KES 7,500",
      period: "/ month ($58)",
      desc: "For expanding SMEs requiring full automation.",
      features: ["Unlimited Jambo AI Assistant", "WhatsApp Business Integration", "Full AI Bookkeeping & Expense Scanning", "AI Marketing Content Studio", "Lead Qualification CRM", "Priority 24/7 Support"],
      button: "Launch Operating System",
      popular: true
    },
    {
      name: "Enterprise & NGO",
      price: "Custom",
      period: "Tailored Plan",
      desc: "For SME associations, incubators, & financial institutions.",
      features: ["Custom AI Agent Training", "Dedicated Cloud Hosting", "Multi-country API Access", "Custom ERP / Core Banking Connectors", "SLA Uptime Guarantee"],
      button: "Contact Executive Team",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Public Header Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E17]/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg">
              AI4
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white">AI4SMEs Africa</span>
              <span className="block text-[10px] text-emerald-400 font-semibold tracking-widest uppercase">Building Africa's AI Business OS</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#vision" className="hover:text-emerald-400 transition-colors">Vision & Mission</a>
            <a href="#services" className="hover:text-emerald-400 transition-colors">Core AI Suite</a>
            <a href="#whatsapp" className="hover:text-emerald-400 transition-colors">WhatsApp-First</a>
            <a href="#founders" className="hover:text-emerald-400 transition-colors">Founders</a>
            <a href="#roadmap" className="hover:text-emerald-400 transition-colors">Roadmap</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onLaunchPortal}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
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
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles className="w-4 h-4" /> Building Africa's AI Business Operating System
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl mx-auto leading-[1.1]">
            Empowering African SMEs with <span className="gradient-text-pan-african">Intelligent AI Digital Tools</span>
          </h1>

          <p className="mt-6 text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            AI4SMEs Africa provides an affordable, practical, and African-centric AI operating system that automates customer service, bookkeeping, digital marketing, sales leads, and business analytics.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchPortal}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-8 py-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/30 transition-all transform hover:-translate-y-1"
            >
              <Bot className="w-5 h-5" />
              <span>Explore Live SME Operating System</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#whatsapp"
              className="w-full sm:w-auto glass-button text-white font-bold px-8 py-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <Smartphone className="w-5 h-5 text-emerald-400" />
              <span>Try WhatsApp AI Simulator</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-panel p-4 rounded-2xl border border-slate-800">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">44M+</p>
              <p className="text-slate-400 text-xs mt-0.5">SMEs Across Africa</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-slate-800">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">80%</p>
              <p className="text-slate-400 text-xs mt-0.5">Operational Cost Reduction</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-slate-800">
              <p className="text-2xl sm:text-3xl font-extrabold text-violet-400">WhatsApp</p>
              <p className="text-slate-400 text-xs mt-0.5">First Operating System</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-slate-800">
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-400">24/7</p>
              <p className="text-slate-400 text-xs mt-0.5">Virtual Business Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-20 bg-[#0E1420] border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 rounded-3xl border border-emerald-500/20 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3">Our Vision</h3>
              <p className="text-slate-300 text-base leading-relaxed">
                To become Africa's leading AI-powered business platform, enabling millions of SMEs to access intelligent tools that drive growth, efficiency, and continuous innovation.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-amber-500/20 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3">Our Mission</h3>
              <p className="text-slate-300 text-base leading-relaxed">
                To simplify and democratize Artificial Intelligence for African businesses through affordable, practical, and accessible solutions designed specifically for the African market.
              </p>
            </div>
          </div>

          {/* Challenge vs Solution */}
          <div className="mt-16 glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                The African SME Challenge & <span className="gradient-text-emerald">Our Solution</span>
              </h3>
              <p className="text-slate-400 text-sm mt-2">
                Enterprise software is too costly and complex. African business owners need practical AI built into tools they already use.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Challenge Box */}
              <div className="bg-rose-950/20 border border-rose-500/20 p-6 rounded-2xl">
                <h4 className="text-rose-400 font-bold text-lg mb-4 flex items-center gap-2">
                  ❌ What African SMEs Struggle With Today
                </h4>
                <ul className="space-y-3">
                  {challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <span className="text-rose-400 font-bold">✕</span> {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution Box */}
              <div className="bg-emerald-950/20 border border-emerald-500/20 p-6 rounded-2xl">
                <h4 className="text-emerald-400 font-bold text-lg mb-4 flex items-center gap-2">
                  ✅ The AI4SMEs Business Operating System
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  A single centralized AI-powered virtual team that executes bookkeeping, customer support, marketing, and sales via a unified voice and text assistant.
                </p>
                <div className="space-y-2">
                  <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-emerald-300 flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    Works directly inside WhatsApp & Web Browsers
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-emerald-300 flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    Affordable pay-as-you-grow subscription pricing
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5" /> Comprehensive Platform Suite
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              5 Core AI Virtual Agents for <span className="gradient-text-gold">Every SME Function</span>
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg">
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
                        ? 'bg-slate-800/90 border-emerald-500/50 shadow-xl'
                        : 'glass-panel border-slate-800 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-300'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm sm:text-base">{srv.title}</h4>
                        <span className="text-[11px] text-slate-400">Click to explore capabilities</span>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>

            {/* Service Detail Display */}
            <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-slate-800 relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  {React.createElement(services[selectedService].icon, { className: "w-7 h-7" })}
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white">{services[selectedService].title}</h3>
                  <span className="text-xs text-emerald-400 font-semibold">Specialized AI Virtual Team Agent</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Features & Automated Workflows</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {services[selectedService].features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Business Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {services[selectedService].benefits.map((b, bIdx) => (
                      <span key={bIdx} className="text-xs px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium">
                        ✦ {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Fully integrated with WhatsApp & Dashboard API</span>
                  <button
                    onClick={onLaunchPortal}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
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
      <section id="whatsapp" className="py-20 bg-[#0E1420] border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Smartphone className="w-3.5 h-3.5" /> High Adoption Pan-African Strategy
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              WhatsApp-First Business Operations
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg">
              African business owners don't want complex dashboards. They want to manage invoicing, sales, customer support, and financial reporting right from WhatsApp.
            </p>
          </div>

          <WhatsAppSimulator onTriggerAction={() => {}} />
        </div>
      </section>

      {/* Founders & Leadership Section */}
      <FoundersSection />

      {/* Pricing & Business Model */}
      <section id="pricing" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Affordable <span className="gradient-text-emerald">Pan-African Pricing</span>
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg">
              Designed to be accessible for micro-enterprises and scalable for growing African mid-market businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`glass-panel rounded-3xl p-8 border flex flex-col justify-between relative ${
                  tier.popular ? 'border-emerald-500 shadow-2xl bg-slate-900/90' : 'border-slate-800'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                    Most Popular for SMEs
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  <p className="text-slate-400 text-xs mt-1 min-h-[36px]">{tier.desc}</p>

                  <div className="my-6">
                    <span className="text-3xl sm:text-4xl font-black text-white">{tier.price}</span>
                    <span className="text-slate-400 text-xs ml-1">{tier.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onLaunchPortal}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    tier.popular
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-lg'
                      : 'glass-button text-white hover:bg-slate-800'
                  }`}
                >
                  {tier.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Roadmap */}
      <section id="roadmap" className="py-20 bg-[#0E1420] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Growth Roadmap & Scale Timeline
            </h2>
            <p className="mt-4 text-slate-400 text-base">
              Our 10-year strategic plan from foundation to building Africa's largest SME financial ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapPhases.map((r, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">{r.phase}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{r.time}</span>
                </div>
                <h3 className="font-bold text-white text-base mb-2">{r.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0A0E17] border-t border-slate-800 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-xs">
              AI4
            </div>
            <span className="text-white font-bold">AI4SMEs Africa</span>
            <span>© 2026. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Co-Founders: Melvis Jeremy (CEO) & Antony Arunga (CTO)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
