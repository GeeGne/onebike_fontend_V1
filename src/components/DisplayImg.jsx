import React, {useEffect, useState, useRef} from 'react';

function DisplayImg ({className, src, alt, loading, fetchpriority, darkMode, lan}) {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoad = () => setIsLoading(false);

  return (
    
    <img 
      className={className} 
      src={src} 
      loading={!loading ? '' : loading} 
      alt={alt || ''} 
      fetchpriority={fetchpriority || 'auto'} 
      onLoad={handleLoad}
      style={{
        transition: 'filter 0.5s ease-in-out',
        filter: 'blur(' + (isLoading ? '20' : '0') + 'px)',
      }}
    />

  )
}

export default DisplayImg;