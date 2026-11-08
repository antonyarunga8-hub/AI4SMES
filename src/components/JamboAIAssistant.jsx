import React, { useState } from 'react';
import { Mic, Send, Bot, Sparkles, Zap, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function JamboAIAssistant({ onSelectTab, theme }) {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([
    {
      id: 1,
      query: "How much profit did I make this month?",
      response: "📊 Net Profit for this month is KES 525,000 ($4,040), up +18% from last month. Gross revenue reached KES 845,000 against KES 320,000 operational expenses.",
      actionTab: "advisor"
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExecute = (e) => {
    e.preventDefault();
    if (!command.trim()) return;

    const userCmd = command;
    setCommand('');
    setIsProcessing(true);

    setTimeout(() => {
      let resp = "";
      let targetTab = "overview";
      const lower = userCmd.toLowerCase();

      if (lower.includes("profit") || lower.includes("revenue") || lower.includes("report") || lower.includes("forecast")) {
        resp = "📈 Profit & Loss Report Generated! Net profit stands at KES 525,000 (62% net margin). Revenue trajectory is on target for quarterly goals.";
        targetTab = "advisor";
      } else if (lower.includes("invoice") || lower.includes("unpaid") || lower.includes("bookkeeping") || lower.includes("bill")) {
        resp = "🧾 Checked Ledger: 3 pending invoices totaling KES 95,500. Automatic WhatsApp reminders ready to dispatch.";
        targetTab = "bookkeeping";
      } else if (lower.includes("marketing") || lower.includes("campaign") || lower.includes("post") || lower.includes("status")) {
        resp = "🎨 AI Marketing Post Created for WhatsApp Status & Instagram! Preview is available in your Marketing Studio.";
        targetTab = "marketing";
      } else if (lower.includes("lead") || lower.includes("sales") || lower.includes("follow up") || lower.includes("client")) {
        resp = "🎯 Sales Pipeline Checked: 5 active high-intent leads worth KES 640,000. 14 follow-ups dispatched.";
        targetTab = "leads";
      } else if (lower.includes("customer") || lower.includes("support") || lower.includes("faq") || lower.includes("help")) {
        resp = "🤖 AI Customer Support active! 1,482 customer messages answered with 94% autonomous resolution speed.";
        targetTab = "customer_service";
      } else {
        resp = `✅ Business Command Executed: "${userCmd}". Dashboard metrics and system state updated.`;
      }

      setHistory([{ id: Date.now(), query: userCmd, response: resp, actionTab: targetTab }, ...history]);
      setIsProcessing(false);

      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    }, 900);
  };

  return (
    <div className="glass-panel rounded-2xl border border-emerald-500/30 p-6 bg-gradient-to-br from-white via-emerald-50/30 to-slate-50 dark:from-[#101827] dark:via-[#0E1726] dark:to-[#0A0E17] relative overflow-hidden shadow-md dark:shadow-2xl transition-colors">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-slate-900 dark:text-white font-extrabold text-base sm:text-lg flex items-center gap-2">
              Jambo AI Unified Voice & Text Assistant
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-semibold">
                Multilingual Swahili / English / Pidgin
              </span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Command your entire SME operations via natural language</p>
          </div>
        </div>
      </div>

      {/* Command Form */}
      <form onSubmit={handleExecute} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type or speak e.g., 'Generate financial report', 'Who has unpaid invoices?', 'Create marketing campaign'..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl pl-4 pr-10 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 shadow-sm"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            title="Voice input simulation"
            onClick={() => setCommand("How much profit did I make this month?")}
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        <button
          type="submit"
          disabled={isProcessing || !command.trim()}
          className="bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all shrink-0 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>Execute</span>
        </button>
      </form>

      {/* Latest Execution Log */}
      {history.length > 0 && (
        <div className="mt-4 space-y-2.5">
          {history.slice(0, 2).map((item) => (
            <div key={item.id} className="bg-white/80 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-sm">
              <div>
                <span className="text-slate-500 dark:text-slate-400 font-medium">Command: "{item.query}"</span>
                <p className="text-emerald-700 dark:text-emerald-300 font-medium mt-0.5">{item.response}</p>
              </div>
              {onSelectTab && (
                <button
                  onClick={() => onSelectTab(item.actionTab)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold shrink-0 flex items-center gap-1 transition-all"
                >
                  View Module <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
