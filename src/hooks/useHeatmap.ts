import { useState, useEffect } from 'react';

/**
 * @typedef {'low' | 'medium' | 'high'} Density
 * Represents the crowd density states.
 */
export type Density = 'low' | 'medium' | 'high';

/**
 * @interface ZoneDensities
 * Strict TS mapping of density to our main venue sections.
 */
export interface ZoneDensities {
  A: Density;
  B: Density;
  C: Density;
}

/**
 * useHeatmap acts as the live telemetry engine for our interactive SVG maps.
 * "Vibe Coding" Logic: This hook is intentionally decoupled so React can manage
 * the high-frequency tick updates without re-rendering unrelated state blocks.
 * @param {boolean} isHighTraffic - Signals if the simulation is under stress.
 * @returns {{ zoneDensities: ZoneDensities }} The active mapped densities.
 */
export const useHeatmap = (isHighTraffic: boolean) => {
  const [zoneDensities, setZoneDensities] = useState<ZoneDensities>({
    A: 'low',
    B: 'low',
    C: 'low',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const randomDensity = (): Density => {
        const rand = Math.random();
        if (isHighTraffic) {
          return rand > 0.6 ? 'high' : rand > 0.2 ? 'medium' : 'low';
        } else {
          return rand > 0.8 ? 'high' : rand > 0.4 ? 'medium' : 'low';
        }
      };

      setZoneDensities({
        A: randomDensity(),
        B: randomDensity(),
        C: randomDensity(),
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isHighTraffic]);

  return { zoneDensities };
};
