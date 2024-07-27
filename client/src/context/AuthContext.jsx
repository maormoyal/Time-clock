import { createContext, useContext, useState, useEffect } from 'react';
import useApi from '../hooks/useApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { get, post, error } = useApi();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await get('/users/me');
          setUser(response);
        } catch (error) {
          console.error('Failed to fetch user', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [get]);

  const login = async (email, password) => {
    try {
      const response = await post('/users/login', { email, password });
      if (response.token) {
        localStorage.setItem('token', response.token);
        const userResponse = await get('/users/me');
        setUser(userResponse);
      } else {
        throw new Error('Token is missing in the response');
      }
    } catch (error) {
      console.error('Failed to login', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
