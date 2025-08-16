// components/FacebookEvents.tsx
'use client';
import React, { useState, useEffect } from 'react';

export default function FacebookEvents() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Set a timeout to detect if the iframe fails to load
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setHasError(true);
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(timeout);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div style={{ width: "100%", maxWidth: 700, margin: "0 auto" }}>
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brewery-gold"></div>
          <span className="ml-3 text-brewery-gold">Loading events...</span>
        </div>
      )}
      
      {hasError && (
        <div className="text-center py-8">
          <p className="text-brewery-gold mb-4">Unable to load Facebook events</p>
          <a 
            href="https://www.facebook.com/unplugbrew/events" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brewery-gold underline hover:text-white"
          >
            View events on Facebook
          </a>
        </div>
      )}

      <iframe 
        src='https://widgets.sociablekit.com/facebook-page-events/iframe/25589029' 
        frameBorder='0' 
        width='100%' 
        height='1000'
        title="Facebook Events"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        style={{ display: isLoading || hasError ? 'none' : 'block' }}
      />
    </div>
  );
}