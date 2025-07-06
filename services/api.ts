import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://192.168.1.68:5000',
  baseURL: 'https://8f12c162-f727-41c0-8d70-176b2e032713-00-13gxrobstu2eo.spock.replit.dev',
});

export default api;