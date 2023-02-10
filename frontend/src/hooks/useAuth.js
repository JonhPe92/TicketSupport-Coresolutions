import { useEffect } from 'react';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export default function useAuth({ setAdmin }) {
    const navigate = useNavigate();
    const auth = useAuthUser();
    const isAuthenticated = useIsAuthenticated();
    useEffect(() => {
        console.log('user auth run');
        console.log(isAuthenticated());
        if (!isAuthenticated()) {
            console.log('user auth not log');
            navigate('/support-portal/login');
        } else {
            const userData = auth();
            console.log('user auth user data');
            console.group(userData);
            switch (userData.role) {
                case 'admin':
                    setAdmin(true);
                    break;
                case 'client':
                    setAdmin(false);
                    navigate('/support-portal/home');
                    break;
                default:
                    setAdmin(false);
                    navigate('/');
                    break;
            }
        }
    }, [isAuthenticated]);
}
