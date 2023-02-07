import { lazy } from 'react';
// project imports
import Loadable from 'ui-component/Loadable';
// landing page routing
const LandingPage = Loadable(lazy(() => import('views/pages/landing-page/LandingPage')));

// ==============================|| LANDING PAGE ROUTING ||============================== //

const LandingRoutes = {
    path: '/',
    element: <LandingPage />
};
export default LandingRoutes;
