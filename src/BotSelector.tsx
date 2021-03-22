import React, { ChangeEvent } from 'react';
import type { AvailableBots, InitialisedBot } from './bots';
import styles from './styles.module.scss';

export type SelectedBot = {
  name: string;
  move: InitialisedBot;
} | null;

export const BotSelector: React.FC<{
  playerName: string;
  availableBots: AvailableBots;
  selectedBot: SelectedBot;
  setSelectedBot: (bot: SelectedBot) => void;
  disabled: boolean;
}> = ({ playerName, availableBots, selectedBot, setSelectedBot, disabled }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const name = e.target.value;
    setSelectedBot(name ? { name, move: availableBots[name]() } : null);
  };

  return (
    <div className={styles.BotSelector}>
      <label>{playerName}</label>
      <select value={selectedBot?.name} onChange={handleChange} disabled={disabled}>
        <option value="" key="User">
          User
        </option>
        {Object.keys(availableBots).map(name => (
          <option key={name}>{name}</option>
        ))}
      </select>
    </div>
  );
};
