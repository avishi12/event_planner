// API Configuration - Dynamically determines backend URL based on environment

const getApiUrl = () => {
  // If running on localhost, use localhost backend
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:4000';
  }
  
  // If running on AWS or any other host, use the same host with port 4000
  return `http://${window.location.hostname}:4000`;
};

export const API_URL = getApiUrl();
