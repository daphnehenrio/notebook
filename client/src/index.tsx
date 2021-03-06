// ? Import npm
import * as React from 'react';
import { render } from 'react-dom';

// ? Import local
// | Composants
import App from './components/App';
import reportWebVitals from './reportWebVitals';

// ? Render
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
