import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './App/store/store';
import App from './App/App';
import { AppHttpRequests } from './App/AppHttpRequests';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <AppHttpRequests />
    </Provider>
  </React.StrictMode>
);
