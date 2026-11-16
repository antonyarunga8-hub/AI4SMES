import React, { useState } from 'react';
import { Target, Users, UserCheck, Search, Sparkles, Send, Plus, Phone, MapPin, X, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSme } from '../context/SmeContext';

export default function SalesLeadAgent({ theme }) {
  const { leads, addLead, updateLeadStage, followUpLead, pipelineValue, formatMoney, currency } = useSme();

  const [filterStage, setFilterStage] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMessage, setActiveMessage] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    name: '',
    contact: '',
    location: 'Nairobi',
    val: '',
    source: 'WhatsApp Inbound',
    phone: '+254 '
  });

  const stages = ['All', 'Discovery', 'Qualified', 'Negotiation', 'Closed Won'];

  const handleFollowUp = (lead) => {
    followUpLead(lead.id);
    setActiveMessage(`📲 AI WhatsApp Follow-up sent to ${lead.contact} (${lead.name}): "Hi ${lead.contact.split(' ')[0]}! Quick check-in regarding the proposal for ${lead.name}. Would you like to schedule a 5-min call today?"`);
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.contact) return;

    await addLead({
      name: newLead.name,
      contact: newLead.contact,
      location: newLead.location,
      val: parseInt(newLead.val || '50000', 10),
      source: newLead.source,
      phone: newLead.phone
    });

    setShowAddModal(false);
    setNewLead({
      name: '',
      contact: '',
      location: 'Nairobi',
      val: '',
      source: 'WhatsApp Inbound',
      phone: '+254 '
    });
    confetti({ particleCount: 35, spread: 50 });
  };

  const exportLeadsCsv = () => {
    const headers = ["Company Name", "Decision Maker", "Location", "AI Score", "Stage", `Estimated Value (${currency})`, "Source", "Phone", "Last Contact"];
    const rows = leads.map(l => [
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.contact || '').replace(/"/g, '""')}"`,
      `"${(l.location || '').replace(/"/g, '""')}"`,
      l.score,
      l.stage,
      l.val,
      `"${(l.source || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.lastContact || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ai4smes_crm_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(l => {
    const matchStage = filterStage === 'All' || l.stage === filterStage;
    const matchSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        l.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        l.location.toLowerCase().includes(searchTerm.toLowerCase());
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
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">{formatMoney(pipelineValue)}</p>
          <p className="text-emerald-600 dark:text-emerald-400 text-xs mt-1 font-medium">{leads.length} Active Deals</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Lead AI Propensity</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">88.4 / 100</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">High purchase propensity</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Lead Conversion Rate</span>
            <UserCheck className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          </div>
          <p className="text-2xl font-extrabold text-violet-600 dark:text-violet-400 mt-2">36.5%</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">+14% vs regional benchmark</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Automated Follow-ups</span>
            <Send className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-2">148 Dispatched</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Direct via WhatsApp API</p>
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
                className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 w-40 sm:w-48"
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

            <button
              onClick={exportLeadsCsv}
              className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:text-emerald-600 dark:hover:text-emerald-400 text-slate-700 dark:text-slate-300 font-semibold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
              title="Download Leads as CSV"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-3.5 h-3.5" /> Add Lead
            </button>
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
                <th className="py-3 px-4">Pipeline Stage</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{lead.name}</td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                    <div>{lead.contact}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{lead.phone || '+254 7XX XXX XXX'}</div>
                  </td>
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
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-900 dark:text-white">
                    {formatMoney(lead.val)}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={lead.stage}
                      onChange={(e) => updateLeadStage(lead.id, e.target.value)}
                      className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none"
                    >
                      <option value="Discovery">Discovery</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Negotiation">Negotiation</option>
                      <option value="Closed Won">Closed Won</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleFollowUp(lead)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-semibold transition-all inline-flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" /> WhatsApp Follow-Up
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Add Inbound Lead
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">Company / Business Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kisumu Retail Hub"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">Contact Person</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brian Otieno"
                    value={newLead.contact}
                    onChange={(e) => setNewLead({ ...newLead, contact: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">Location / City</label>
                  <input
                    type="text"
                    placeholder="e.g. Kisumu"
                    value={newLead.location}
                    onChange={(e) => setNewLead({ ...newLead, location: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">Estimated Value (KES)</label>
                  <input
                    type="number"
                    placeholder="e.g. 75000"
                    value={newLead.val}
                    onChange={(e) => setNewLead({ ...newLead, val: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">Lead Source</label>
                  <select
                    value={newLead.source}
                    onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="WhatsApp Inbound">WhatsApp Inbound</option>
                    <option value="Website Lead Form">Website Lead Form</option>
                    <option value="Direct Referral">Direct Referral</option>
                    <option value="AI Business Directory">AI Directory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">WhatsApp / Phone Number</label>
                <input
                  type="text"
                  placeholder="+254 712 345 678"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
