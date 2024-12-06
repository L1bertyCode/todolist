import axios from "axios";

const API_KEY = '';
const TOKEN = '';

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    Authorization: `${TOKEN}`,
    'API-KEY': `${API_KEY}`,
  },
});
