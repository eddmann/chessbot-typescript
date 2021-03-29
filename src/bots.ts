import Chess from 'chess.js';
import type { Fen, ShortMove } from './engine';

export type UninitialisedBot = () => InitialisedBot;
export type InitialisedBot = (fen: Fen) => Promise<ShortMove>;
export type Resolver = (move: ShortMove) => void;

const randomMove: UninitialisedBot = () => fen =>
  new Promise(resolve => {
    const moves = Chess(fen).moves({ verbose: true });
    const { from, to } = moves[Math.floor(Math.random() * moves.length)];
    setTimeout(() => resolve({ from, to }), 500);
  });

const uciWorker = (file: string, actions: Array<string>): UninitialisedBot => () => {
  const worker = new Worker(file);
  let resolver: Resolver | null = null;

  worker.addEventListener('message', e => {
    const move = e.data.match(/^bestmove\s([a-h][1-8])([a-h][1-8])/);
    if (move && resolver) {
      resolver({ from: move[1], to: move[2] });
      resolver = null;
    }
  });

  return fen =>
    new Promise((resolve, reject) => {
      if (resolver) {
        reject('Pending move is present');
        return;
      }

      resolver = resolve;
      worker.postMessage(`position fen ${fen}`);
      actions.forEach(action => worker.postMessage(action));
    });
};

const running: Set<string> = new Set();
const initialized: Map<string, InitialisedBot> = new Map();

export const runBot = (next: string, fen: string, resolver: Resolver) => {
  const bot = botmap.get(next);
  if (bot && !running.has(next)) {
    running.add(next);
    if (!initialized.has(next)) {
      initialized.set(next, (bot as UninitialisedBot)());
    }
    const runner = initialized.get(next);
    if (runner) {
      runner(fen).then(move => {
        resolver(move);
        running.delete(next);
      });
    }
  }
};

const Bots: Record<string, UninitialisedBot> = {
  Random: randomMove,
  'nmrugg/stockfish (l:1,d:10)': uciWorker('bots/stockfish.js-10.0.2/stockfish.js', [
    'setoption name Skill Level value 1',
    'go depth 10',
  ]),
  'nmrugg/stockfish (l:20,d:10)': uciWorker('bots/stockfish.js-10.0.2/stockfish.js', [
    'setoption name Skill Level value 20',
    'go depth 10',
  ]),
  'nmrugg/stockfish (l:20,t:1s)': uciWorker('bots/stockfish.js-10.0.2/stockfish.js', [
    'setoption name Skill Level value 20',
    'go movetime 1000',
  ]),
  'op12no2/lozza (l:1,d:10)': uciWorker('bots/lozza-1.18/lozza.js', [
    'setoption name Skill Level value 1',
    'go depth 10',
  ]),
  'op12no2/lozza (l:20,d:10)': uciWorker('bots/lozza-1.18/lozza.js', [
    'setoption name Skill Level value 20',
    'go depth 10',
  ]),
  'op12no2/lozza (l:20,t:1s)': uciWorker('bots/lozza-1.18/lozza.js', [
    'setoption name Skill Level value 20',
    'go movetime 1000',
  ]),
};

export const botmap: Map<string, UninitialisedBot> = new Map(Object.entries(Bots));

export default botmap;
