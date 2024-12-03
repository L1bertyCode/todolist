import { createRoot } from 'react-dom/client';

import "./src/app/styles/index.css";
import { App } from '@/app/App/App';
import { Provider } from 'react-redux';
import { store } from '@/app/providers/reduxProvider/store';
import { AppHttpRequests } from '@/app/api/AppHttpRequests';


const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<Provider store={store}>
  {/* <App /> */}
  <AppHttpRequests />
</Provider>);