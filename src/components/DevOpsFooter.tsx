import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ShieldAlert, Server, Globe } from 'lucide-react';

interface DevOpsFooterProps {
  isHighTraffic: boolean;
  toggleHighTraffic: () => void;
}

const DevOpsFooter: FC<DevOpsFooterProps> = ({ isHighTraffic, toggleHighTraffic }) => {
  const [latency, setLatency] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const variation = Math.floor(Math.random() * 11) - 5;
        const newLatency = prev + variation;
        return isHighTraffic ? Math.min(Math.max(newLatency, 180), 350) : Math.min(Math.max(newLatency, 30), 80);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isHighTraffic]);

  return (
    <footer className="mt-12 w-full max-w-7xl mx-auto bg-slate-900/40 backdrop-blur-xl px-5 md:px-8 py-5 rounded-2xl flex flex-col md:flex-row items-center justify-between text-xs md:text-sm shadow-2xl border border-slate-700/50 gap-5 md:gap-0 relative overflow-hidden z-10">
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900/10 via-transparent to-sky-900/10 pointer-events-none" />

      {/* Telemetry Stats */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-slate-400 font-mono relative z-10">
        <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/60 rounded-xl border border-slate-800 shadow-inner">
          <span className={`w-2.5 h-2.5 rounded-full animate-pulse border border-slate-900 ${isHighTraffic ? 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)]' : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]'}`}></span>
          <span className="text-slate-300 font-semibold tracking-wide">Health: {isHighTraffic ? 'Strained' : 'Optimal'}</span>
        </span>

        <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/60 rounded-xl border border-slate-800 shadow-inner">
          <Globe className="w-4 h-4 text-sky-400" />
          <span className="text-slate-300 font-semibold tracking-wide">Latency:</span> <span className={`font-bold ${latency > 150 ? 'text-amber-400 drop-shadow-md' : 'text-emerald-400'}`}>{latency}ms</span>
        </span>

        <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/60 rounded-xl border border-slate-800 shadow-inner">
          <Server className="w-4 h-4 text-violet-400" />
          <span className="text-slate-300 font-semibold tracking-wide">LB: Active</span>
        </span>
      </div>
      
      {/* Admin Controls */}
      <button 
        onClick={toggleHighTraffic}
        aria-label={isHighTraffic ? "Disable High Traffic Simulation" : "Enable High Traffic Simulation"}
        className={`relative z-10 flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold tracking-wide transition-all duration-300 shadow-lg active:scale-95 cursor-pointer flex-shrink-0 ${
          isHighTraffic 
            ? 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]' 
            : 'bg-violet-600 text-white hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] border-transparent'
        }`}
      >
        <ShieldAlert className="w-4 h-4" />
        {isHighTraffic ? 'High Traffic: ACTIVE' : 'Simulate High Traffic'}
      </button>
    </footer>
  );
};

export default DevOpsFooter;
