import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './app/store';

import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>,
);
