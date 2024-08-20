import React, {useEffect, useState, useRef} from 'react';

function DisplayImg ({className, src, alt, loading, fetchpriority, darkMode, lan}) {
  const [isUrlLoaded, setIsUrlLoaded] = useState(false);
  const handleLoad = e => setIsUrlLoaded(true);

  return (
    
    <img 
      className={`${className} --fade-in iteration--1 animate--05s${isUrlLoaded ? ' --play' : ' --pause'}`} 
      src={src} 
      loading={!loading ? '' : loading} 
      alt={!alt ? '' : alt} 
      fetchpriority={!fetchpriority ? '' : fetchpriority} 
      onLoad={handleLoad}
    />

  )
}

export default DisplayImg;