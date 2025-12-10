import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
// For customer routes, prioritize customer token; for admin routes, use admin token
api.interceptors.request.use(
  (config) => {
    try {
      let token = null;
      
      // Check if this is a customer route (save-order, get-order-details)
      const isCustomerRoute = config.url && (
        config.url.includes('/save-order') || 
        config.url.includes('/get-order-details')
      );
      
      if (isCustomerRoute) {
        // For customer routes, prioritize customer token
        const customerInfo = localStorage.getItem('customerInfo');
        if (customerInfo) {
          try {
            const customer = JSON.parse(customerInfo);
            token = customer?.token;
          } catch (e) {
            console.error('Error parsing customerInfo:', e);
          }
        }
      } else {
        // For other routes, check admin first, then customer
        const adminInfo = localStorage.getItem('adminInfo');
        const customerInfo = localStorage.getItem('customerInfo');
        
        let admin = null;
        let customer = null;
        
        if (adminInfo) {
          try {
            admin = JSON.parse(adminInfo);
          } catch (e) {
            console.error('Error parsing adminInfo:', e);
          }
        }
        
        if (customerInfo) {
          try {
            customer = JSON.parse(customerInfo);
          } catch (e) {
            console.error('Error parsing customerInfo:', e);
          }
        }
        
        token = admin?.token || customer?.token;
      }
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error in request interceptor:', error);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

