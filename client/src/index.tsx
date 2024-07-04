import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './store';

import browserHistory from './browser-history';
import HistoryRouter from './components/header/history-route/history-route';
import ScrollToTop from './components/tools/scroll-to-top/scroll-to-top';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './components/app/app';
import { checkAuthAction } from './store/actions/api-user-action';

// Проверяем авторизацию пользователя
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ToastContainer />

    <Provider store={store}>
      <HistoryRouter history={ browserHistory }>
        <ScrollToTop />

        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
