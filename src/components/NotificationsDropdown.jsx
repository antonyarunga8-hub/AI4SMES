import React, { useState, useRef, useEffect } from 'react';
import { useSme } from '../context/SmeContext';
import { Bell, CheckCheck, Trash2, AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function NotificationsDropdown() {
  const { notifications, markNotificationRead, clearNotifications } = useSme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View notifications"
        className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm relative"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 font-black text-[9px] rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#121824] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Business Notifications</h4>
              {unreadCount > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold">
                  {unreadCount} New
                </span>
              )}
            </div>
            {notifications.length > 0 && (
              <button
                onClick={clearNotifications}
                className="text-[11px] text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No active notifications. All operations running smoothly!
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors cursor-pointer flex items-start gap-3 ${
                    !n.read ? 'bg-emerald-50/40 dark:bg-emerald-950/10' : ''
                  }`}
                >
                  <div className="mt-0.5">
                    {n.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />}
                    {n.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
                    {n.type === 'info' && <Info className="w-4 h-4 text-blue-500 shrink-0" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-bold truncate ${!n.read ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {n.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
