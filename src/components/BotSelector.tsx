import React, { ChangeEvent } from 'react';
import styles from '../styles.module.scss';

export const BotSelector: React.FC<{
  playerName: string;
  availableBots: string[];
  selectedBot: string;
  setSelectedBot: (bot: string) => void;
}> = ({ playerName, availableBots, selectedBot, setSelectedBot }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const name = e.target.value;
    setSelectedBot(name);
  };

  return (
    <div className={styles.BotSelector}>
      <label>{playerName}</label>
      <select value={selectedBot} onChange={handleChange}>
        {availableBots.map(name => (
          <option key={name}>{name}</option>
        ))}
      </select>
    </div>
  );
};
