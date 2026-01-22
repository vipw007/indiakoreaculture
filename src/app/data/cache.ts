import { StateData } from './statesData';

const cache: { [key: string]: StateData[] } = {};

export const getCache = (key: string): StateData[] | null => {
  return cache[key];
};

export const setCache = (key: string, data: StateData[]) => {
  cache[key] = data;
};
