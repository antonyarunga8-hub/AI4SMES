import React, { useState } from 'react';
import { Target, Users, UserCheck, Search, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SalesLeadAgent({ currency = 'KES', theme }) {
  const [leads, setLeads] = useState([
    { id: 1, name: "Safari Tours & Travel", contact: "Dennis Mutua", location: "Nairobi", score: 94, stage: "Qualified", val: 120000, source: "WhatsApp Bot" },
    { id: 2, name: "Kilifi Organics Store", contact: "Fatuma Ali", location: "Mombasa", score: 88, stage: "Negotiation", val: 65000, source: "Website Lead Form" },
    { id: 3, name: "Eldoret Tech Academy", contact: "Peter Kiprop", location: "Eldoret", score: 76, stage: "Discovery", val: 95000, source: "AI Business Directory" },
    { id: 4, name: "Uganda Agro Trade", contact: "Josephine Musisi", location: "Kampala", score: 91, stage: "Qualified", val: 210000, source: "LinkedIn AI Agent" },
    { id: 5, name: "Kigali Logistics Hub", contact: "Paul Nkurunziza", location: "Kigali", score: 82, stage: "Closed Won", val: 150000, source: "Direct Referral" }
  ]);

  const [filterStage, setFilterStage] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMessage, setActiveMessage] = useState('');

  const stages = ['All', 'Discovery', 'Qualified', 'Negotiation', 'Closed Won'];

  const handleFollowUp = (leadName, contact) => {
    setActiveMessage(`📲 AI WhatsApp Follow-up sent to ${contact} (${leadName}): "Hi ${contact.split(' ')[0]}! Quick check-in regarding the proposal for ${leadName}. Would you like to schedule a 5-min call today?"`);
    
    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.8 }
    });
  };

  const filteredLeads = leads.filter(l => {
    const matchStage = filterStage === 'All' || l.stage === filterStage;
    const matchSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.contact.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStage && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* AI Lead Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Pipeline Value</span>
            <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">KES 640,000</p>
          <p className="text-emerald-600 dark:text-emerald-400 text-xs mt-1 font-medium">5 High-Intent Deals</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Lead Qualification Score</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">86.2 / 100</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">High purchase propensity</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Lead Conversion Rate</span>
            <UserCheck className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          </div>
          <p className="text-2xl font-extrabold text-violet-600 dark:text-violet-400 mt-2">34.8%</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">+12% vs regional benchmark</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Automated Follow-ups</span>
            <Send className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-2">124 Dispatched</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">0 manual calls required</p>
        </div>
      </div>

      {activeMessage && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
          <span>{activeMessage}</span>
          <button onClick={() => setActiveMessage('')} className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold ml-2">✕</button>
        </div>
      )}

      {/* Main CRM Table */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> AI Sales & Lead Generation CRM
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Automated lead discovery, qualification scoring, & WhatsApp follow-ups</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 w-44"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              {stages.map((stg) => (
                <button
                  key={stg}
                  onClick={() => setFilterStage(stg)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                    filterStage === stg 
                      ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 font-bold shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {stg}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Company Name</th>
                <th className="py-3 px-4">Decision Maker</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">AI Score</th>
                <th className="py-3 px-4">Est. Deal Value</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{lead.name}</td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">{lead.contact}</td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">{lead.location}</td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 text-xs">{lead.source}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      lead.score >= 90 
                        ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30' 
                        : 'bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                    }`}>
                      {lead.score} / 100
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-900 dark:text-white">KES {lead.val.toLocaleString()}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {lead.stage}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleFollowUp(lead.name, lead.contact)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-semibold transition-all"
                    >
                      WhatsApp Follow-Up
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
