import React, { useEffect, useCallback } from 'react';
import Chessboard from 'chessboardjsx';
import * as engine from './engine';
import styles from './styles.module.scss';
import { History } from './components/History';
import { Panel } from './components/Panel';
import { Config } from './components/Config';
import { useGlobalState } from './state';
import { setTimeFunc } from './actions';
import { botmap, runBot } from './bots';

type BoardMove = {
  sourceSquare: engine.Square;
  targetSquare: engine.Square;
};

const toHHMMSS = (sec_num: number) => {
  const h = Math.floor(sec_num / 3600);
  const m = Math.floor((sec_num - h * 3600) / 60);
  const s = sec_num - h * 3600 - m * 60;
  return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
};

const App: React.FC = () => {
  const [isPlaying, setPlaying] = useGlobalState('playing');
  const [fen, setFen] = useGlobalState('fen');
  const [history, setHistory] = useGlobalState('history');
  const [markHistory, setMarkHistory] = useGlobalState('markHistory');
  const [white, setWhite] = useGlobalState('white');
  const [black, setBlack] = useGlobalState('black');
  const [rotation, setRotation] = useGlobalState('rotation');
  const [wtime, setWtime] = useGlobalState('wtime');
  const [btime, setBtime] = useGlobalState('btime');

  const doMove = useCallback(
    (fen: engine.Fen, from: engine.Square, to: engine.Square) => {
      const move = engine.move(fen, from, to);
      if (!move) {
        return;
      }
      if (isPlaying) {
        const [newFen, action] = move;
        setFen(newFen);
        setHistory(history => [...history, action.san]);
      }
    },
    [isPlaying]
  );

  const newGame = () => {
    setHistory([]);
    setWtime(0);
    setBtime(0);
    setMarkHistory(-1);
    setFen(engine.newGame);
  };

  const stopstart = () => {
    if (isComplete) newGame();
    if (!isPlaying) setMarkHistory(-1);
    setPlaying(!isPlaying);
  };

  const isComplete = engine.isGameOver(fen);
  const isWhiteTurn = engine.isWhiteTurn(fen);
  const next = isWhiteTurn ? white : black;
  const bot = botmap.get(next);

  if (isPlaying && isComplete) setPlaying(false);

  const gotoMark = (mark: number) => {
    if (isPlaying) stopstart();
    setFen(engine.replay(history, mark >= 0 ? mark : history.length));
  };

  setTimeFunc(() => {
    if (isPlaying) {
      if (isWhiteTurn) {
        setWtime(wtime + 1);
      } else {
        setBtime(btime + 1);
      }
    }
  });

  const onDragStart = ({ sourceSquare: from }: Pick<BoardMove, 'sourceSquare'>) => {
    return isPlaying && engine.isMoveable(fen, from) && !bot;
  };

  const onMovePiece = ({ sourceSquare: from, targetSquare: to }: BoardMove) => {
    doMove(fen, from, to);
  };

  const r90 = rotation % 2 == 1;
  const r180 = rotation > 1;
  const wtext =
    'White: ' +
    white +
    ' ' +
    toHHMMSS(wtime) +
    ' ' +
    (isComplete && !isWhiteTurn ? ' ** Winner **' : '');
  const btext =
    'Black: ' +
    black +
    ' ' +
    toHHMMSS(btime) +
    ' ' +
    (isComplete && isWhiteTurn ? ' ** Winner **' : '');

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    runBot(next, fen, ({ from, to }) => {
      doMove(fen, from, to);
    });

    return () => {
      //
    };
  }, [isPlaying, fen, white, black, doMove]);

  return (
    <div className={styles.App}>
      <Config newGame={newGame} stopstart={stopstart} />
      <table className={styles.MainTable}>
        <tr>
          <td>
            <p className={r90 ? styles.AlignRight : ''}>{r180 ? wtext : btext}</p>
            <div className={r90 ? styles.Rotate : ''}>
              <Chessboard
                position={fen}
                allowDrag={onDragStart}
                onDrop={onMovePiece}
                orientation={!r180 ? 'white' : 'black'}
              />
            </div>
            <p>{r180 ? btext : wtext}</p>
          </td>
          <td className={styles.PanelTd}>
            <Panel stopstart={stopstart} />
            <History gotoMark={gotoMark} />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default App;
