import React, { useState, useEffect, useRef, useCallback } from 'react';
import Chessboard from 'chessboardjsx';
import * as engine from './engine';
import type { AvailableBots, InitialisedBot } from './bots';
import styles from './styles.module.scss';
import { BotSelector, SelectedBot } from './BotSelector';
import { Button, ButtonGroup } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import { PlayArrow, Pause, Clear, Settings, Timeline } from '@material-ui/icons';

type BoardMove = {
  sourceSquare: engine.Square;
  targetSquare: engine.Square;
};

const History: React.FC<{ history: Array<engine.Move> }> = ({ history }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [history]);

  return (
    <pre className={styles.History}>
      {history.map(({ color, piece, from, san }) => `${color}${piece}${from} ${san}`).join('\n')}
      <div ref={endRef} />
    </pre>
  );
};

const App: React.FC<{
  bots: AvailableBots;
  onGameCompleted: (winner: engine.GameWinner) => void;
}> = ({ bots, onGameCompleted }) => {
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [fen, setFen] = useState<engine.Fen>(engine.newGame);
  const [history, setHistory] = useState<Array<engine.Move>>([]);
  const [whiteBot, setWhiteBot] = useState<SelectedBot>(null);
  const [blackBot, setBlackBot] = useState<SelectedBot>(null);

  const newGame = () => {
    setPlaying(false);
    setFen(engine.newGame);
    setHistory([]);
  };

  const doMove = useCallback(
    (fen: engine.Fen, from: engine.Square, to: engine.Square) => {
      const move = engine.move(fen, from, to);

      if (!move) {
        return;
      }

      const [newFen, action] = move;

      if (engine.isGameOver(newFen)) {
        onGameCompleted(engine.getGameWinner(newFen));
        newGame();
        return;
      }

      setFen(newFen);
      setHistory(history => [...history, action]);
    },
    [onGameCompleted]
  );

  const onDragStart = ({ sourceSquare: from }: Pick<BoardMove, 'sourceSquare'>) => {
    const isWhiteBotTurn = whiteBot && engine.isWhiteTurn(fen);
    const isBlackBotTurn = blackBot && engine.isBlackTurn(fen);

    return isPlaying && engine.isMoveable(fen, from) && !(isWhiteBotTurn || isBlackBotTurn);
  };

  const onMovePiece = ({ sourceSquare: from, targetSquare: to }: BoardMove) => {
    doMove(fen, from, to);
  };

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    let isBotMovePlayable = true;

    if (whiteBot && engine.isWhiteTurn(fen)) {
      whiteBot.move(fen).then(({ from, to }: engine.ShortMove) => {
        if (isBotMovePlayable) doMove(fen, from, to);
      });
    }

    if (blackBot && engine.isBlackTurn(fen)) {
      blackBot.move(fen).then(({ from, to }: engine.ShortMove) => {
        if (isBotMovePlayable) doMove(fen, from, to);
      });
    }

    return () => {
      isBotMovePlayable = false;
    };
  }, [isPlaying, fen, whiteBot, blackBot, doMove]);

  return (
    <div className={styles.App}>
      <header>
        <h1>♛ Chessbot</h1>
      </header>
      <div className={styles.TopNav}>
        <BotSelector
          playerName="White"
          availableBots={bots}
          selectedBot={whiteBot}
          setSelectedBot={setWhiteBot}
          disabled={isPlaying}
        />
        <BotSelector
          playerName="Black"
          availableBots={bots}
          selectedBot={blackBot}
          setSelectedBot={setBlackBot}
          disabled={isPlaying}
        />
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <ToggleButton
            className={styles.Button}
            aria-label="list"
            value="showConfig"
            selected={showConfig}
            onChange={() => setShowConfig(!showConfig)}>
            <Settings />
          </ToggleButton>
          <ToggleButton
            className={styles.Button}
            aria-label="list"
            value="showStats"
            selected={showStats}
            onChange={() => setShowStats(!showStats)}>
            <Timeline />
          </ToggleButton>
          <ToggleButton
            className={styles.Button}
            aria-label="list"
            value="play"
            selected={isPlaying}
            onChange={() => setPlaying(!isPlaying)}>
            {isPlaying ? <PlayArrow /> : <Pause />}
          </ToggleButton>
          <Button className={styles.Button} onClick={newGame} aria-label="list">
            <Clear />
          </Button>
        </ButtonGroup>
      </div>
      <div className={styles.Chessboard}>
        <Chessboard position={fen} allowDrag={onDragStart} onDrop={onMovePiece} />
      </div>
      <History history={history} />
    </div>
  );
};

export default App;
