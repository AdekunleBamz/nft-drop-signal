import { Signal, FilterOptions } from '../types';

export const filterSignals = (signals: Signal[], options: FilterOptions): Signal[] => {
  return signals.filter(signal => {
    if (options.blockchain && options.blockchain.length > 0) {
      if (!options.blockchain.includes(signal.drop.blockchain)) return false;
    }
    if (options.sentiment && options.sentiment.length > 0) {
      if (!options.sentiment.includes(signal.sentiment)) return false;
    }
    if (options.minFloorPrice !== undefined) {
      if (parseFloat(signal.drop.floor_price) < options.minFloorPrice) return false;
    }
    if (options.maxFloorPrice !== undefined) {
      if (parseFloat(signal.drop.floor_price) > options.maxFloorPrice) return false;
    }
    return true;
  });
};
