import { useEffect } from 'react';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export default function useAuth({ deps, setAdmin }) {
    const navigate = useNavigate();
    const auth = useAuthUser();
    const isAuthenticated = useIsAuthenticated();
    useEffect(() => {
        console.log('user auth run');
        console.log(isAuthenticated());
        if (!isAuthenticated()) {
            console.log('user auth not log');
            navigate('/support/login');
        } else {
            const userData = auth();
            console.log('user auth user data');
            console.group(userData);
            if (userData.role === 'client') {
                console.log('user auth not admin');
                setAdmin(false);
                navigate('/');
            } else {
                setAdmin(true);
            }
        }
    }, [deps]);
}
