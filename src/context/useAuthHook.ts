import { useEffect, useState } from 'react';

// Types
import { UserAuthResponseType } from 'common/types/user.type';

export const useAuthHook = () => {
  const [auth, setAuth] = useState<UserAuthResponseType>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const handleAuth = () => {
    setLoadingAuth(true);
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    if (auth?.token) {
      setAuth(auth);
      setIsAuthenticated(true);
    }
    setLoadingAuth(false);
  };

  const handleLogin = (auth: UserAuthResponseType) => {
    localStorage.setItem('auth', JSON.stringify(auth));
    setIsAuthenticated(true);
    handleAuth();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
  };

  useEffect(() => {
    handleAuth();
  }, []);

  return {
    isAuthenticated,
    handleLogin,
    handleLogout,
    loadingAuth,
    auth,
  };
};
