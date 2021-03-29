import React from 'react';
import { BotSelector } from './BotSelector';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import styles from '../styles.module.scss';
import { useGlobalState } from '../state';
import { botmap } from '../bots';
import { Button } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { ButtonGroup } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';

export const Config: React.FC<{ newGame: () => void; stopstart: () => void }> = ({
  newGame,
  stopstart,
}) => {
  const [whiteBot, setWhiteBot] = useGlobalState('white');
  const [blackBot, setBlackBot] = useGlobalState('black');
  const [showConfig, setShowConfig] = useGlobalState('showConfig');

  const choices = 'User,Per,Ronny'.split(',');
  choices.push(...Array.from(botmap.keys()));

  const playAction = () => {
    setShowConfig(false);
    stopstart();
  };
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={showConfig}
      onClose={() => setShowConfig(false)}
      className={styles.Dialog}>
      <DialogTitle id="simple-dialog-title">Configure game</DialogTitle>
      <BotSelector
        playerName="White"
        availableBots={choices}
        selectedBot={whiteBot}
        setSelectedBot={setWhiteBot}
      />
      <BotSelector
        playerName="Black"
        availableBots={choices}
        selectedBot={blackBot}
        setSelectedBot={setBlackBot}
      />
      <span className={styles.Buttons}>
        <Button className={styles.Button} onClick={playAction} aria-label="list" value="Play">
          Play
          <PlayArrow />
        </Button>
        <Button className={styles.Button} onClick={newGame} aria-label="list" value="Reset">
          Reset
          <Clear />
        </Button>
      </span>
    </Dialog>
  );
};
