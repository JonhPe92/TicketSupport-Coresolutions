import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import LandingRoutes from './LandingRoutes';
import ClientRoutes from './ClientRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([LandingRoutes, MainRoutes, ClientRoutes, AuthenticationRoutes]);
}
