import { createRoot } from 'react-dom/client';

import "./src/app/styles/index.css";
import { App } from '@/app/App/AppWithRedux';


const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<div className='root'>
  <App />
</div>);