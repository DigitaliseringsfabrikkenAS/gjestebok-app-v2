/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */

import { createContext } from 'react';
import { UserAuthResponseType } from 'common/types/user.type';

export interface AuthContextProps {
  handleLogin: (data: UserAuthResponseType) => void;
  handleLogout: () => void;
  loadingAuth: boolean;
  auth: UserAuthResponseType | undefined;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  handleLogin: (_data: UserAuthResponseType) => {},
  handleLogout: () => {},
  isAuthenticated: false,
  loadingAuth: true,
  auth: { message: '', token: '' },
});
