import React, { useEffect, useState } from 'react';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import Axios from 'axios';
import { API, IMG_URL } from '../config';
import MaterialNavbar from '../componenets/MaterialNavbar';

const Image = ({ match }) => {
  const [image, setImage] = useState([]);

  const init = () => {
    const id = match.params.webId;
    Axios.post(`${API}/image`, { web_id: id }).then((result) => {
      setImage(result.data);
    });
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <MaterialNavbar />
      <div className="container p-5">
        {image && <h4>จำนวนรูปทั้งหมด : {image && image.length}</h4>}
        <SimpleReactLightbox>
          <SRLWrapper>
            {image.map((i) => (
              <a href={`${IMG_URL}/${i.img_path}`}>
                <img
                  src={`${IMG_URL}/${i.img_path}`}
                  alt={i.img_id}
                  style={{
                    maxWidth: '300px',
                    height: '300px',
                    borderRadius: '10px',
                  }}
                  className="card card-1 m-3"
                />
              </a>
            ))}
          </SRLWrapper>
        </SimpleReactLightbox>
      </div>
    </>
  );
};

export default Image;
