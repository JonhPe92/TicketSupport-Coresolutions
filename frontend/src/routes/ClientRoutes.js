import { lazy } from 'react';
import { RequireAuth } from 'react-auth-kit';
import { Navigate } from 'react-router';
// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

const Home = Loadable(lazy(() => import('views/support-portal/Home')));

const ClientRoutes = {
    path: '/support-portal',

    element: (
        <RequireAuth loginPath="/support-portal/login">
            {' '}
            <MinimalLayout />
        </RequireAuth>
    ),
    children: [
        { element: <Navigate to="/support-portal/home" />, index: true },
        {
            path: 'home',
            element: <Home />
        }
    ]
};

export default ClientRoutes;
