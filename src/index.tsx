import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app/App';
import store from './redux/store/store'; // Import the store

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
