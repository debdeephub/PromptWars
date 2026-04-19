import React, { type FC } from 'react';
import { Activity } from 'lucide-react';
import type { WaitTimes } from '../hooks/useSimulation';

interface QueueDashboardProps {
  waitTimes: WaitTimes;
}

const QueueDashboard: FC<QueueDashboardProps> = ({ waitTimes }) => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-2xl p-8 rounded-[2rem] text-center shadow-2xl relative overflow-hidden h-full flex flex-col justify-center border border-slate-700/50 w-full">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-52 h-52 bg-violet-500/10 rounded-full blur-[40px] pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-sky-500/10 rounded-full blur-[40px] pointer-events-none"></div>
      
      <h3 className="font-bold text-slate-200 mb-8 flex items-center justify-center gap-2.5 relative z-10 text-xl tracking-tight">
        <Activity className="w-6 h-6 text-violet-400" />
        Live Queue Telemetry
      </h3>
      
      <div className="grid grid-cols-2 gap-6 relative z-10">
        <div className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/50 shadow-lg flex flex-col items-center justify-center transition-all hover:bg-slate-800/60 backdrop-blur-md">
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-3">Stadium Snacks</p>
          <div className="flex items-baseline gap-1.5">
            <p className={`text-5xl font-black font-mono tracking-tighter drop-shadow-md ${waitTimes.snacks > 20 ? 'text-red-400' : waitTimes.snacks > 10 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {waitTimes.snacks}
            </p>
            <span className="text-sm text-slate-500 font-sans font-semibold uppercase">min</span>
          </div>
        </div>
        
        <div className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/50 shadow-lg flex flex-col items-center justify-center transition-all hover:bg-slate-800/60 backdrop-blur-md">
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-3">Main Entrance</p>
          <div className="flex items-baseline gap-1.5">
            <p className={`text-5xl font-black font-mono tracking-tighter drop-shadow-md ${waitTimes.entrance > 15 ? 'text-red-400' : waitTimes.entrance > 8 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {waitTimes.entrance}
            </p>
            <span className="text-sm text-slate-500 font-sans font-semibold uppercase">min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(QueueDashboard);
