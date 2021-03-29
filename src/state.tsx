import { createGlobalState } from 'react-hooks-global-state';
import * as engine from './engine';

type Initial = {
  // game
  white: string;
  black: string;
  wtime: number;
  btime: number;
  fen: string;
  history: string[];
  moves: string[];
  playing: boolean;
  // account: {
  email: string;
  // config: {
  rotation: number;
  markHistory: number;
  showConfig: boolean;
  showHints: boolean;
  showFacts: boolean;
  showStats: boolean;
};

const initial: Initial = {
  // game
  white: 'User',
  black: 'User',
  wtime: 0,
  btime: 0,
  fen: engine.newGame,
  history: [],
  moves: [],
  playing: false,
  // account: {
  email: '',
  // config: {
  rotation: 0,
  markHistory: -1,
  showConfig: false,
  showHints: false,
  showFacts: true,
  showStats: false,
};
export const { useGlobalState } = createGlobalState(initial);
