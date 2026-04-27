import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/i94';

export const createI94 = (data) => {
  return axios.post(BASE_URL, data);
};

export const getLastI94 = () => {
  return axios.get(`${BASE_URL}/last`);
};