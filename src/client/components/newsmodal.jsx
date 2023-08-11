import React, { useEffect , useState } from 'react';
import '../../assets/styles/client/newsmodal.scss';

const NewsModal = () => {
  const [email, setEmail] = useState('');
  const [showSubscriptionSuccess, setShowSubscriptionSuccess] = useState(false);
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
      window.location.href = '/#popup1';
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFocus = () => {
    setShowSubscriptionSuccess(false);
    setShowEmailWarning(false);
    setShowError(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    document.body.style.overflow = 'auto';
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    sessionStorage.setItem('donotshowModal', checked);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/subs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const reply = await response.json();
      setIsMessage(reply.message);

      if (response.ok) {
        
        setShowSubscriptionSuccess(true);

        setTimeout(() => {
          setModalVisible(false);
        }, 1000);        

      } else if (response.status === 409) {

        setShowEmailWarning(true);     

      } else {

        setShowError(true);
        
      }
    } catch (error) {
      console.error('Error:', error);
      setShowError(true);
    }
  };

  return (
    <div>
      {modalVisible && ( 
        <div id="popup1">
          <div className="popup fade-out">
            <a className="close" href="/#" onClick={closeModal}><p>&times;</p></a>
            <div id="dialog" className="window">
              <div className="box">
                <div className="newletter-title">
                  <h2>Sign up &amp; get 10% off</h2>
                </div>
                <div className="box-content newleter-content">
                  <p className='text'>Subscribe to our newsletters now and stay up-to-date with new release products and exclusive offers.</p>
                  <div id="frm_subscribe">
                    <form className='subs' id="subscribe_popup" onSubmit={handleSubmit}>
                      <div className='inputs'>
                        <input type="email" id='subscribe_pemail' placeholder="Enter your email.." value={email} onChange={handleEmailChange} onFocus={handleFocus} required/>
                        <label>
                          <input type="checkbox" name="donotshow" id="donotshow" onChange={handleCheckboxChange}/> Do not show this again
                        </label>
                      </div>
                      {showSubscriptionSuccess && (
                        <div className="success-message">
                          <p>{isMessage}</p>
                        </div>
                      )}
                      {showEmailWarning && (
                        <div className="warning-meesage">
                          <p>{isMessage}</p>
                        </div>
                      )}
                      {showError && (
                        <div className="error-message">
                          <p>{isMessage}</p>
                        </div>
                      )}
                      <button type='submit' className='button'>Subscribe</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overlay" onClick={closeModal} ></div>
        </div>
      )}
    </div>
  );
};

export default NewsModal;
