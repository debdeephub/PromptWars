import { LayoutDashboard, Map as MapIcon, Coffee, BellDot, ShieldAlert } from 'lucide-react';

export type Tab = 'Dashboard' | 'Live Map' | 'Concessions' | 'Staff Alerts';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Live Map', icon: MapIcon },
    { name: 'Concessions', icon: Coffee },
    { name: 'Staff Alerts', icon: BellDot },
  ] as const;

  return (
    <aside className="w-64 border-r border-slate-800/60 bg-slate-900/40 backdrop-blur-md flex flex-col p-4 z-10 shrink-0">
      <div className="flex items-center space-x-3 mb-10 mt-2 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-sky-400 leading-tight">SmartVenue</span>
          <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Command Core</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map(({ name, icon: Icon }) => {
          const isActive = activeTab === name;
          return (
             <button 
              key={name}
              onClick={() => setActiveTab(name as Tab)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer group ${
                isActive 
                  ? 'bg-violet-500/15 text-violet-300 border border-violet-500/20 shadow-inner' 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-violet-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span>{name}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5">
        <div className="flex items-center space-x-2 text-emerald-400 text-sm font-semibold mb-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>System Online</span>
        </div>
        <p className="text-xs text-slate-500">Latency: 14ms</p>
      </div>
    </aside>
  );
}
