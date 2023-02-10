import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication/Login')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/support-portal/login',
            element: <AuthLogin />
        },
        {
            path: '/pages/register/register3',
            element: <AuthRegister3 />
        }
    ]
};
export default AuthenticationRoutes;
