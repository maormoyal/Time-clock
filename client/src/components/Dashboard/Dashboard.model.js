import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const fetchEntries = async () => {
  const response = await axios.get(`${API_URL}/time-entries`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

export const addEntry = async (type, note) => {
  const response = await axios.post(
    `${API_URL}/time-entries`,
    { type, note },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  return response.data;
};

export const exportCSV = async () => {
  const response = await axios.get(`${API_URL}/export/csv`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    responseType: 'blob',
  });
  return response.data;
};
