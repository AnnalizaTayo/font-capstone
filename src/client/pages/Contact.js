import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/client/Contact.scss';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


// install font awesome thru this https://fontawesome.com/docs/web/use-with/react/

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobileNumber: yup.string().required('Mobile number is required'),
  subject: yup.string().required('Subject number is required'),
  message: yup.string().required('Message number is required'),
});

function Contact() {
  const [companyContact, setCompanyContact] = useState({});
  const [success, setSuccess] = useState(false);
  const form = useRef();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema), // Use yupResolver to create the resolver
  });

  useEffect(() => {
      const data = JSON.parse(sessionStorage.getItem('companyInfo'));
      if(!data) {
          checkData();
      } else {
        setCompanyContact(data.contact);
      }
  },[]);

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

  const sendEmail = (data) => {
    console.log(data);
    emailjs.sendForm('service_cq0j0nf', 'template_45c4ffi', form.current, 'r_oGX201Mf_RHUYfE')
    .then((result) => {
        //console.log(result.text);
        setSuccess(true);
        form.current.reset();
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
    }, (error) => {
        console.log(error.text);
    });
  };

  return (
      <div className="contact-container">
        <div className="background-top"></div>
        <div className='outermostHome'>
            <div className='getInTouch'>
                <h1>GET IN TOUCH</h1>
                <p>Connect with us for a creative and collaborative journey, exploring custom clothing possibilities and creating one-of-a-kind garments. Our dedicated team will listen, guide, and craft extraordinary items tailored to your unique style and preferences. Start making a personalized wardrobe that reflects your individuality today.</p>
            </div>
            <div className='backgroundBlack'></div>
        </div>
        <div className='contact-inquire'>
          <div className='contact-details'>
              <div className='contact-div'>
                  <img src={`${process.env.REACT_APP_API}/company/logo`} alt='logo'/>
                  <h1>House of J</h1>
                  <ul className='address'>
                      <li>
                        <a href="#map">
                          <span className="icons">
                            <FontAwesomeIcon icon={faLocationDot} size="xl" style={{color: "#ffffff",}} /> 
                          </span>
                          <p>{companyContact.address}</p> 
                        </a>
                      </li>

                      <li>
                        <a href={`tel:${companyContact? companyContact.mobileNumber : null}`}>
                          <span className="icons">
                            <FontAwesomeIcon icon={faMobileScreenButton} size="xl" style={{color: "#ffffff",}} />
                          </span>
                          <p>{companyContact.mobileNumber}</p>
                        </a>
                      </li>

                      <li>
                        <a href={`mailto:${companyContact? companyContact.email : null}?subject=Inquiry`}>
                          <span className="icons">
                            <FontAwesomeIcon icon={faEnvelope} size="xl" style={{color: "#ffffff",}} />
                          </span>
                          <p>{companyContact.email}</p>
                        </a>
                      </li>
                  </ul>
              </div>
          </div>
          <div className='get-a-qoute'>
            <div className='squareTilt'></div>
            <form className='form-div' ref={form} onSubmit={handleSubmit(sendEmail)}>
              <h1>Request A Qoute</h1>
              <div className="half">
                <input type='text' className="inputtext" placeholder='FirstName *' name='firstName' {...register('firstName', { required: 'First name is required' })}/>
                <input type='text' className="inputtext" placeholder='LastName(Optional)' name='lastName'/>
              </div>
              <div className="full">
                <input type='text' className="inputtext" placeholder='Address(Optional)' name='address'/>
              </div>
              <div className="half">
                <input type='email' className="inputtext" placeholder='Email *' name='email' {...register('email', { required: 'Email is required' })}/>
                <input type='text' className="inputtext" placeholder='Mobile Number *' name='phone'{...register('mobileNumber', { required: 'Mobile number is required' })}/>
              </div>
              <div className="full">
                <input type='text' className="inputtext" placeholder='Subject *' name='subject' {...register('subject', { required: 'Subject is required' })}/>
              </div>
              <div className="full">
                <textarea placeholder='Message*' name="message" {...register('message', { required: 'Message is required' })}/>
              </div>
                {errors.message && <div className="error-message contact-msg">Please provide required inputs</div>}
                {success && <div className="success-message contact-msg">Email sent</div>}
              <button>SEND</button>
            </form>
          </div>
        </div>
        <div className='map' id="map">
          <iframe
            title="Google Map - 72 Malvar Road, Puerto Princesa, Palawan"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.2817075126336!2d118.7317337756791!3d9.742188077416532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b563da4b42e63f%3A0xb9de13ec4f1aaf81!2s72%20Malvar%20Road%2C%20Puerto%20Princesa%2C%205300%20Palawan!5e0!3m2!1sen!2sph!4v1691606163133!5m2!1sen!2sph"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
  );
}

export default Contact;