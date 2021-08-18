// eslint-disable-next-line no-use-before-define
import React from 'react';
import dotenv from 'dotenv';
import ReactDOM from 'react-dom';
import App from './App';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
