import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';


if (import.meta.env.MODE === 'production') {
    disableReactDevTools();
  }

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
     </StrictMode>
);
