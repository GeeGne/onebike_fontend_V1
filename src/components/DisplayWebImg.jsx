import React, {useEffect, useState, useRef} from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '/src/firebase/storage';

function DisplayWebImg ({className, src, alt, loading, fetchpriority, darkMode, lan}) {
  const [imageUrl, setImageUrl] = useState("");
  const [isUrlLoaded, setIsUrlLoaded] = useState(false);

  useEffect(() => {

    const fetchImageUrl = async () => {
      try {
        const imageRef = ref(storage, src);
        const url = await getDownloadURL(imageRef);

        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImageUrl();
  }, [src]);

  const handleLoad = () => imageUrl && setIsUrlLoaded(true);

  return (
    
    <img 
      className={`${className} --fade-in iteration--1 animate--05s${isUrlLoaded ? ' --play' : ' --pause'}`} 
      src={imageUrl} 
      loading={!loading ? '' : loading} 
      alt={!alt ? '' : alt} 
      fetchpriority={!fetchpriority ? '' : fetchpriority} 
      onLoad={handleLoad}
    />

  )
}

export default DisplayWebImg;

{/* <img 
      className={`${className} --fade-in iteration--1 animate--05s${isUrlLoaded ? ' -play' : ' -pause'}`} 
      // className={`${className}${isUrlLoaded ? '' : ' add-background-color --panel-flick'}`} 
      src={imageUrl} 
      loading={!loading ? '' : loading} 
      alt={!alt ? '' : alt} 
      fetchpriority={!fetchpriority ? '' : fetchpriority} 
      onLoad={handleLoad}
    />
 */}