import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../assets/styles/client/Faqs.scss'; // Import the SCSS file

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    // Fetch data from MongoDB through your backend API
    fetch(`${process.env.REACT_APP_API}/faqs`)
      .then(response => response.json())
      .then(data => setFaqs(data))
      .catch(error => console.error('Error fetching FAQ data:', error));
  }, []);

  return (
    <div className='faqs'>
      <h1 className='head-title'>Frequently Asked Questions</h1>
      <Carousel showThumbs={false}>
        {faqs.map(faq => (
          <div key={faq._id} className="slide">
            <h1 className='question'>{faq.question}</h1>
            <p className='answer'>{faq.answer}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Faqs;
