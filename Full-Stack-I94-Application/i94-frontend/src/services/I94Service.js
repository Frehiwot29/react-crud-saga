import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/i94';

// For testing without DB, return mock data
const USE_MOCK = true; // Set to false to use real API

export const createI94 = (data) => {
  if (USE_MOCK) {
    return Promise.resolve({ data: { id: 1, ...data } });
  }
  return axios.post(BASE_URL, data);
};

export const getLastI94 = () => {
  if (USE_MOCK) {
    return Promise.resolve({
      data: {
        id: 1,
        street: '123 Mock St',
        city: 'Mock City',
        state: 'Mock State',
        zip: '12345'
      }
    });
  }
  return axios.get(`${BASE_URL}/last`);
};