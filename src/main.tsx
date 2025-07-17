import ReactDOM from 'react-dom/client';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Store from './stores';

ReactDOM.createRoot(document.getElementById('root')!).render(<App store={Store} />);

registerServiceWorker();
