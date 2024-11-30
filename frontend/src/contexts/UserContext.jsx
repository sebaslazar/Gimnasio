// @ts-check
import React, { createContext, useContext, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

/** TYPES
 * @typedef {Object} TokenInfo
 * @property {string} token
 * @property {string} tokenType
 */

/**
 * @typedef {Object} JWTUserPayload
 * @property {string} ID
 * @property {string} Rango
 * @property {number} exp
 */

/**
 * @typedef {Object} UserStateData
 * @property {string} token
 * @property {string} tokenType
 * @property {string} ID
 * @property {string} rango
 * @property {number} exp
*/

/**
 * @typedef {Object} UserAuthData
 * @property {string} ID
 * @property {string} rango
 * @property {number} exp
 */

/**
 * @typedef {Object} ActiveContextUserData
 * @property {true} isLogged
 * @property {string} token
 * @property {string} tokenType
 * @property {UserAuthData} auth
 * @property {(info: TokenInfo) => void} setToken
 * @property {() => void} logOut
**/

/**
 * @typedef {Object} InactiveContextUserData
 * @property {false} isLogged
 * @property {undefined} token
 * @property {undefined} tokenType
 * @property {undefined} auth
 * @property {(info: TokenInfo) => void} setToken
 * @property {() => void} logOut
**/

const LOCAL_STORAGE_TOKEN_KEY = 'auth_token';
const LOCAL_STORAGE_TOKEN_TYPE_KEY = 'auth_token_type';

/**
 * 
 * @param {string} token
 * @param {string} type
 * @returns {UserStateData | null} 
 */
function extractUserData(token, type='Bearer') {
  try {
    /**
     * @type {JWTUserPayload}
     */
    const decoded = jwtDecode(token);

    return {
      token,
      tokenType: type,
      ID: decoded.ID,
      rango: decoded.Rango,
      exp: decoded.exp,
    }
  } catch (error) {
    return null;
  }
}

/**
 * 
 * @param {number} exp 
 * @returns {boolean}
 */
function isTokenExpired(exp) {
  return Date.now() >= exp * 1000;
}

function loadUserData() {
  const savedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const savedTokenType = localStorage.getItem(LOCAL_STORAGE_TOKEN_TYPE_KEY) ?? undefined;
  
  if (savedToken) {
    const data = extractUserData(savedToken, savedTokenType);
    if (data && !isTokenExpired(data.exp)) {
      return data;
    } else {
      console.warn('Token expirado o inválido');
      toast.error('Tu sesión ha expirado, por favor inicia sesión de nuevo');

      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_TYPE_KEY);
    }
  }

  return null;
}

/** @type {import('react').Context<ActiveContextUserData|InactiveContextUserData>} */
// @ts-ignore
export const UserContext = createContext({
  isLogged: false,
  setToken: (_) => {},
  logOut: () => {}
});

/**
 * @param {{children: import('react').ReactNode}} props
 */
export function UserProvider({children}) {
  /** @type {[UserStateData|null, (token: UserStateData|null) => void]} */
  const [data, setUserToken] = useState(loadUserData);

  /** @param {TokenInfo} info */
  const setToken = ({token, tokenType}) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    localStorage.setItem(LOCAL_STORAGE_TOKEN_TYPE_KEY, tokenType);
    
    setUserToken(extractUserData(token));
  }

  const logOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_TYPE_KEY);
    setUserToken(null);
  }

  /**
   * @type {ActiveContextUserData|InactiveContextUserData}
   */
  const contextValue = useMemo(() => {
    if (data) {
      return {
        isLogged: true,
        token: data.token,
        tokenType: data.tokenType,
        auth: {
          ID: data.ID,
          rango: data.rango,
          exp: data.exp
        },
        setToken,
        logOut
      }
    }

    return {
      isLogged: false,
      setToken,
      logOut
    }
  }, [data]);

  return (
    <UserContext.Provider value={contextValue}>
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