'use client';

import { useEffect } from 'react';
import { perf } from '../lib/firebase-config';
import { trace } from 'firebase/performance';

export default function FirebasePerformance() {
  useEffect(() => {
    if (typeof window !== 'undefined' && perf) {
      // Monitor page load time
      const pageLoadTrace = trace(perf, 'page_load');
      pageLoadTrace.start();
      
      // Record page load metrics
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      
      pageLoadTrace.putMetric('load_time', loadTime);
      pageLoadTrace.stop();
    }
  }, []);

  return null;
} 