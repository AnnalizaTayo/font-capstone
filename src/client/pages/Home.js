import React, { useEffect, useState } from 'react';
import NewsModal from '../components/newsmodal';
import '../../assets/styles/client/home.scss';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  //const [isDoNotShow, setIsDoNotShow] = useState(false);
  const logoUrl = process.env.REACT_APP_API+'/company/logo';
  const highlightUrl = process.env.REACT_APP_API+'/company/highlight';
  
  useEffect(() => {
    const donotshow = sessionStorage.getItem('donotshowModal');
    console.log(donotshow);
    if (donotshow === 'true') {
      setShowPopup(false);
      document.body.style.overflow = 'auto';
    } else {
      setShowPopup(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  return (
    <section>
      {showPopup && <NewsModal />}
      <div className='containerHome'>
          <div className='containerHomeOne'>
              <img src={logoUrl} alt='logo' />
              <p>Individuality crafted, tailored for you!</p>
          </div>
          <div className='containerHomeTwo'>
              <div className='hero'>
                <div className='squareTilt'></div>
                <img src={highlightUrl} alt='imageFlex' />
              </div>
              <a href="/contact">INQUIRE NOW</a>
          </div>
      </div>
    </section>
  );
};

export default Home;