import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Axios from 'axios';
import { API, IMG_URL } from '../config';

const LightboxExample = ({ img, webId }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState([]);
  const images = [`${IMG_URL}/${img}`];

  const init = () => {
    Axios.post(`${API}/image`, { web_id: webId }).then((result) => {
      setImage(result.data);
    });
  };

  image.map((p) => {
    let imgpath = `${IMG_URL}/${p.img_path}`;
    images.push(imgpath);
  });

  const images2 = [...new Set(images)];

  useEffect(() => {
    init();
    setPhotoIndex(0);
  }, []);

  return (
    <div>
      <img
        src={`${IMG_URL}/${img}`}
        style={{
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          objectFit: 'cover',
        }}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <Lightbox
          mainSrc={images2[photoIndex]}
          nextSrc={images2[(photoIndex + 1) % images2.length]}
          prevSrc={images2[(photoIndex + images2.length - 1) % images2.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images2.length - 1) % images2.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images2.length)
          }
        />
      )}
    </div>
  );
};

export default LightboxExample;
