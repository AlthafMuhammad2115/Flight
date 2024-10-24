// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users'; // Your API base URL

export const registerUser = (data) => axios.post(`${API_URL}/signup`, data);
export const loginUser = (data) => axios.post(`${API_URL}/login`, data);
export const listFlights = () => axios.get(`${API_URL}/list-flights`);
