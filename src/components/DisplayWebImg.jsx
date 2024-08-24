import React, {useEffect, useState, useRef} from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '/src/firebase/storage';

function DisplayWebImg ({className, src, alt, loading, fetchpriority, darkMode, lan}) {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {

    const fetchImageUrl = async () => {
      if (!src) return;

      try {
        const imageRef = ref(storage, src);
        const url = await getDownloadURL(imageRef);

        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUrl('/assets/img/empty/empty(2).webp');
      }
    };

    fetchImageUrl();
  }, [src]);

  const handleLoad = () => imageUrl && setIsLoading(false);

  return (
    
    <img 
      className={className} 
      src={imageUrl} 
      loading={!loading ? '' : loading} 
      alt={alt || ''} 
      fetchpriority={fetchpriority || 'auto'} 
      onLoad={handleLoad}
      style={{
        transition: 'opacity 0.5s ease-in-out',
        opacity: isLoading ? '0' : '1',
      }}
    />

  )
}

export default DisplayWebImg;

{/* <img 
      className={`${className} --fade-in iteration--1 animate--05s${isLoading ? ' -play' : ' -pause'}`} 
      // className={`${className}${isLoading ? '' : ' add-background-color --panel-flick'}`} 
      src={imageUrl} 
      loading={!loading ? '' : loading} 
      alt={!alt ? '' : alt} 
      fetchpriority={!fetchpriority ? '' : fetchpriority} 
      onLoad={handleLoad}
    />
 */}