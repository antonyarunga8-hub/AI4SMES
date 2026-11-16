import React, { createContext, useContext, useState, useEffect } from 'react';
import { dbSaveInvoice, dbSaveLead, dbSaveCampaign } from '../firebase';
import confetti from 'canvas-confetti';

const SmeContext = createContext(null);

export const currencySymbols = {
  KES: 'KES ',
  USD: '$',
  NGN: '₦',
  GHS: 'GH₵',
  ZAR: 'R '
};

export const currencyMultipliers = {
  KES: 1,
  USD: 0.0077,
  NGN: 12.5,
  GHS: 0.12,
  ZAR: 0.14
};

const initialInvoices = [
  { id: 'INV-2026-084', client: 'Westlands Electronics', amount: 25000, status: 'Paid', date: '2026-08-02', category: 'Retail Supply', phone: '+254 712 345 678' },
  { id: 'INV-2026-083', client: 'Kazi Tech Solutions', amount: 45000, status: 'Overdue', date: '2026-07-28', category: 'IT Consulting', phone: '+254 722 987 654' },
  { id: 'INV-2026-082', client: 'Safari Supplies Ltd', amount: 18500, status: 'Pending', date: '2026-08-03', category: 'Hardware', phone: '+254 733 112 233' },
  { id: 'INV-2026-081', client: 'Amani Retailers', amount: 32000, status: 'Pending', date: '2026-08-01', category: 'Wholesale', phone: '+254 701 445 566' },
  { id: 'INV-2026-080', client: 'Kilimani Medical Center', amount: 88000, status: 'Paid', date: '2026-07-25', category: 'Equipment', phone: '+254 788 990 011' }
];

const initialLeads = [
  { id: 1, name: "Safari Tours & Travel", contact: "Dennis Mutua", location: "Nairobi", score: 94, stage: "Qualified", val: 120000, source: "WhatsApp Bot", phone: "+254 711 223 344", lastContact: "Today" },
  { id: 2, name: "Kilifi Organics Store", contact: "Fatuma Ali", location: "Mombasa", score: 88, stage: "Negotiation", val: 65000, source: "Website Lead Form", phone: "+254 722 334 455", lastContact: "Yesterday" },
  { id: 3, name: "Eldoret Tech Academy", contact: "Peter Kiprop", location: "Eldoret", score: 76, stage: "Discovery", val: 95000, source: "AI Business Directory", phone: "+254 733 445 566", lastContact: "3 days ago" },
  { id: 4, name: "Uganda Agro Trade", contact: "Josephine Musisi", location: "Kampala", score: 91, stage: "Qualified", val: 210000, source: "LinkedIn AI Agent", phone: "+256 701 234 567", lastContact: "Today" },
  { id: 5, name: "Kigali Logistics Hub", contact: "Paul Nkurunziza", location: "Kigali", score: 82, stage: "Closed Won", val: 150000, source: "Direct Referral", phone: "+250 788 123 456", lastContact: "1 week ago" }
];

const initialCampaigns = [
  { id: 1, platform: 'WhatsApp Status & Story', content: '🚀 Big News! Get 15% off all inventory items this Friday. Tap link to order via WhatsApp!', time: 'Friday 8:00 AM', status: 'Scheduled' },
  { id: 2, platform: 'Instagram & Facebook', content: 'Empowering local businesses with AI-driven bookkeeping! Connect with us on WhatsApp.', time: 'Tomorrow 2:00 PM', status: 'Scheduled' }
];

const initialFaqs = [
  { id: 1, question: "What are your business opening hours?", answer: "We are open Monday to Saturday from 8:00 AM to 6:00 PM EAT. AI Customer Service handles inquiries 24/7.", category: "Hours & Location" },
  { id: 2, question: "How do I make a payment via M-Pesa / Mobile Money?", answer: "Send payment to Paybill 4082210 or Till Number 982121. AI will issue instant receipt confirmation.", category: "Payments" },
  { id: 3, question: "Do you deliver across East Africa?", answer: "Yes! We ship across Kenya, Uganda, Tanzania, and Rwanda within 24-48 hours.", category: "Shipping" }
];

const initialAppointments = [
  { id: 101, client: "Dr. Kamau - Kilimani Clinic", service: "AI Setup Consultation", date: "Today, 2:30 PM", status: "Confirmed" },
  { id: 102, client: "Grace Wanjiku - Apex Retail", service: "Bookkeeping Onboarding", date: "Tomorrow, 10:00 AM", status: "Confirmed" },
  { id: 103, client: "David Ochieng - Logistics Ltd", service: "WhatsApp Bot Setup", date: "Friday, 4:00 PM", status: "Pending" }
];

const initialNotifications = [
  { id: 1, title: "Overdue Invoice Alert", message: "Kazi Tech Solutions has an overdue invoice of KES 45,000 (3 days past due).", time: "10 mins ago", type: "warning", read: false },
  { id: 2, title: "New Qualified Lead", message: "Safari Tours & Travel scored 94/100 purchase propensity via WhatsApp.", time: "1 hour ago", type: "success", read: false },
  { id: 3, title: "Campaign Scheduled", message: "Friday WhatsApp Status Flash Sale scheduled for 8:00 AM.", time: "2 hours ago", type: "info", read: true }
];

export function SmeProvider({ children }) {
  // Business Profile
  const [businessProfile, setBusinessProfile] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ai4smes_profile');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return {
      name: 'Safari Ventures Africa',
      currency: 'KES',
      sector: 'Retail & Wholesale',
      phone: '+254 712 000 111',
      tillNumber: '982121',
      paybill: '4082210',
      email: 'contact@safariventures.co.ke',
      address: 'Westlands Commercial Hub, Nairobi',
      country: 'Kenya',
      autoReminders: true,
      autoMarketing: true,
      autoBot: true
    };
  });

  // Currency
  const [currency, setCurrency] = useState(businessProfile.currency || 'KES');

  // Core Data Collections with LocalStorage caching
  const [invoices, setInvoices] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ai4smes_invoices');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return initialInvoices;
  });

  const [leads, setLeads] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ai4smes_leads');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return initialLeads;
  });

  const [campaigns, setCampaigns] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ai4smes_campaigns');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return initialCampaigns;
  });

  const [faqs, setFaqs] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ai4smes_faqs');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return initialFaqs;
  });

  const [appointments, setAppointments] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ai4smes_appointments');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return initialAppointments;
  });

  const [notifications, setNotifications] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ai4smes_notifications');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return initialNotifications;
  });

  // Interactive M-Pesa STK Push Modal State
  const [stkModal, setStkModal] = useState({
    isOpen: false,
    invoice: null,
    phone: '',
    amount: 0,
    status: 'idle', // 'idle' | 'prompting' | 'pin' | 'success'
    pin: ''
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ai4smes_profile', JSON.stringify(businessProfile));
  }, [businessProfile]);

  useEffect(() => {
    localStorage.setItem('ai4smes_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('ai4smes_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('ai4smes_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('ai4smes_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('ai4smes_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('ai4smes_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Currency Converter Formatter
  const formatMoney = (amountInKes, targetCurrency = currency) => {
    const mult = currencyMultipliers[targetCurrency] || 1;
    const sym = currencySymbols[targetCurrency] || 'KES ';
    const converted = amountInKes * mult;
    return sym + converted.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  // Total Metrics Calculations
  const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0) + 732000;
  const totalExpenses = 320000;
  const netProfit = totalRevenue - totalExpenses;
  const pendingInvoices = invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue');
  const outstandingAmount = pendingInvoices.reduce((acc, curr) => acc + curr.amount, 0);
  const pipelineValue = leads.reduce((acc, curr) => acc + curr.val, 0);

  // Invoice Handlers
  const createInvoice = async (invoiceData) => {
    const newInv = {
      id: `INV-2026-0${invoices.length + 85}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      ...invoiceData
    };
    await dbSaveInvoice(newInv);
    setInvoices(prev => [newInv, ...prev]);
    addNotification({
      title: "Invoice Generated",
      message: `Invoice #${newInv.id} created for ${newInv.client} (${formatMoney(newInv.amount)}).`,
      type: "info"
    });
    confetti({ particleCount: 40, spread: 50 });
    return newInv;
  };

  const markInvoicePaid = (id) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: 'Paid' } : inv));
    const inv = invoices.find(i => i.id === id);
    addNotification({
      title: "Payment Received",
      message: `Invoice #${id} settled by ${inv?.client || 'Client'} via Mobile Money!`,
      type: "success"
    });
    confetti({ particleCount: 60, spread: 70 });
  };

  const sendInvoiceReminder = (id) => {
    const inv = invoices.find(i => i.id === id);
    addNotification({
      title: "WhatsApp Reminder Sent",
      message: `Automated payment reminder dispatched to ${inv?.client} (${inv?.phone || 'WhatsApp'}).`,
      type: "info"
    });
  };

  // Lead Handlers
  const addLead = async (leadData) => {
    const newL = {
      id: Date.now(),
      score: Math.floor(Math.random() * 20) + 80,
      stage: 'Discovery',
      lastContact: 'Just now',
      ...leadData
    };
    await dbSaveLead(newL);
    setLeads(prev => [newL, ...prev]);
    addNotification({
      title: "New Lead Added",
      message: `${newL.name} added to pipeline (${formatMoney(newL.val)}).`,
      type: "success"
    });
    return newL;
  };

  const updateLeadStage = (id, newStage) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, stage: newStage, lastContact: 'Today' } : l));
  };

  const followUpLead = (id) => {
    const lead = leads.find(l => l.id === id);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, lastContact: 'Just now' } : l));
    addNotification({
      title: "Lead Follow-Up Dispatched",
      message: `Personalized WhatsApp follow-up sent to ${lead?.contact} (${lead?.name}).`,
      type: "info"
    });
    confetti({ particleCount: 30, spread: 45 });
  };

  // Campaign Handlers
  const createCampaign = async (campData) => {
    const newCamp = {
      id: Date.now(),
      time: 'Scheduled for Optimal Engagement',
      status: 'Scheduled',
      ...campData
    };
    await dbSaveCampaign(newCamp);
    setCampaigns(prev => [newCamp, ...prev]);
    addNotification({
      title: "Campaign Scheduled",
      message: `New promotional campaign queued for ${newCamp.platform}.`,
      type: "success"
    });
    confetti({ particleCount: 35, spread: 50 });
    return newCamp;
  };

  // FAQ Handlers
  const addFaq = (faqData) => {
    const newF = { id: Date.now(), ...faqData };
    setFaqs(prev => [...prev, newF]);
    addNotification({
      title: "AI FAQ Knowledgebase Updated",
      message: `New trained response: "${newF.question.slice(0, 30)}..."`,
      type: "info"
    });
  };

  // Notifications
  const addNotification = (notif) => {
    const n = {
      id: Date.now(),
      time: "Just now",
      read: false,
      ...notif
    };
    setNotifications(prev => [n, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // STK Push Payment Simulator
  const triggerStkPush = (invoice) => {
    setStkModal({
      isOpen: true,
      invoice,
      phone: invoice.phone || businessProfile.phone || '+254 712 345 678',
      amount: invoice.amount,
      status: 'idle',
      pin: ''
    });
  };

  const confirmStkPrompt = () => {
    setStkModal(prev => ({ ...prev, status: 'prompting' }));
    setTimeout(() => {
      setStkModal(prev => ({ ...prev, status: 'pin' }));
    }, 1200);
  };

  const submitStkPin = (pinValue) => {
    setStkModal(prev => ({ ...prev, status: 'processing', pin: pinValue }));
    setTimeout(() => {
      if (stkModal.invoice) {
        markInvoicePaid(stkModal.invoice.id);
      }
      setStkModal(prev => ({ ...prev, status: 'success' }));
      setTimeout(() => {
        setStkModal({ isOpen: false, invoice: null, phone: '', amount: 0, status: 'idle', pin: '' });
      }, 2000);
    }, 1500);
  };

  // Unified Natural Language AI Command Dispatcher
  const executeAiCommand = (rawQuery) => {
    const query = rawQuery.trim();
    const lower = query.toLowerCase();

    // 1. Profit & Loss / Financials
    if (lower.includes("profit") || lower.includes("revenue") || lower.includes("how much") || lower.includes("expenses")) {
      return {
        reply: `📊 *Financial Status for ${businessProfile.name}*\n\n• Gross Revenue: ${formatMoney(totalRevenue)}\n• Expenses: ${formatMoney(totalExpenses)}\n• *Net Profit: ${formatMoney(netProfit)} (62% Margin)* 📈\n• Outstanding Invoices: ${formatMoney(outstandingAmount)} across ${pendingInvoices.length} clients.\n\nAll ledgers are synchronized. Would you like me to prepare the Executive PDF report?`,
        tab: "advisor"
      };
    }

    // 2. Unpaid Invoices
    if (lower.includes("unpaid") || lower.includes("overdue") || lower.includes("pending invoice") || lower.includes("who owes")) {
      const list = pendingInvoices.slice(0, 3).map((inv, idx) => `${idx + 1}. *${inv.client}* - ${formatMoney(inv.amount)} (${inv.status})`).join('\n');
      return {
        reply: `🧾 *Outstanding Invoices Alert*\n\n${list}\n\nTotal Pending: *${formatMoney(outstandingAmount)}*.\nReply *"SEND REMINDERS"* to dispatch automated WhatsApp reminders with payment links.`,
        tab: "bookkeeping"
      };
    }

    // 3. Create Invoice Command
    if (lower.includes("send invoice") || lower.includes("create invoice") || lower.includes("bill")) {
      // Extract amount or default
      const amountMatch = query.match(/\d+[\d,]*/);
      const amount = amountMatch ? parseInt(amountMatch[0].replace(/,/g, ''), 10) : 25000;
      let client = "Westlands Electronics";
      if (lower.includes("to ")) {
        client = query.split(/to /i)[1]?.split(/for|\d/)[0]?.trim() || client;
      }
      createInvoice({
        client,
        amount,
        category: "Product Delivery",
        phone: "+254 712 345 678"
      });
      return {
        reply: `✅ *New Invoice Generated & Dispatched!*\n\n• Billed To: ${client}\n• Amount: ${formatMoney(amount)}\n• Payment Link: https://pay.ai4smes.co/inv-${invoices.length + 86}\n• Direct WhatsApp dispatched with M-Pesa Till: ${businessProfile.tillNumber}.\nStatus: *Pending Payment*.`,
        tab: "bookkeeping"
      };
    }

    // 4. Marketing Campaign
    if (lower.includes("marketing") || lower.includes("campaign") || lower.includes("post") || lower.includes("social")) {
      const copy = `🔥 *SPECIAL ${businessProfile.name.toUpperCase()} OFFER!* 🔥\n\nUpgrade your business efficiency with our exclusive weekend deal! Get 15% off all orders placed via WhatsApp this Friday. Reply YES to reserve yours! 📦✨`;
      createCampaign({
        platform: 'WhatsApp Status & Instagram',
        content: copy
      });
      return {
        reply: `🎨 *AI Marketing Campaign Generated & Queued!*\n\n"${copy}"\n\n✅ Scheduled to publish across WhatsApp Status & Social Media. Added to your Marketing Studio.`,
        tab: "marketing"
      };
    }

    // 5. Follow up with leads
    if (lower.includes("lead") || lower.includes("follow up") || lower.includes("sales")) {
      leads.forEach(l => {
        if (l.stage === 'Qualified') followUpLead(l.id);
      });
      return {
        reply: `🎯 *Sales Follow-Up Executed*\n\nDispatched personalized WhatsApp follow-ups to all qualified leads in your pipeline (${leads.filter(l => l.stage === 'Qualified').length} clients contacted). Deal value in motion: *${formatMoney(pipelineValue)}*.`,
        tab: "leads"
      };
    }

    // Default
    return {
      reply: `🤖 *Business Command Processed: "${query}"*\n\nI have cross-checked your SME Operating System. Financials, WhatsApp customer bot, and sales pipelines are actively operating.`,
      tab: "overview"
    };
  };

  const value = {
    businessProfile,
    setBusinessProfile,
    currency,
    setCurrency,
    formatMoney,
    invoices,
    createInvoice,
    markInvoicePaid,
    sendInvoiceReminder,
    leads,
    addLead,
    updateLeadStage,
    followUpLead,
    campaigns,
    createCampaign,
    faqs,
    addFaq,
    appointments,
    notifications,
    addNotification,
    markNotificationRead,
    clearNotifications,
    stkModal,
    setStkModal,
    triggerStkPush,
    confirmStkPrompt,
    submitStkPin,
    executeAiCommand,
    totalRevenue,
    totalExpenses,
    netProfit,
    outstandingAmount,
    pipelineValue
  };

  return <SmeContext.Provider value={value}>{children}</SmeContext.Provider>;
}

export function useSme() {
  const context = useContext(SmeContext);
  if (!context) {
    throw new Error('useSme must be used within an SmeProvider');
  }
  return context;
}
