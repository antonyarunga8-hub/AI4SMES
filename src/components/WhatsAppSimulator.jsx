import React, { useState } from 'react';
import { Send, Bot, CheckCheck, Smartphone, Zap } from 'lucide-react';

export default function WhatsAppSimulator({ onTriggerAction, theme }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Jambo! 👋 I'm your AI4SMEs Business Assistant. How can I help your business today?",
      time: "09:00 AM",
      type: "text"
    },
    {
      id: 2,
      sender: 'bot',
      text: "💡 Quick commands to try:\n• 'How much profit did I make this month?'\n• 'Send invoice KES 15,000 to Mama Sarah'\n• 'Create a WhatsApp status post for Friday sale'\n• 'Who has unpaid invoices?'",
      time: "09:01 AM",
      type: "text"
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    "How much profit did I make this month?",
    "Which customers have unpaid invoices?",
    "Create a marketing post for my new product",
    "Send invoice KES 25,000 to Westlands Electronics",
    "Follow up with qualified leads"
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: currentTime,
      type: 'text'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate AI execution logic
    setTimeout(() => {
      let botResponse = "";
      const lower = query.toLowerCase();

      if (lower.includes("profit") || lower.includes("revenue") || lower.includes("how much")) {
        botResponse = "📊 *Monthly Financial Summary*\n\n• Gross Revenue: KES 845,000 ($6,500)\n• Total Expenses: KES 320,000 ($2,460)\n• *Net Profit: KES 525,000 ($4,040)* 📈\n\nProfit margin is up +18% compared to last month! Would you like me to generate the detailed PDF report?";
        if (onTriggerAction) onTriggerAction('financial_summary');
      } else if (lower.includes("unpaid") || lower.includes("invoice")) {
        botResponse = "🧾 *Unpaid Invoices Alert*\n\n1. *Kazi Tech Ltd* - KES 45,000 (Due 3 days ago)\n2. *Safari Supplies* - KES 18,500 (Due today)\n3. *Amani Retail* - KES 32,000 (Due in 2 days)\n\nTotal Outstanding: *KES 95,500*\n\nReply *'SEND REMINDERS'* to automatically WhatsApp their accounts department.";
        if (onTriggerAction) onTriggerAction('invoices');
      } else if (lower.includes("marketing") || lower.includes("post") || lower.includes("campaign")) {
        botResponse = "🎨 *AI Generated Social & WhatsApp Campaign*\n\n\"🚀 Upgrade your business efficiency with our exclusive weekend deal! Get 20% off all inventory items when you order via WhatsApp this Friday. Reply YES to reserve yours! 📦✨\"\n\n✅ Scheduled to post across WhatsApp Status & Instagram on Friday 8:00 AM.";
        if (onTriggerAction) onTriggerAction('marketing');
      } else if (lower.includes("send invoice") || lower.includes("kes") || lower.includes("westlands")) {
        botResponse = "✅ *Invoice #INV-2026-084 Generated!*\n\nBilled to: Westlands Electronics\nAmount: KES 25,000\nPayment Link: https://pay.ai4smes.co/inv-84\n\nSent directly to client's WhatsApp number +254 712 345 678. Status: Pending Payment.";
        if (onTriggerAction) onTriggerAction('bookkeeping');
      } else if (lower.includes("lead") || lower.includes("follow up") || lower.includes("client")) {
        botResponse = "🎯 *Sales Follow-Up Executed*\n\nSuccessfully dispatched automated personalized WhatsApp follow-ups to 14 high-intent leads.\n• 3 responses received already!\n• 1 meeting booked for tomorrow 2:00 PM.";
        if (onTriggerAction) onTriggerAction('leads');
      } else {
        botResponse = `🤖 *AI Business Command Executed*\n\nProcessed: "${query}"\n\nI have updated your SME Operating System dashboard accordingly. Is there anything else you'd like me to execute?`;
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xl relative overflow-hidden transition-colors">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold text-base sm:text-lg flex items-center gap-2">
              WhatsApp Business AI Assistant <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Simulating live Pan-African WhatsApp Business API integration</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-medium">
            Active Sandbox
          </span>
        </div>
      </div>

      {/* Phone Screen Container */}
      <div className="bg-[#EFEAE2] dark:bg-[#0B141A] rounded-xl border border-slate-300 dark:border-slate-800 p-4 min-h-[380px] max-h-[440px] overflow-y-auto flex flex-col gap-3 relative transition-colors shadow-inner">
        {/* Subtle WhatsApp wallpaper overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${
              msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
            }`}
          >
            <div
              className={`p-3.5 rounded-2xl text-xs sm:text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-[#D9FDD3] text-slate-900 dark:bg-emerald-700 dark:text-white rounded-tr-none'
                  : 'bg-white text-slate-900 dark:bg-[#1F2C34] dark:text-slate-100 rounded-tl-none border border-slate-200/80 dark:border-slate-700/50'
              }`}
            >
              {msg.text}
            </div>
            <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-slate-500 dark:text-slate-400">
              <span>{msg.time}</span>
              {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="self-start bg-white text-slate-700 dark:bg-[#1F2C34] dark:text-slate-300 p-3 rounded-2xl rounded-tl-none text-xs flex items-center gap-2 border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <Bot className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-spin" />
            <span>AI Assistant is analyzing & executing command...</span>
          </div>
        )}
      </div>

      {/* Quick Prompt Pill Carousel */}
      <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <span className="text-[11px] text-slate-500 dark:text-slate-400 shrink-0 font-medium flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-500" /> Quick Try:
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="text-xs px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800/80 dark:hover:bg-emerald-500/20 border border-slate-200 dark:border-slate-700/60 text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400 transition-all shrink-0 font-medium"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="mt-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI assistant in English, Swahili, or Pidgin..."
          className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-sm"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all shadow shrink-0 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline text-xs uppercase tracking-wider">Send</span>
        </button>
      </div>
    </div>
  );
}
