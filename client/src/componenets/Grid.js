import React, { useEffect, useState } from 'react';
import { API, IMG_URL } from '../config';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';

const Grid = (props) => {
  const [mansory, setMansory] = useState([]);
  const init = async () => {
    await Axios.get(`${API}/mansory`).then((data) => {
      setMansory(data.data);
    });
  };

  const gotoURL = (url) => {
    if (url) {
      window.open(url);
    } else return;
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {/* <section class="gallery grid-gallery">
        
        {mansory.map((m) => (
          <figure class="image-1">
            <Link to={`/edit/${m.web_id}`}>
              <img src={`${IMG_URL}/${m.img_path}`} />
              <figcaption>web_id: {m.web_id}</figcaption>
            </Link>
          </figure>
        ))}
      </section>

      <div id="lightbox"></div> */}
      <div class="area">
        {mansory.map((m) => (
          <div class="dev-box" onClick={() => gotoURL(m.web_url)}>
            <img src={`${IMG_URL}/${m.img_path}`} />
            <div className="d-flex">
              <LocalOfferOutlinedIcon stlye={{ color: 'red' }} />
              <p> {m.web_name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

Grid.propTypes = {};

export default Grid;
