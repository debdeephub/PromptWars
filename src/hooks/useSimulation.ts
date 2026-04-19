import { useState, useEffect, useCallback } from 'react';
import { useHeatmap } from './useHeatmap';

export interface WaitTimes {
  snacks: number;
  entrance: number;
}

/**
 * useSimulation acts as the core central simulation node.
 * It manages the 'High Traffic' stress lever and tracks WaitTimes independently.
 * @returns {{ isHighTraffic: boolean, toggleHighTraffic: () => void, zoneDensities: ZoneDensities, waitTimes: WaitTimes }}
 */
export const useSimulation = () => {
  const [isHighTraffic, setIsHighTraffic] = useState(false);
  const { zoneDensities } = useHeatmap(isHighTraffic);

  const [waitTimes, setWaitTimes] = useState<WaitTimes>({
    snacks: 5,
    entrance: 2,
  });

  const toggleHighTraffic = useCallback(() => {
    setIsHighTraffic(prev => !prev);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitTimes(prev => {
        const variation = () => Math.floor(Math.random() * 5) - 2; // -2 to +2
        
        let newSnacks = prev.snacks + variation();
        let newEntrance = prev.entrance + variation();

        if (isHighTraffic) {
          newSnacks += 3;
          newEntrance += 2;
        }

        return {
          snacks: Math.max(isHighTraffic ? 15 : 2, Math.min(newSnacks, isHighTraffic ? 45 : 15)),
          entrance: Math.max(isHighTraffic ? 10 : 1, Math.min(newEntrance, isHighTraffic ? 30 : 10)),
        };
      });

    }, 3000); 

    return () => clearInterval(interval);
  }, [isHighTraffic]);

  return {
    isHighTraffic,
    toggleHighTraffic,
    zoneDensities,
    waitTimes
  };
};
