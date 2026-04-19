import { motion } from 'framer-motion';
import { AlertCircle, Clock, Users } from 'lucide-react';

const ALERTS = [
  { id: 1, type: 'critical', title: 'Gate C Congestion', time: 'Just now', desc: 'Flow rate reduced by 40%. Automated rerouting initialized.' },
  { id: 2, type: 'warning', title: 'Restroom Queue', time: '2m ago', desc: 'Section 114 queue projecting > 15 mins. Dispatching cleanup.' },
  { id: 3, type: 'info', title: 'Concessions Resupplied', time: '10m ago', desc: 'North kiosk fully stocked with requested inventory.' },
  { id: 4, type: 'info', title: 'System Heartbeat', time: '12m ago', desc: 'All edge AI camera sensors reporting nominal status.' }
];

export function LiveAlerts() {
  return (
    <div className="flex flex-col h-full bg-slate-900/30 rounded-xl border border-slate-800/50 p-5 shadow-inner">
      <h3 className="text-slate-200 font-bold mb-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-violet-400" />
        Intelligent Dispatch
      </h3>
      <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {ALERTS.map((alert, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
            key={alert.id}
            className={`p-3.5 rounded-xl border transition-colors ${
              alert.type === 'critical' ? 'bg-red-500/5 border-red-500/20 hover:bg-red-500/10' :
              alert.type === 'warning' ? 'bg-orange-500/5 border-orange-500/20 hover:bg-orange-500/10' :
              'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60'
            }`}
          >
            <div className="flex justify-between items-start mb-1.5">
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                alert.type === 'critical' ? 'text-red-400' :
                alert.type === 'warning' ? 'text-orange-400' : 'text-sky-400'
              }`}>
                {alert.type === 'critical' && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />}
                {alert.title}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">{alert.time}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{alert.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 pt-5 border-t border-slate-800/60 grid grid-cols-2 gap-3">
        <div className="bg-slate-800/40 border border-slate-700/50 p-3.5 rounded-xl flex flex-col">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1.5">
            <Users className="w-3.5 h-3.5 text-sky-400" /> Avg Queue
          </span>
          <span className="text-2xl font-bold text-white tracking-tight">4.2<span className="text-sm text-slate-500 font-normal ml-0.5">m</span></span>
        </div>
        <div className="bg-slate-800/40 border border-slate-700/50 p-3.5 rounded-xl flex flex-col">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1.5">
            <Clock className="w-3.5 h-3.5 text-violet-400" /> Peak Est.
          </span>
          <span className="text-2xl font-bold text-orange-400 tracking-tight">14<span className="text-sm text-orange-500/50 font-normal ml-0.5">m</span></span>
        </div>
      </div>
    </div>
  );
}
