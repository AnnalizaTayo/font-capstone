import React, { useEffect } from 'react';
import useAuth from '../utils/useAuth';
import { useNavigate } from 'react-router-dom';
import CompanyEditForm from "../components/companyForms/companyFormEdit";
import '../../assets/styles/admin/Company.scss';


const Company = () => {
  const { companyData, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const logoURL = process.env.REACT_APP_API+'/company/logo';
  const highlightURL = process.env.REACT_APP_API+'/company/highlight';

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/admin-dashboard/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="comp">
      <div className="info">
        <h1>Company Info</h1>
        <br/>
      </div>
        <div className="company fade-in-2">
          <div className="view comp">
            <h1>House of J</h1>
            <img src={logoURL} alt='logo'/>
            <br/>
            <div className="editFormToggle fade-in-2">
                <CompanyEditForm/>
            </div>
          </div>
          <div className="about view">
            <h2>About:</h2>
            <p>{companyData.about}</p>
            <h2>Mission:</h2>
            <p>{companyData.mission}</p>
            <h2>Vision:</h2>
            <p>{companyData.vision}</p>
          </div>
          <div className="contactInfos view">
            <h2>Contact Information:</h2>
            <div>
              <h4>Email:</h4>
              <p>{companyData.contact.email}</p>
            </div>
            <div>
              <h4>Landline Number:</h4>
              <p>{companyData.contact.landLineNumber}</p>
            </div>
            <div>
              <h4>Mobile Number:</h4>
              <p>{companyData.contact.mobileNumber}</p>
            </div>
            <div>
              <h4>Website:</h4>
              <p>{companyData.contact.website}</p>
            </div>
            <div>
              <h4>Address:</h4>
              <p>{companyData.contact.address}</p>
            </div>
          </div>
          
          <div className="highlight view">
            <h2>Highlight Image:</h2>
            <img src={highlightURL} alt='highlights'/>
          </div>
        </div>
      
      
    </div>
  );
};

export default Company;