import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Award, AlertTriangle, Lightbulb, FileSpreadsheet, ShieldCheck, Download, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BusinessAdvisor({ currency = 'KES' }) {
  const chartData = [
    { month: 'Jan', revenue: 420000, profit: 210000, expenses: 210000 },
    { month: 'Feb', revenue: 480000, profit: 260000, expenses: 220000 },
    { month: 'Mar', revenue: 530000, profit: 300000, expenses: 230000 },
    { month: 'Apr', revenue: 610000, profit: 370000, expenses: 240000 },
    { month: 'May', revenue: 700000, profit: 440000, expenses: 260000 },
    { month: 'Jun', revenue: 780000, profit: 490000, expenses: 290000 },
    { month: 'Jul', revenue: 845000, profit: 525000, expenses: 320000 }
  ];

  const recommendations = [
    {
      title: "Optimize Wholesale Inventory Re-orders",
      category: "Cost Savings",
      impact: "Save ~KES 45,000 monthly",
      desc: "Supplier prices in Nakuru drop by 12% on Mondays. Schedule stock replenishment on Sunday nights via WhatsApp automation."
    },
    {
      title: "Launch WhatsApp Loyalty Flash Sale",
      category: "Revenue Acceleration",
      impact: "+KES 140,000 top-line revenue",
      desc: "Re-engage 320 past customers who haven't ordered in 60 days with a personalized 10% discount coupon."
    },
    {
      title: "Automate Overdue Invoice Collections",
      category: "Cash Flow Health",
      impact: "Recover KES 95,500 pending capital",
      desc: "Enable automatic 3-day and 7-day M-Pesa reminder triggers for late invoices to reduce DSO by 8 days."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Executive Advisor Header Card */}
      <div className="glass-panel p-6 rounded-2xl border border-violet-500/30 flex items-center justify-between flex-wrap gap-4 bg-violet-950/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-lg sm:text-xl">AI Strategic Business Advisor</h3>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 font-mono">
                Overall Business Health: 94 / 100
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Real-time revenue forecasting, profit optimization, & executive decision support</p>
          </div>
        </div>

        <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg">
          <Download className="w-4 h-4" /> Download Executive AI Report (PDF)
        </button>
      </div>

      {/* Revenue & Profit Chart */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Revenue & Net Profit Growth Trajectory
            </h4>
            <p className="text-slate-400 text-xs">Historical 7-month performance & AI forecasted continuation</p>
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
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                formatter={(value) => [`KES ${value.toLocaleString()}`, '']}
              />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              <Area type="monotone" dataKey="profit" name="Net Profit" stroke="#F59E0B" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Growth Recommendations */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-6">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" /> Prescriptive AI Growth Recommendations
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400">{rec.category}</span>
                  <span className="text-xs font-bold text-emerald-400">{rec.impact}</span>
                </div>
                <h5 className="font-bold text-white text-sm">{rec.title}</h5>
                <p className="text-slate-300 text-xs mt-1 leading-relaxed">{rec.desc}</p>
              </div>

              <button className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Execute via AI
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
