import React from 'react';
import { ShieldCheck, Target, Cpu, TrendingUp, Users, Award, CheckCircle2, Globe, Linkedin, Mail, Sparkles } from 'lucide-react';

export default function FoundersSection() {
  const founders = [
    {
      name: "Melvis Jeremy",
      role: "Co-Founder & Chief Executive Officer (CEO)",
      avatar: "MJ",
      bio: "Visionary business leader driving strategic partnerships, customer acquisition, and multi-country expansion of AI solutions for African SMEs.",
      responsibilities: [
        "Business Development & Corporate Partnerships",
        "Pan-African Sales, Marketing & Go-to-Market Strategy",
        "Company Operations, Culture & Talent Management",
        "Finance, Investor Relations & Revenue Strategy"
      ],
      kpis: [
        "Revenue Growth & Profitability",
        "SME Customer Acquisition",
        "Strategic Enterprise Partnerships",
        "African Market Expansion"
      ],
      gradient: "from-emerald-500 to-teal-700",
      accentColor: "emerald"
    },
    {
      name: "Antony Arunga",
      role: "Co-Founder & Chief Technology Officer (CTO)",
      avatar: "AA",
      bio: "Technology architect and AI innovator leading the product roadmap, cloud infrastructure, and proprietary African business automation algorithms.",
      responsibilities: [
        "Product Roadmap Definition & Platform Architecture",
        "African-Centric AI Model & Automation Engine Development",
        "Cloud Infrastructure, API Security & System Reliability",
        "R&D in WhatsApp Business AI & Multilingual Voice Models"
      ],
      kpis: [
        "Product Delivery Timelines & SLA Uptime (99.9%)",
        "Platform Performance & System Scalability",
        "User Experience & AI Accuracy Metrics",
        "Technical Patent & Proprietary IP Innovation"
      ],
      gradient: "from-amber-500 to-orange-700",
      accentColor: "amber"
    }
  ];

  return (
    <section id="founders" className="py-20 bg-gradient-to-b from-[#0A0E17] via-[#0E1524] to-[#0A0E17] relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5" /> Leadership Structure
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Meet the Founders & <span className="gradient-text-pan-african">Executive Team</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Combining deep business leadership with cutting-edge AI engineering to transform how African businesses operate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {founders.map((founder, idx) => (
            <div 
              key={idx} 
              className="glass-panel rounded-2xl p-8 border border-slate-800 hover:border-slate-700 transition-all duration-300 relative group overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${founder.gradient} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`}></div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${founder.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg shrink-0`}>
                  {founder.avatar}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {founder.name}
                  </h3>
                  <p className="text-emerald-400 font-medium text-sm mt-0.5">
                    {founder.role}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-slate-400 text-xs">
                    <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-slate-500" /> Nairobi / Pan-Africa</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> Executive Board</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
                "{founder.bio}"
              </p>

              {/* Responsibilities */}
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-400" /> Strategic Responsibilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {founder.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/50">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Performance Indicators (KPIs) */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-amber-400" /> Key Performance Indicators (KPIs)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {founder.kpis.map((kpi, kIdx) => (
                    <span key={kIdx} className="text-xs px-3 py-1.5 rounded-full bg-slate-800/90 text-amber-300/90 border border-amber-500/20 font-medium">
                      {kpi}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Executive Strategic Alignment Banner */}
        <div className="mt-12 glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-500/20 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Complementary Business & Technical Leadership
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Together, <strong className="text-emerald-400">Melvis Jeremy</strong> and <strong className="text-amber-400">Antony Arunga</strong> deliver the optimal blend of Pan-African commercial strategy, enterprise sales, scalable AI engineering, and market execution required to build a multi-billion dollar technology platform powering millions of African SMEs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
