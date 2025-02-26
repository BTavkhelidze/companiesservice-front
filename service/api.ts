import axios from 'axios';

export const fetchCurrentCompany = async () => {
  const response = await axios.get('/api/current-company', {
    withCredentials: true,
  });
  console.log(response.data, 'dsawdsssss');
  return response.data;
};
