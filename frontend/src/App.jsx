import { Routes, Route } from 'react-router-dom';
import ShopPage from './pages/Shop/ShopPage';
import { routesConfig } from './config/routesConfig.js';
import ContactPage from './pages/Contact/ContactPage.jsx';
import AuthorizationPage from './pages/Authorization/AuthorizationPage.jsx';

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Navigations from './components/Navigation/Navigations.jsx';
function App() {
    return (
        <>
        <Navigations/>
            <Routes>
                <Route path={routesConfig.SHOP.url} element={<ShopPage/>} />
                <Route path={routesConfig.CONTACT.url} element={<ContactPage/>} />
                <Route path={routesConfig.AUTHORIZATION.url} element={<AuthorizationPage/>}/>
            </Routes>
            
        </>
    );
}

export default App;
