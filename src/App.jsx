import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'portal'

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-100 font-sans">
      {view === 'landing' ? (
        <LandingPage onLaunchPortal={() => setView('portal')} />
      ) : (
        <Dashboard onBackToLanding={() => setView('landing')} />
      )}
    </div>
  );
}
