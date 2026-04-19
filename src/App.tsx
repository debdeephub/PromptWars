import { useSimulation } from './hooks/useSimulation';
import VenueMap from './components/VenueMap';
import GeminiConcierge from './components/GeminiConcierge';
import QueueDashboard from './components/QueueDashboard';
import DevOpsFooter from './components/DevOpsFooter';
import { ShieldCheck } from 'lucide-react';

function App() {
  const { zoneDensities, waitTimes, isHighTraffic, toggleHighTraffic } = useSimulation();

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center">
      
      {/* Header */}
      <header className="mb-10 text-center max-w-4xl w-full">
        <div className="inline-flex items-center justify-center gap-2 mb-4 bg-violet-100 border border-violet-200 px-5 py-2 rounded-full shadow-sm">
          <ShieldCheck className="w-4 h-4 text-violet-600 animate-pulse" />
          <span className="text-xs font-bold text-violet-700 uppercase tracking-widest">SmartVenue System</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight mb-5 drop-shadow-sm">
          Live Venue Telemetry
        </h1>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
          Real-time spatial density and simulated crowd operations.
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 items-stretch justify-center">
        
        {/* Left Column - Map */}
        <div className="w-full lg:w-[60%] flex flex-col gap-8 shadow-xl rounded-3xl bg-white/40">
          <VenueMap densities={zoneDensities} />
        </div>

        {/* Right Column - Chat & Queue */}
        <div className="w-full lg:w-[40%] flex flex-col gap-8">
          <div className="h-[450px]">
            <GeminiConcierge densities={zoneDensities} waitTimes={waitTimes} isHighTraffic={isHighTraffic} />
          </div>
          <div className="flex-1 min-h-[160px]">
            <QueueDashboard waitTimes={waitTimes} />
          </div>
        </div>

      </main>

      <DevOpsFooter isHighTraffic={isHighTraffic} toggleHighTraffic={toggleHighTraffic} />

    </div>
  );
}

export default App;
