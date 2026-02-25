import { useState, useEffect } from 'react';

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const marketOpen = time.getHours() >= 9 && time.getHours() < 16 && time.getDay() > 0 && time.getDay() < 6;

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-12">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Logo */}
        <div className="relative">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#0a0a0b] flex items-center justify-center">
            <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${marketOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          </div>
        </div>

        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2">
            Wealth Builder
            <span className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full bg-amber-500/10 text-amber-400 font-medium uppercase tracking-wider">
              Pro
            </span>
          </h1>
          <p className="text-xs md:text-sm text-white/40">
            {marketOpen ? 'Market Open' : 'Market Closed'} · {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2 md:gap-3">
        <button className="px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-lg md:rounded-xl transition-all duration-200 min-h-[44px] flex items-center">
          <svg className="w-4 h-4 mr-1.5 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          Analytics
        </button>
        <button className="px-3 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 rounded-lg md:rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 min-h-[44px] flex items-center">
          <svg className="w-4 h-4 mr-1.5 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Trade
        </button>
      </div>
    </header>
  );
}