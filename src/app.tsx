import { createRoot } from 'react-dom/client';
import AppComponent from './AppComponent';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AppComponent />)