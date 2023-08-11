// useAuth.js
import { useSelector } from 'react-redux';

const useAuth = () => {
    // eslint-disable-next-line
    const { user, accessToken, refreshToken } = useSelector((state) => state.auth);
    const { companyData } = useSelector((state) => state.companyData);
    const isAuthenticated = !!accessToken;
    const username = user ? user.username : null;
    const userRole = user ? user.role : null;

    return {
        username,
        isAuthenticated,
        userRole,
        companyData,
    };
};

export default useAuth;