import React, { useState, useEffect } from 'react';
import { FaFacebookF , FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { BsTelephoneFill } from 'react-icons/bs';

export default function ClientFooter() {
    const [email, setEmail] = useState('');
    const [showSubscriptionSuccess, setShowSubscriptionSuccess] = useState(false);
    const [showEmailWarning, setShowEmailWarning] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isMessage, setIsMessage] = useState(false);
    const [companyContact, setCompanyContact] = useState(null);

    const checkData = async() => {
        await fetch(`${process.env.REACT_APP_API}/company/info-noimages`)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                sessionStorage.setItem('companyInfo', JSON.stringify(data));
                setCompanyContact(data.contact);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }
    
    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('companyInfo'));
        if(!data) {
            checkData();
        } else {
            setCompanyContact(data.contact);
        }

    },[]);

    const openGoogleMaps = () => {
        const encodedAddress = encodeURIComponent(companyContact.address);
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
        window.open(googleMapsUrl, '_blank');
    };
    
    const handleFocus = () => {
        setShowSubscriptionSuccess(false);
        setShowEmailWarning(false);
        setShowError(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        handleFocus();
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
            setEmail('');
            setTimeout(() => {
                setShowSubscriptionSuccess(false);
            }, 1500);

    
        } else if (response.status === 409) {
    
            setShowEmailWarning(true);   
            setTimeout(() => {
                setShowEmailWarning(false);
                setEmail('');
            }, 1500);  
    
        } else {
    
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                setEmail('');
            }, 1500);  
            
        }
        } catch (error) {
            console.error('Error:', error);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                setEmail('');
            }, 1500); 
        }
    };



    if(!companyContact){
        return <div>Loading</div>
    } 
    return (
        <footer className='footer-container'>
            <div className ='footer-img-logo'>
                <img src={`${process.env.REACT_APP_API}/company/logo`} alt="HouseofJ-Logo"/>
            </div>
            
            <div className="center">
                <h1>Connect with us</h1>
                <div className='footer-icons'>
                    <a href="https://www.facebook.com/HouseofJStyling" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF/>
                    </a>
                    <a href={`mailto:${companyContact? companyContact.email : null}?subject=Inquiry`}>
                        <IoIosMail/>
                    </a>
                    <a href={`tel:${companyContact? companyContact.mobileNumber : null}`}>
                        <BsTelephoneFill/>
                    </a>
                    <button onClick={openGoogleMaps}>
                        <FaMapMarkerAlt/>
                    </button>
                </div>
                <p className='message1'><br/></p>
            </div>
            
            <div className="footer-newsletter">
                <div className='newsletter'>
                    <h1> Newsletter </h1>
                    <p className="footer-newsletter-text">
                        Be the first to know about exciting new designs and much more!
                    </p>
                    <div className="footer-email">
                        <form onSubmit={handleSubmit}>
                            <input type='email' id='email' onFocus={handleFocus} onChange={handleEmailChange} value={email}/>
                            <button className='footer-subscribe'>Subscribe</button>
                        </form>
                    </div>
                    {(!showSubscriptionSuccess && !showEmailWarning && !showError) && <p className='message'><br/></p>}
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
                </div>
            </div>
        </footer>
    )
}