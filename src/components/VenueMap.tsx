import React, { type FC } from 'react';
import type { Density, ZoneDensities } from '../hooks/useHeatmap';

interface VenueMapProps {
  densities: ZoneDensities;
}

const getDensityStyles = (density: Density) => {
  switch (density) {
    case 'high':
      return { fill: 'rgba(254, 226, 226, 0.5)', stroke: '#f87171', status: 'High Traffic', titleColor: '#b91c1c' };
    case 'medium':
      return { fill: 'rgba(254, 243, 199, 0.5)', stroke: '#fbbf24', status: 'Moderate Traffic', titleColor: '#b45309' };
    case 'low':
    default:
      return { fill: 'rgba(209, 250, 229, 0.5)', stroke: '#34d399', status: 'Clear Status', titleColor: '#047857' };
  }
};

/**
 * Visualizes live venue heatmap zones using perfectly symmetrical geometrical paths.
 * Styled with an ultra-minimalist, Apple-inspired aesthetic.
 */
const VenueMap: FC<VenueMapProps> = ({ densities }) => {
  const styleA = getDensityStyles(densities.A);
  const styleB = getDensityStyles(densities.B);
  const styleC = getDensityStyles(densities.C);

  // Symmetrical Geometry Configuration
  // Outer ellipse: rx=180 ry=130 | Inner ellipse: rx=90 ry=70 | Center: (200, 150)
  // Gaps: Horizontal = 8 (y=146 & y=154), Vertical = 8 (x=196 & x=204)
  
  return (
    <div className="relative w-full max-w-2xl mx-auto bg-white/70 backdrop-blur-[40px] border border-slate-200/50 p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] group">
      
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-rose-50/20 pointer-events-none" />
      
      <div className="flex justify-between items-center mb-10 relative z-20">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-800">Zone Heatmap</h3>
          <p className="text-slate-400 text-sm font-medium mt-1">Live structural capacity overview</p>
        </div>
        <div className="flex items-center gap-2.5 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-transform hover:scale-105">
           <span className="relative flex h-2 w-2">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
           </span>
           <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Live</span>
        </div>
      </div>
      
      <svg 
        viewBox="0 0 400 300" 
        className="w-full h-auto relative z-10 transition-transform duration-700 group-hover:scale-[1.01]"
        role="img"
        aria-label="Interactive map showing live crowd densities at the venue"
      >
        <title>Live Venue Crowd Heatmap</title>

        {/* Minimal Outer Stadium Border */}
        <ellipse cx="200" cy="150" rx="198" ry="148" fill="none" stroke="#f8fafc" strokeWidth="2" aria-hidden="true" />
        <ellipse cx="200" cy="150" rx="190" ry="140" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" aria-hidden="true" />

        {/* Section A (Top Half) */}
        <g role="img" aria-label={`Section A is currently experiencing ${styleA.status}`} className="cursor-pointer hover:opacity-75 transition-opacity duration-300">
          <title>{`Section A: ${styleA.status}`}</title>
          <path 
            d="M 20 146 A 180 130 0 0 1 380 146 L 290 146 A 90 70 0 0 0 110 146 Z" 
            fill={styleA.fill} 
            stroke={styleA.stroke} 
            strokeWidth="1.5" 
            className="transition-colors duration-700"
          />
          <text x="200" y="55" fill={styleA.titleColor} fontSize="13" fontWeight="700" textAnchor="middle" letterSpacing="0.05em" className="pointer-events-none uppercase">Sec A</text>
        </g>

        {/* Section B (Bottom Left Quadrant) */}
        <g role="img" aria-label={`Section B is currently experiencing ${styleB.status}`} className="cursor-pointer hover:opacity-75 transition-opacity duration-300">
          <title>{`Section B: ${styleB.status}`}</title>
          <path 
            d="M 110 154 L 20 154 A 180 130 0 0 0 196 280 L 196 220 A 90 70 0 0 1 110 154 Z"
            fill={styleB.fill} 
            stroke={styleB.stroke} 
            strokeWidth="1.5" 
            className="transition-colors duration-700"
          />
          <text x="105" y="235" fill={styleB.titleColor} fontSize="13" fontWeight="700" textAnchor="middle" letterSpacing="0.05em" className="pointer-events-none uppercase">Sec B</text>
        </g>

        {/* Section C (Bottom Right Quadrant) */}
        <g role="img" aria-label={`Section C is currently experiencing ${styleC.status}`} className="cursor-pointer hover:opacity-75 transition-opacity duration-300">
          <title>{`Section C: ${styleC.status}`}</title>
          <path 
            d="M 204 220 L 204 280 A 180 130 0 0 0 380 154 L 290 154 A 90 70 0 0 1 204 220 Z"
            fill={styleC.fill} 
            stroke={styleC.stroke} 
            strokeWidth="1.5" 
            className="transition-colors duration-700"
          />
          <text x="295" y="235" fill={styleC.titleColor} fontSize="13" fontWeight="700" textAnchor="middle" letterSpacing="0.05em" className="pointer-events-none uppercase">Sec C</text>
        </g>

        {/* Central Pitch / Field */}
        <g aria-hidden="true" className="opacity-90">
          {/* Inner Field Boundary */}
          <rect x="130" y="100" width="140" height="100" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          
          {/* Midline */}
          <line x1="200" y1="100" x2="200" y2="200" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />
          
          {/* Center Circle */}
          <circle cx="200" cy="150" r="18" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
          
          {/* Center Dot */}
          <circle cx="200" cy="150" r="3" fill="#94a3b8" />
          
          {/* Label */}
          <text x="200" y="154" fill="#94a3b8" fontSize="10" fontWeight="700" letterSpacing="0.25em" textAnchor="middle" className="pointer-events-none uppercase">Field</text>
        </g>

      </svg>
      
      {/* Minimal Legend */}
      <div className="flex justify-center gap-12 mt-12 mb-2 relative z-20" aria-hidden="true">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> 
          <span className="text-[13px] font-semibold text-slate-500 tracking-wide">Clear</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> 
          <span className="text-[13px] font-semibold text-slate-500 tracking-wide">Moderate</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span> 
          <span className="text-[13px] font-semibold text-slate-500 tracking-wide">Busy</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(VenueMap);
