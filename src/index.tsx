import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import bots from './bots';
import './new-1.1.3.css';

ReactDOM.render(
  <React.StrictMode>
    <App
      bots={bots}
      onGameCompleted={winner => {
        global.alert(
          `${winner === 'b' ? 'Black' : winner === 'w' ? 'White' : 'No one'} is the winner!`
        );
      }}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
