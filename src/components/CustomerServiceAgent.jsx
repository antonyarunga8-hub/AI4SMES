import React, { useState } from 'react';
import { MessageSquare, Bot, Calendar, Clock, CheckCircle, Plus, Zap, Users, ShieldAlert, Sparkles, MessageCircle } from 'lucide-react';

export default function CustomerServiceAgent() {
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

  const handleAddFaq = (e) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer) return;
    setFaqs([...faqs, { id: Date.now(), question: newQuestion, answer: newAnswer, category: "Custom FAQ" }]);
    setNewQuestion('');
    setNewAnswer('');
  };

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Conversations Handled</span>
            <Bot className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">1,482</p>
          <p className="text-emerald-400 text-xs font-medium mt-1">94% Resolved Autonomously</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Avg Response Speed</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-2">1.8s</p>
          <p className="text-slate-400 text-xs font-medium mt-1">99.2% Faster than human staffing</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Appointments Booked</span>
            <Calendar className="w-4 h-4 text-violet-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-violet-400 mt-2">48</p>
          <p className="text-slate-400 text-xs font-medium mt-1">Synced to Google & Outlook Calendar</p>
        </div>
      </div>

      {/* Main Feature Tabs */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('live_support')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'live_support'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Live Support Monitor
            </button>
            <button
              onClick={() => setActiveTab('faq_builder')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'faq_builder'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" /> FAQ Knowledgebase
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'appointments'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" /> Appointments
            </button>
          </div>
        </div>

        {/* Tab 1: Live Support */}
        {activeTab === 'live_support' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Active Customer Conversations (3 Online)</span>
              <span className="text-emerald-400 font-medium">WhatsApp & Web Widget Live</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <strong className="text-white text-sm">Josephine N. (Nakuru)</strong>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono">WhatsApp</span>
                </div>
                <p className="text-slate-300 text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-800/60">
                  "Hi, do you have stock for wholesale maize grain?"
                </p>
                <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1 font-medium">
                  <Bot className="w-3.5 h-3.5" /> AI Replied: "Yes Josephine! We have 45 bags in Nakuru depot ready for pickup. Price KES 3,200/bag."
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <strong className="text-white text-sm">Samuel O. (Kampala)</strong>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sapphire-500/10 text-blue-400 font-mono">Web Chat</span>
                </div>
                <p className="text-slate-300 text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-800/60">
                  "Can I book a consultation call for Thursday afternoon?"
                </p>
                <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1 font-medium">
                  <Bot className="w-3.5 h-3.5" /> AI Replied: "Appointment set for Thursday 3:00 PM EAT. Calendar invite dispatched to your email."
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: FAQ Knowledgebase */}
        {activeTab === 'faq_builder' && (
          <div className="space-y-6">
            <form onSubmit={handleAddFaq} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Teach AI New Business Answer</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Frequently Asked Question..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  placeholder="AI Answer Response..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" /> Train AI Assistant
              </button>
            </form>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-bold text-white text-xs sm:text-sm">Q: {faq.question}</h5>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{faq.category}</span>
                  </div>
                  <p className="text-slate-300 text-xs">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Appointments */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Automated Calendar Bookings</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Client</th>
                    <th className="py-2.5 px-3">Service</th>
                    <th className="py-2.5 px-3">Date & Time</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {appointments.map((app) => (
                    <tr key={app.id}>
                      <td className="py-3 px-3 font-semibold text-white">{app.client}</td>
                      <td className="py-3 px-3 text-slate-400">{app.service}</td>
                      <td className="py-3 px-3 text-slate-300">{app.date}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium text-[11px]">
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
