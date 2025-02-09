import { Routes, Route, useLocation } from 'react-router-dom';
import ShopPage from './pages/Shop/ShopPage';
import { routesConfig } from './config/routesConfig.js';
import ContactPage from './pages/Contact/ContactPage.jsx';
import AuthorizationPage from './pages/Authorization/AuthorizationPage.jsx';
import DashboardPage from './pages/Dashboard/DashboardPage.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Navigations from './components/Navigation/Navigations.jsx';
import './config/axiosConfig.js';
import LoaderComponent from './components/Loader/LoaderComponent.jsx';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { localStorageConfig } from './config/localStorageConfig.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from './store/user/userSlice.js';
import AdminProtect from './adminComponents/adminProtect/AdminProtect.jsx';
import { isDashboardAction } from './store/dashboard/dashboardSlice.js';
import AddProduct from './adminComponents/AddProduct/AddProduct.jsx';
import Statistic from './adminComponents/Statistic/Statistic.jsx';
import Users from './adminComponents/Users/Users.jsx';
import Comments from './adminComponents/Comments/Comments.jsx';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isDashboard } = useSelector((state) => state.dashboardStore);
    useEffect(() => {
        const userString = localStorage.getItem(localStorageConfig.USER);
        if (userString) dispatch(setUserAction(JSON.parse(userString)));
    }, [dispatch]);

    useEffect(() => {
        console.log(location, 'locatioon');
        if (location.pathname.startsWith('/dashboard')) dispatch(isDashboardAction(true));
        else dispatch(isDashboardAction(false));
    }, [location, dispatch]);

    return (
        <>
            <LoaderComponent />
            {!isDashboard && <Navigations />}

            <Routes>
                <Route path={routesConfig.SHOP.url} element={<ShopPage />} />
                <Route path={routesConfig.CONTACT.url} element={<ContactPage />} />
                <Route path={routesConfig.AUTHORIZATION.url} element={<AuthorizationPage />} />
                <Route
                    path={routesConfig.DASHBOARD.url}
                    element={
                        <AdminProtect>
                            <DashboardPage />
                        </AdminProtect>
                    }
                >
                    <Route index element={<Statistic/>}/>
                    <Route path={routesConfig.DASHBOARD_ADD_PRODUCT.url} element={<AddProduct/>}/>
                    <Route path={routesConfig.DASHBOARD_USERS.url} element={<Users/>}/>
                    <Route path={routesConfig.DASHBOARD_COMMENTS.url} element={<Comments/>}/>
                </Route>
            </Routes>
        
            <ToastContainer />
        </>
    );
}

export default App;
