import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function LiveVenueMap() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full rounded-xl bg-slate-950/50 border border-slate-800/50 overflow-hidden relative flex flex-col p-6">
      <h3 className="text-slate-300 font-semibold mb-4 z-10">Real-Time Trajectory & Density</h3>
      <div className="flex-1 relative flex items-center justify-center">
        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(148, 163, 184, 0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        {/* Mock Stadium View */}
        <div className="relative w-full max-w-[320px] lg:max-w-md aspect-square rounded-[100px] border border-slate-800 flex items-center justify-center bg-slate-900/20 shadow-2xl">
          {/* Field */}
          <div className="w-1/2 h-2/3 border-2 border-emerald-900/30 bg-emerald-950/10 rounded-full relative flex items-center justify-center">
            <div className="w-full h-px bg-emerald-900/30 absolute" />
            <div className="w-16 h-16 rounded-full border border-emerald-900/30 absolute" />
          </div>

          {/* Heatmap Zones */}
          <motion.div 
            animate={{ opacity: pulse ? 0.6 : 0.3 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-8 left-12 w-32 h-24 bg-red-500/20 blur-[32px] rounded-full pointer-events-none"
          />
          <div className="absolute bottom-16 right-12 w-24 h-24 bg-orange-500/10 blur-[24px] rounded-full pointer-events-none" />
          
          {/* Simulated Routing Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path 
              d="M 50 85 Q 25 70 25 50 T 45 15" 
              fill="transparent" 
              stroke="#a855f7" 
              strokeWidth="0.8"
              strokeDasharray="2 2"
              animate={{ strokeDashoffset: [20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <circle cx="45" cy="15" r="1.5" fill="#c084fc" />
            <circle cx="50" cy="85" r="1.5" fill="#38bdf8" />
          </svg>

          {/* Gate Label */}
          <div className="absolute top-[10%] right-[15%] flex flex-col items-center">
            <div className="px-2 py-1 bg-slate-800/80 rounded border border-slate-700/50 backdrop-blur-md">
              <span className="text-[9px] font-bold text-slate-300 uppercase">Gate B</span>
            </div>
            <div className="w-px h-6 bg-gradient-to-b from-slate-700 to-transparent mt-1" />
          </div>
        </div>
      </div>

       <div className="absolute bottom-6 left-6 flex space-x-5 z-10">
         <div className="flex items-center space-x-2">
           <div className="w-2.5 h-2.5 rounded-full bg-red-500/60 animate-pulse border border-red-500" />
           <span className="text-xs font-medium text-slate-400">High Density (85%)</span>
         </div>
         <div className="flex items-center space-x-2">
           <div className="w-2.5 h-2.5 rounded-full bg-orange-500/60 border border-orange-500" />
           <span className="text-xs font-medium text-slate-400">Moderate (45%)</span>
         </div>
       </div>
    </div>
  );
}
