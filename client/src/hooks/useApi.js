import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;
console.log('API_BASE:', API_BASE);

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkResponse = (response) => {
    if (response.headers['content-type'].includes('application/json')) {
      return response.data;
    }
    return response.statusText;
  };

  const get = useCallback(async (path) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE}${path}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      return checkResponse(response);
    } catch (err) {
      setLoading(false);
      console.error('Fetch failed', err);
      setError(err.response?.data ?? 'Fetch failed');
      throw err;
    }
  }, []);

  const post = useCallback(async (path, payload) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE}${path}`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      return checkResponse(response);
    } catch (err) {
      setLoading(false);
      console.error('Post failed', err);
      setError(err.response?.data ?? 'Post failed');
      throw err;
    }
  }, []);

  return { get, post, loading, error };
};

export default useApi;
