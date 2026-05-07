import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const loginAdmin = (data) =>
  axios.post(`${BASE_URL}/admin/login`, data);

export const getShops = () =>
  axios.get(`${BASE_URL}/shops`);

export const addShop = (data) =>
  axios.post(`${BASE_URL}/shops`, data);

export const approveShop = (id) =>
  axios.put(`${BASE_URL}/shops/approve/${id}`);

export const rejectShop = (id) =>
  axios.put(`${BASE_URL}/shops/reject/${id}`);

export const getEmployees = () =>
  axios.get(`${BASE_URL}/employees`);

export const addEmployee = (data) =>
  axios.post(`${BASE_URL}/employees`, data);

export const deleteEmployee = (id) =>
  axios.delete(`${BASE_URL}/employees/${id}`);

export const getGuestBook = () =>
  axios.get(`${BASE_URL}/guestbook`);

export const addGuest = (data) =>
  axios.post(`${BASE_URL}/guestbook`, data);

export const getNotifications = () =>
  axios.get(`${BASE_URL}/notifications`);

export const sendNotification = (data) =>
  axios.post(`${BASE_URL}/notifications`, data);

export const deleteNotification = (id) =>
  axios.delete(`${BASE_URL}/notifications/${id}`);