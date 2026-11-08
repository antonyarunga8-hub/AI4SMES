import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'portal'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ai4smes_theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  const [businessProfile, setBusinessProfile] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ai4smes_profile');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return {
      name: 'Safari Ventures Africa',
      currency: 'KES',
      sector: 'Retail & Distribution'
    };
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('ai4smes_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLaunchPortal = (customProfile) => {
    if (customProfile) {
      setBusinessProfile(customProfile);
      localStorage.setItem('ai4smes_profile', JSON.stringify(customProfile));
    }
    setView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0E17] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {view === 'landing' ? (
        <LandingPage 
          onLaunchPortal={handleLaunchPortal}
          theme={theme}
          toggleTheme={toggleTheme}
          businessProfile={businessProfile}
        />
      ) : (
        <Dashboard 
          onBackToLanding={() => {
            setView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          theme={theme}
          toggleTheme={toggleTheme}
          businessProfile={businessProfile}
          setBusinessProfile={setBusinessProfile}
        />
      )}
    </div>
  );
}
