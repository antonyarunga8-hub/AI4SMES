import React, { useState } from 'react';
import { useSme } from '../context/SmeContext';
import { Smartphone, CheckCircle, ShieldCheck, ArrowRight, Loader2, X, Lock } from 'lucide-react';

export default function MpesaStkModal() {
  const { stkModal, setStkModal, confirmStkPrompt, submitStkPin, formatMoney } = useSme();
  const [pinInput, setPinInput] = useState('');

  if (!stkModal.isOpen) return null;

  const handleClose = () => {
    setStkModal({ isOpen: false, invoice: null, phone: '', amount: 0, status: 'idle', pin: '' });
    setPinInput('');
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.length < 4) return;
    submitStkPin(pinInput);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#121824] rounded-3xl max-w-sm w-full p-6 border border-slate-200 dark:border-slate-700 shadow-2xl relative text-slate-900 dark:text-white animate-in fade-in zoom-in duration-200">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-3">
            <Smartphone className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Pan-African Mobile Money
          </span>
          <h3 className="text-lg font-extrabold mt-0.5">M-Pesa STK Push Simulator</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Simulating live Safaricom Daraja & MTN MoMo payment flow
          </p>
        </div>

        {/* State 1: Idle - Confirm Details */}
        {stkModal.status === 'idle' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Invoice:</span>
                <span className="font-mono font-bold">{stkModal.invoice?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Customer:</span>
                <span className="font-semibold">{stkModal.invoice?.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Recipient Phone:</span>
                <span className="font-mono font-semibold">{stkModal.phone}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-sm font-bold">
                <span>Amount:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                  {formatMoney(stkModal.amount)}
                </span>
              </div>
            </div>

            <button
              onClick={confirmStkPrompt}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <span>Dispatch STK Prompt to Phone</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* State 2: Prompting */}
        {stkModal.status === 'prompting' && (
          <div className="text-center py-8 space-y-3">
            <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mx-auto" />
            <h4 className="font-bold text-sm">Sending STK Push to handset...</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Simulating encrypted telecom handshake on {stkModal.phone}</p>
          </div>
        )}

        {/* State 3: SIM Prompt on Screen */}
        {stkModal.status === 'pin' && (
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="bg-[#111827] text-white p-5 rounded-2xl border-2 border-emerald-500 shadow-xl space-y-3 font-sans">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold border-b border-slate-700 pb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>M-PESA: Pay {formatMoney(stkModal.amount)}?</span>
              </div>
              <p className="text-xs text-slate-300">
                Do you want to pay {formatMoney(stkModal.amount)} to <strong className="text-white">AI4SMEs Merchant</strong>? Enter M-Pesa PIN:
              </p>
              <input
                type="password"
                maxLength={4}
                autoFocus
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="• • • •"
                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-2 text-center text-xl tracking-widest text-emerald-400 font-mono focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="w-1/2 py-2.5 rounded-xl text-xs text-slate-500 hover:text-slate-700 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pinInput.length < 4}
                className="w-1/2 bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-slate-950 font-bold py-2.5 rounded-xl text-xs shadow flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <span>Authorize</span>
                <CheckCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* State 4: Processing */}
        {stkModal.status === 'processing' && (
          <div className="text-center py-8 space-y-3">
            <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mx-auto" />
            <h4 className="font-bold text-sm">Verifying Mobile Money settlement...</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Reconciling transaction with core ledger</p>
          </div>
        )}

        {/* State 5: Success */}
        {stkModal.status === 'success' && (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">Payment Confirmed & Reconciled!</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Transaction ID: <span className="font-mono font-bold text-slate-900 dark:text-white">QA89XJ920K</span>. Invoice #{stkModal.invoice?.id} marked as <strong className="text-emerald-600 dark:text-emerald-400">PAID</strong> in your live bookkeeping ledger.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
