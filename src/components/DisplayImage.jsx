import React, {useEffect, useState, useRef} from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '/src/firebase/storage';

function DisplayImage ({className, alt, src, darkMode, lan}) {
  const [imageUrl, setImageUrl] = useState("");

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


  return (
    <img className={className} alt={alt} src={imageUrl} />
  )
}

export default DisplayImage;