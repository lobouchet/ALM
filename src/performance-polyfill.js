// First Input Delay Polyfill
import 'https://unpkg.com/first-input-delay@0.1.3/dist/first-input-delay.min.js';

// Initialize Performance Monitoring
import { perf } from './firebase-config';
import { trace } from 'firebase/performance';

// Enable automatic performance monitoring
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    console.log('Performance Monitoring initialized');
    
    // Monitor page load time
    const pageLoadTrace = trace(perf, 'page_load');
    pageLoadTrace.start();
    
    // Record page load metrics
    window.addEventListener('load', () => {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      
      pageLoadTrace.putMetric('load_time', loadTime);
      pageLoadTrace.stop();
    });
  });
}

// Monitor API response times
export const monitorApiCall = async (apiName, apiCall) => {
  const apiTrace = trace(perf, `api_${apiName}`);
  apiTrace.start();
  
  try {
    const startTime = performance.now();
    const response = await apiCall();
    const endTime = performance.now();
    
    apiTrace.putMetric('response_time', endTime - startTime);
    apiTrace.putAttribute('status', 'success');
    return response;
  } catch (error) {
    apiTrace.putAttribute('status', 'error');
    apiTrace.putAttribute('error', error.message);
    throw error;
  } finally {
    apiTrace.stop();
  }
}; 