import { lazy } from 'react';
import { RequireAuth } from 'react-auth-kit';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import CompaniesList from '../views/companies/CompaniesList';
import CompaniesForm from '../views/companies/CompaniesForm';
import { Navigate } from 'react-router';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/admin',

    element: (
        <RequireAuth loginPath="/support-portal/login">
            {' '}
            <MainLayout />
        </RequireAuth>
    ),
    children: [
        { element: <Navigate to="/admin/dashboard" />, index: true },
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'companies',
            children: [
                {
                    path: 'new',
                    element: <CompaniesForm />
                },
                {
                    path: ':id',
                    element: <CompaniesForm />
                },
                {
                    path: 'list',
                    element: <CompaniesList />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        }
    ]
};

export default MainRoutes;
