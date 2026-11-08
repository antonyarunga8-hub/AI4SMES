import React, { useState } from 'react';
import { MessageSquare, Bot, Calendar, Clock, CheckCircle, Plus, Zap, Users, Sparkles, Send } from 'lucide-react';

export default function CustomerServiceAgent({ theme }) {
  const [faqs, setFaqs] = useState([
    { id: 1, question: "What are your business opening hours?", answer: "We are open Monday to Saturday from 8:00 AM to 6:00 PM EAT. AI Customer Service handles inquiries 24/7.", category: "Hours & Location" },
    { id: 2, question: "How do I make a payment via M-Pesa / Mobile Money?", answer: "Send payment to Paybill 4082210 or Till Number 982121. AI will issue instant receipt confirmation.", category: "Payments" },
    { id: 3, question: "Do you deliver across East Africa?", answer: "Yes! We ship across Kenya, Uganda, Tanzania, and Rwanda within 24-48 hours.", category: "Shipping" }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 101, client: "Dr. Kamau - Kilimani Clinic", service: "AI Setup Consultation", date: "Today, 2:30 PM", status: "Confirmed" },
    { id: 102, client: "Grace Wanjiku - Apex Retail", service: "Bookkeeping Onboarding", date: "Tomorrow, 10:00 AM", status: "Confirmed" },
    { id: 103, client: "David Ochieng - Logistics Ltd", service: "WhatsApp Bot Setup", date: "Friday, 4:00 PM", status: "Pending" }
  ]);

  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [activeTab, setActiveTab] = useState('live_support');

  // Customer simulator query
  const [simQuery, setSimQuery] = useState('');
  const [simHistory, setSimHistory] = useState([
    {
      q: "Hi, do you have stock for wholesale maize grain?",
      a: "Yes Josephine! We have 45 bags in Nakuru depot ready for pickup. Price KES 3,200/bag.",
      channel: "WhatsApp",
      user: "Josephine N. (Nakuru)"
    },
    {
      q: "Can I book a consultation call for Thursday afternoon?",
      a: "Appointment set for Thursday 3:00 PM EAT. Calendar invite dispatched to your email.",
      channel: "Web Chat",
      user: "Samuel O. (Kampala)"
    }
  ]);

  const handleAddFaq = (e) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer) return;
    setFaqs([...faqs, { id: Date.now(), question: newQuestion, answer: newAnswer, category: "Custom FAQ" }]);
    setNewQuestion('');
    setNewAnswer('');
  };

  const handleSimulateInquiry = (e) => {
    e.preventDefault();
    if (!simQuery.trim()) return;

    const lower = simQuery.toLowerCase();
    let reply = "Thank you for reaching out! Our team has received your inquiry and will respond within 2 minutes. Feel free to reply with more details.";

    // Match existing FAQs
    const matched = faqs.find(f => lower.includes(f.question.toLowerCase().slice(0, 15)) || f.question.toLowerCase().split(' ').some(w => w.length > 4 && lower.includes(w)));
    if (matched) {
      reply = matched.answer;
    } else if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) {
      reply = "Our pricing is tailored to your order quantity! Wholesale discounts apply on orders above 10 units. Would you like a formal quote?";
    } else if (lower.includes("delivery") || lower.includes("ship")) {
      reply = "We offer same-day express delivery within Nairobi and 24-48 hours across East Africa!";
    }

    setSimHistory([
      {
        q: simQuery,
        a: reply,
        channel: "WhatsApp",
        user: "You (Interactive Live Test)"
      },
      ...simHistory
    ]);
    setSimQuery('');
  };

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Conversations Handled</span>
            <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">1,482</p>
          <p className="text-emerald-600 dark:text-emerald-400 text-xs font-medium mt-1">94% Resolved Autonomously</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Avg Response Speed</span>
            <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">1.8s</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-1">99.2% Faster than human staffing</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Appointments Booked</span>
            <Calendar className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-violet-600 dark:text-violet-400 mt-2">48</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-1">Synced to Google & Outlook Calendar</p>
        </div>
      </div>

      {/* Main Feature Tabs */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('live_support')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'live_support'
                  ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-md'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Live Support Monitor
            </button>
            <button
              onClick={() => setActiveTab('faq_builder')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'faq_builder'
                  ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-md'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" /> FAQ Knowledgebase
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'appointments'
                  ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-md'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" /> Appointments
            </button>
          </div>
        </div>

        {/* Tab 1: Live Support */}
        {activeTab === 'live_support' && (
          <div className="space-y-6">
            {/* Interactive Live Inquiry Sandbox */}
            <form onSubmit={handleSimulateInquiry} className="p-4 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Test Your AI Agent in Real Time (Ask anything as a customer):
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={simQuery}
                  onChange={(e) => setSimQuery(e.target.value)}
                  placeholder="e.g. Do you deliver to Nakuru? How can I pay via M-Pesa?"
                  className="flex-1 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!simQuery.trim()}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow shrink-0 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Active Customer Conversations</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">WhatsApp & Web Chat Active</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {simHistory.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <strong className="text-slate-900 dark:text-white text-sm">{item.user}</strong>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono font-medium">
                      {item.channel}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-xs bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/60">
                    "{item.q}"
                  </p>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 flex items-start gap-1 font-medium">
                    <Bot className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>AI Replied: "{item.a}"</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: FAQ Knowledgebase */}
        {activeTab === 'faq_builder' && (
          <div className="space-y-6">
            <form onSubmit={handleAddFaq} className="bg-slate-50 dark:bg-slate-900/80 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Teach AI New Business Answer</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Frequently Asked Question..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  placeholder="AI Answer Response..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow"
              >
                <Plus className="w-3.5 h-3.5" /> Train AI Assistant
              </button>
            </form>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Q: {faq.question}</h5>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">{faq.category}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Appointments */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">AI Automated Calendar Bookings</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Client</th>
                    <th className="py-2.5 px-3">Service</th>
                    <th className="py-2.5 px-3">Date & Time</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {appointments.map((app) => (
                    <tr key={app.id}>
                      <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{app.client}</td>
                      <td className="py-3 px-3 text-slate-500 dark:text-slate-400">{app.service}</td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{app.date}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
