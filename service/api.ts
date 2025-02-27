import axios from 'axios';

export const fetchCurrentCompany = async () => {
  const response = await axios.get('/api/current-company', {
    withCredentials: true,
  });

  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await axios.get('/api/current-user', {
    withCredentials: true,
  });

  return response.data;
};
