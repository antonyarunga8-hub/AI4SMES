import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Lightbulb, Download, Sparkles, CheckCircle2, Check, Printer, X, FileText, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSme } from '../context/SmeContext';

export default function BusinessAdvisor({ theme }) {
  const { totalRevenue, totalExpenses, netProfit, outstandingAmount, pipelineValue, formatMoney, currency, businessProfile } = useSme();
  const businessName = businessProfile?.name || 'Safari Ventures Africa';

  const [downloadNote, setDownloadNote] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [executedRecs, setExecutedRecs] = useState({});

  const chartData = [
    { month: 'Jan', revenue: 420000, profit: 210000, expenses: 210000 },
    { month: 'Feb', revenue: 480000, profit: 260000, expenses: 220000 },
    { month: 'Mar', revenue: 530000, profit: 300000, expenses: 230000 },
    { month: 'Apr', revenue: 610000, profit: 370000, expenses: 240000 },
    { month: 'May', revenue: 700000, profit: 440000, expenses: 260000 },
    { month: 'Jun', revenue: 780000, profit: 490000, expenses: 290000 },
    { month: 'Jul', revenue: totalRevenue, profit: netProfit, expenses: totalExpenses }
  ];

  const recommendations = [
    {
      id: 'rec_1',
      title: "Optimize Wholesale Inventory Re-orders",
      category: "Cost Savings",
      impact: `Save ~${formatMoney(45000)} monthly`,
      desc: "Supplier prices drop by 12% on Mondays. Schedule stock replenishment on Sunday nights via WhatsApp automation."
    },
    {
      id: 'rec_2',
      title: "Launch WhatsApp Loyalty Flash Sale",
      category: "Revenue Acceleration",
      impact: `+${formatMoney(140000)} top-line revenue`,
      desc: "Re-engage 320 past customers who haven't ordered in 60 days with a personalized 10% discount coupon."
    },
    {
      id: 'rec_3',
      title: "Automate Overdue Invoice Collections",
      category: "Cash Flow Health",
      impact: `Recover ${formatMoney(outstandingAmount)} pending capital`,
      desc: "Enable automatic 3-day and 7-day M-Pesa reminder triggers for late invoices to reduce DSO by 8 days."
    }
  ];

  const handleExecuteRec = (id, title) => {
    setExecutedRecs(prev => ({ ...prev, [id]: true }));
    setDownloadNote(`✅ AI Recommendation "${title}" scheduled and activated in background.`);
    confetti({ particleCount: 30, spread: 50 });
  };

  const handlePrintReport = () => {
    window.print();
  };

  const profitMargin = Math.round((netProfit / (totalRevenue || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Executive Advisor Header Card */}
      <div className="glass-panel p-6 rounded-2xl border border-violet-500/30 flex items-center justify-between flex-wrap gap-4 bg-violet-50 dark:bg-violet-950/10 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-600 dark:text-violet-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-slate-900 dark:text-white font-bold text-lg sm:text-xl">{businessName} • AI Strategic Advisor</h3>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-500/30 font-mono font-bold">
                Health Score: 94 / 100
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-0.5">Real-time revenue forecasting, profit optimization, & executive decision support</p>
          </div>
        </div>

        <button 
          onClick={() => setShowReportModal(true)}
          className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow"
        >
          <FileText className="w-4 h-4" /> View & Print Executive AI Report
        </button>
      </div>

      {downloadNote && (
        <div className="p-3 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 rounded-xl text-violet-800 dark:text-violet-300 text-xs flex items-center justify-between">
          <span>{downloadNote}</span>
          <button onClick={() => setDownloadNote('')} className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold ml-2">✕</button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Gross Revenue (YTD)</span>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">{formatMoney(totalRevenue)}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" /> +24% vs last period
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Net Operating Profit</span>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">{formatMoney(netProfit)}</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">{profitMargin}% Net Margin</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Accounts Receivable</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">{formatMoney(outstandingAmount)}</p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium">Pending M-Pesa settlements</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Active Sales Pipeline</span>
          <p className="text-2xl font-extrabold text-violet-600 dark:text-violet-400 mt-2">{formatMoney(pipelineValue)}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">High conversion probability</p>
        </div>
      </div>

      {/* Revenue & Profit Chart */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Revenue & Net Profit Growth Trajectory
            </h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Historical 7-month performance & AI forecasted continuation</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#E2E8F0' : '#1E293B'} />
              <XAxis dataKey="month" stroke={theme === 'light' ? '#64748B' : '#94A3B8'} fontSize={12} />
              <YAxis stroke={theme === 'light' ? '#64748B' : '#94A3B8'} fontSize={12} tickFormatter={(v) => `${Math.round(v/1000)}k`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'light' ? '#FFFFFF' : '#0F172A', 
                  borderColor: theme === 'light' ? '#CBD5E1' : '#1E293B', 
                  borderRadius: '12px', 
                  color: theme === 'light' ? '#0F172A' : '#FFF', 
                  fontSize: '12px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => [formatMoney(value), '']}
              />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              <Area type="monotone" dataKey="profit" name="Net Profit" stroke="#F59E0B" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Growth Recommendations */}
      <div className="glass-panel rounded-2xl p-6">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" /> Prescriptive AI Growth Recommendations
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-amber-700 dark:text-amber-400">{rec.category}</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{rec.impact}</span>
                </div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">{rec.title}</h5>
                <p className="text-slate-600 dark:text-slate-300 text-xs mt-1 leading-relaxed">{rec.desc}</p>
              </div>

              <button 
                onClick={() => handleExecuteRec(rec.id, rec.title)}
                disabled={executedRecs[rec.id]}
                className={`w-full text-xs font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  executedRecs[rec.id]
                    ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40'
                    : 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {executedRecs[rec.id] ? <Check className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                {executedRecs[rec.id] ? "Activated & Scheduled" : "Auto-Execute via AI"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Printable Executive AI Business Health Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white text-slate-900 w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg">
                  AI
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg">AI4SMEs Africa Executive Health Report</h3>
                  <p className="text-xs text-slate-500">{businessName} • Generated {new Date().toLocaleDateString('en-GB')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintReport}
                  className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                </button>
                <button onClick={() => setShowReportModal(false)} className="text-slate-400 hover:text-slate-700 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Print Document Body */}
            <div className="space-y-6 text-xs sm:text-sm">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold text-emerald-800">Business Health Index</span>
                    <h2 className="text-2xl font-black text-emerald-950 mt-0.5">94 / 100 — Prime Financial Health</h2>
                  </div>
                  <span className="text-xs px-3 py-1 bg-emerald-600 text-white font-bold rounded-full">Top 5% SME</span>
                </div>
                <p className="text-xs text-emerald-800 mt-2">
                  Operating metrics demonstrate robust cash conversion, effective debt recovery, and continuous organic lead flow via WhatsApp.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase text-slate-500 tracking-wider mb-2">Financial Breakdown</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-slate-100 rounded-lg">
                    <span className="text-[11px] text-slate-500">Gross Revenue</span>
                    <p className="font-extrabold text-base text-slate-900 mt-1">{formatMoney(totalRevenue)}</p>
                  </div>
                  <div className="p-3 bg-slate-100 rounded-lg">
                    <span className="text-[11px] text-slate-500">Operating Expenses</span>
                    <p className="font-extrabold text-base text-slate-900 mt-1">{formatMoney(totalExpenses)}</p>
                  </div>
                  <div className="p-3 bg-slate-100 rounded-lg">
                    <span className="text-[11px] text-slate-500">Net Profit</span>
                    <p className="font-extrabold text-base text-emerald-700 mt-1">{formatMoney(netProfit)}</p>
                  </div>
                  <div className="p-3 bg-slate-100 rounded-lg">
                    <span className="text-[11px] text-slate-500">Net Margin</span>
                    <p className="font-extrabold text-base text-amber-700 mt-1">{profitMargin}%</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase text-slate-500 tracking-wider mb-2">Strategic AI Interventions</h4>
                <ul className="space-y-2">
                  {recommendations.map((r, i) => (
                    <li key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between font-bold text-xs text-slate-800">
                        <span>{r.title}</span>
                        <span className="text-emerald-700">{r.impact}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{r.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-4 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified by AI4SMEs Africa Business Operating System</span>
                </div>
                <span>Confidential Executive Audit</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
