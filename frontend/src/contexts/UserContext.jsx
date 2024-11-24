import { createContext, useContext, useState } from 'react';

/**
 * @typedef {Object} TokenInfo
 * @property {string} token
 * @property {string} tokenType
 */

/** @type {import('react').Context<{token: string|null, setToken: (info: TokenInfo) => void, logOut: () => void}>} */
export const UserContext = createContext();

/**
 * @param {{children: import('react').ReactNode}} props
 */
export function UserProvider({children}) {
  /** @type {[string|null, (token: string|null) => void]} */
  const [token, setUserToken] = useState(() => {
    const savedToken = localStorage.getItem('auth_token');
    return savedToken || null;
  });

  /** @param {TokenInfo} info */
  const setToken = ({token, tokenType}) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_token_type', tokenType);
    setUserToken(token);
  }

  const logOut = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token_type');
    setUserToken(null);
  }

  return (
    <UserContext.Provider value={{ token, setToken, logOut }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {

  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
}