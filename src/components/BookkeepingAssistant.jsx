import React, { useState } from 'react';
import { 
  DollarSign, 
  FileText, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  Filter, 
  Printer, 
  Eye, 
  X,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { dbSaveInvoice } from '../firebase';

export default function BookkeepingAssistant({ currency = 'KES', theme, businessName = 'Safari Ventures Africa' }) {
  const currencySymbols = { KES: 'KES ', USD: '$', NGN: '₦', GHS: 'GH₵', ZAR: 'R ' };
  const symbol = currencySymbols[currency] || 'KES ';
  const multiplier = currency === 'USD' ? 0.0077 : currency === 'NGN' ? 12.5 : currency === 'GHS' ? 0.12 : currency === 'ZAR' ? 0.14 : 1;

  const fmt = (amt) => {
    const converted = amt * multiplier;
    return symbol + converted.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const [invoices, setInvoices] = useState([
    { id: 'INV-2026-084', client: 'Westlands Electronics', amount: 25000, status: 'Paid', date: '2026-08-02', category: 'Retail Supply', phone: '+254 712 345 678' },
    { id: 'INV-2026-083', client: 'Kazi Tech Solutions', amount: 45000, status: 'Overdue', date: '2026-07-28', category: 'IT Consulting', phone: '+254 722 987 654' },
    { id: 'INV-2026-082', client: 'Safari Supplies Ltd', amount: 18500, status: 'Pending', date: '2026-08-03', category: 'Hardware', phone: '+254 733 112 233' },
    { id: 'INV-2026-081', client: 'Amani Retailers', amount: 32000, status: 'Pending', date: '2026-08-01', category: 'Wholesale', phone: '+254 701 445 566' },
    { id: 'INV-2026-080', client: 'Kilimani Medical Center', amount: 88000, status: 'Paid', date: '2026-07-25', category: 'Equipment', phone: '+254 788 990 011' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [newClient, setNewClient] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('General Services');
  const [newPhone, setNewPhone] = useState('');
  const [aiNote, setAiNote] = useState('');

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    if (!newClient || !newAmount) return;

    const newInv = {
      id: `INV-2026-0${invoices.length + 85}`,
      client: newClient,
      amount: parseFloat(newAmount),
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      category: newCategory,
      phone: newPhone || '+254 700 000 000'
    };

    // Save to Firebase Firestore Database
    await dbSaveInvoice(newInv);

    setInvoices([newInv, ...invoices]);
    setNewClient('');
    setNewAmount('');
    setNewPhone('');
    setShowModal(false);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    setAiNote(`✅ Invoice #${newInv.id} created & saved to Firestore DB for ${newInv.client}. Sent payment link via WhatsApp!`);
  };

  const handleSendReminder = (id, client) => {
    setAiNote(`💬 Sent WhatsApp payment reminder with automated M-Pesa / Bank link to ${client} for invoice #${id}.`);
  };

  return (
    <div className="space-y-6">
      {/* Top AI Insight Bar */}
      <div className="glass-panel p-4 rounded-xl border border-emerald-500/30 flex items-center justify-between flex-wrap gap-3 bg-emerald-50 dark:bg-emerald-950/20 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <span className="text-slate-900 dark:text-white font-semibold text-sm">AI Bookkeeping Insight: </span>
            <span className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              Your cash flow is <strong className="text-emerald-600 dark:text-emerald-400">+24% healthy</strong> this month. Resolving 2 overdue invoices will add {fmt(63500)} working capital.
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all shadow"
        >
          <Plus className="w-4 h-4" /> Create AI Invoice
        </button>
      </div>

      {aiNote && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
          <span>{aiNote}</span>
          <button onClick={() => setAiNote('')} className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold ml-2">✕</button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Total Revenue</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">{fmt(845000)}</p>
          <p className="text-emerald-600 dark:text-emerald-400 text-xs font-medium mt-1 flex items-center gap-1">
            <span>↑ +18.4%</span> <span className="text-slate-400">vs last month</span>
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Operational Expenses</span>
            <ArrowDownRight className="w-4 h-4 text-rose-500 dark:text-rose-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">{fmt(320000)}</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-1">
            Optimized by AI by {fmt(42000)}
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Net Profit</span>
            <DollarSign className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">{fmt(525000)}</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-1">
            62% Net Profit Margin
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">
            <span>Outstanding Invoices</span>
            <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">{fmt(95500)}</p>
          <p className="text-amber-600 dark:text-amber-400 text-xs font-medium mt-1">
            3 pending payments
          </p>
        </div>
      </div>

      {/* Invoice Ledger Table */}
      <div className="glass-panel rounded-2xl p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Automated Invoices & Payment Tracking
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Integrated with WhatsApp invoice delivery & mobile money APIs</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
              Ledger Currency: {currency}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Invoice ID</th>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-medium">{inv.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">{inv.client}</td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">{inv.category}</td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">{inv.date}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{fmt(inv.amount)}</td>
                  <td className="py-3.5 px-4">
                    {inv.status === 'Paid' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Paid
                      </span>
                    )}
                    {inv.status === 'Pending' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Pending
                      </span>
                    )}
                    {inv.status === 'Overdue' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/30 inline-flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Overdue
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedReceipt(inv)}
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1 transition-all"
                        title="View / Print Printable Receipt"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-500" />
                        <span className="hidden sm:inline">Receipt</span>
                      </button>

                      {inv.status !== 'Paid' ? (
                        <button
                          onClick={() => handleSendReminder(inv.id, inv.client)}
                          className="text-xs px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 transition-all font-medium"
                        >
                          WhatsApp Remind
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Settled</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] text-slate-900 dark:text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
              <div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block">Official SME Invoice Receipt</span>
                <h4 className="text-xl font-black">{businessName}</h4>
              </div>
              <button onClick={() => setSelectedReceipt(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">✕</button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Invoice Number</span>
                  <span className="font-mono font-bold">{selectedReceipt.id}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Issue Date</span>
                  <span className="font-medium">{selectedReceipt.date}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Customer</span>
                  <span className="font-bold">{selectedReceipt.client}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Status</span>
                  <span className={`font-bold ${selectedReceipt.status === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>{selectedReceipt.status}</span>
                </div>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 font-semibold">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div className="flex items-center justify-between py-1 text-slate-600 dark:text-slate-300">
                  <span>{selectedReceipt.category} Item(s)</span>
                  <span className="font-bold">{fmt(selectedReceipt.amount)}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 font-black text-base text-emerald-600 dark:text-emerald-400">
                  <span>Total Payable:</span>
                  <span>{fmt(selectedReceipt.amount)}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-500/20 text-[11px] text-slate-600 dark:text-slate-300">
                <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-0.5">Mobile Money Payment Instructions:</p>
                <p>Send to M-Pesa Till: <strong className="font-mono text-slate-900 dark:text-white">982121</strong> or Paybill <strong className="font-mono text-slate-900 dark:text-white">4082210</strong>, Account: <strong className="font-mono text-slate-900 dark:text-white">{selectedReceipt.id}</strong>.</p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedReceipt(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-700 dark:hover:text-white"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Printer className="w-4 h-4" /> Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel bg-white dark:bg-[#121824] rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700 shadow-2xl relative">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Create AI Invoice
            </h3>
            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">Client Name / SME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mombasa Trading Co."
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">WhatsApp Phone Number</label>
                <input
                  type="text"
                  placeholder="e.g. +254 712 345 678"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">Amount ({currency})</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 35000"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="General Services">General Services</option>
                  <option value="Product Delivery">Product Delivery</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Wholesale Order">Wholesale Order</option>
                  <option value="Hospitality / Catering">Hospitality / Catering</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-700 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg transition-all"
                >
                  Generate & Send Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
