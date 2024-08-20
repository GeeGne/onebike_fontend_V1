import React, {useEffect, useState, useRef} from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '/src/firebase/storage';

function DisplayImage ({className, src, alt, loading, fetchpriority, darkMode, lan}) {
  const [imageUrl, setImageUrl] = useState("");
  const [isUrlLoaded, setIsUrlLoaded] = useState(false);

  useEffect(() => {

    const fetchImageUrl = async () => {
      try {
        const imageRef = ref(storage, src);
        const url = await getDownloadURL(imageRef);

        setImageUrl(url);
        setIsUrlLoaded(true);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImageUrl();
  }, [src]);

  const handleLoad = e => {
    if (isUrlLoaded) e.target.classList.add('--fade-in', 'iteration--1', 'animate--05s');
  }

  return (
    <img 
      className={`${className}${isUrlLoaded ? '' : ' add-background-color --panel-flick'}`} 
      src={imageUrl} 
      loading={!loading ? '' : loading} 
      alt={!alt ? '' : alt} 
      fetchpriority={!fetchpriority ? '' : fetchpriority} 
      onLoad={handleLoad}
    />
  )
}

export default DisplayImage;