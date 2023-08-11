import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './companyFormEdit.scss';
import useAuth from '../../utils/useAuth';
import { setCompanyData } from '../../../redux/reducers/compDataReducer';
import { useDispatch } from 'react-redux';


const CompanyEditForm = () => {
    const [isError , setIsError] = useState('');
    const { companyData } = useAuth();
    const [isCompanyData, setLocalCompanyData] = useState(null);
    const [isToggleOn, setToggleOn] = useState(false);
    const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleToggleForm = () => {
        setToggleOn((prevState) => !prevState);
    };

    const closeSuccessPopup = () => {
        setIsSuccessPopupVisible(false);
    };

    useEffect(() => {
        setLocalCompanyData(companyData);
    }, [companyData]);
    
    if (!companyData && !isCompanyData) {
    return <div>Loading...</div>;
    }

    const {
        // eslint-disable-next-line
        contact,
        // eslint-disable-next-line
        about,
        // eslint-disable-next-line
        mission,
        // eslint-disable-next-line
        vision
    } = companyData;
    
    // Check if the contact object is defined before accessing its properties
    const email = contact?.email || '';
    const landLineNumber = contact?.landLineNumber || '';
    const mobileNumber = contact?.mobileNumber || '';
    const website = contact?.website || '';
    const address = contact?.address || '';
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setLocalCompanyData((prevCompany) => ({
        ...prevCompany,
        [name]: value,
        }));
        console.log(`handleChange`);
        console.log(isCompanyData);
        console.log(`handleChange`);
    };
    
    const handleContactChange = (event) => {
        const { name, value } = event.target;
        setLocalCompanyData((prevCompany) => ({
        ...prevCompany,
        contact: {
            ...prevCompany.contact,
            [name]: value,
        },
        }));
        console.log(`handleContactChange`);
        console.log(isCompanyData);
        console.log(`handleContactChange`);
    };
    
    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        setLocalCompanyData((prevCompany) => ({
        ...prevCompany,
        companyLogo: file,
        }));
        console.log(`handleLogoChange`);
        console.log(isCompanyData);
        console.log(`handleLogoChange`);
    };
    
    const handleHighlightCollectionChange = (event) => {
        const file = event.target.files[0];
        setLocalCompanyData((prevCompany) => ({
        ...prevCompany,
        highlightCollection: file,
        })
        );
        console.log(`handleHighlightCollectionChange`);
        console.log(isCompanyData);
        console.log(`handleHighlightCollectionChange`);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setIsError('');
        const formData = new FormData();
        formData.append('about', isCompanyData.about);
        formData.append('mission', isCompanyData.mission);
        formData.append('vision', isCompanyData.vision);
        formData.append('email', isCompanyData.contact.email);
        formData.append('landLineNumber', isCompanyData.contact.landLineNumber);
        formData.append('mobileNumber', isCompanyData.contact.mobileNumber);
        formData.append('website', isCompanyData.contact.website);
        formData.append('address', isCompanyData.contact.address);
        formData.append('companyLogo', isCompanyData.companyLogo);
        formData.append('highlightCollection', isCompanyData.highlightCollection);
        
        console.log(...formData);
        // Send the updated company data to the backend API
        axios.put(process.env.REACT_APP_API+'/company/update', formData)
        .then((response) => {
            const data = response.data;
            console.log('Company updated successfully:', data.company);
            dispatch(setCompanyData(response.data.company));
            setToggleOn(false);
            setIsSuccessPopupVisible(true);
            setIsLoading(false);
            setIsError('');
            // Optionally, you can redirect to a success page or perform any other actions here
        })
        .catch((error) => {
            console.error('Error updating company data:', error);
            setIsError('All fields are required');
        });
        
    };
    
    return (
        <div className='editCompany'>
            <button onClick={handleToggleForm}>Update Company Information</button>
            {isToggleOn && (
                <div className='container'>
                    <div className='form-container'>
                        <button className='close' onClick={handleToggleForm}>&times;</button>
                        <h1>Edit House of J's infomation</h1>
                        <form onSubmit={handleSubmit}>
                            <label>
                            Company Logo:
                            <input
                                type="file"
                                name="companyLogo"
                                onChange={handleLogoChange}
                                accept="image/*"
                            />
                            </label>
                            <br />
                            <label>
                            Contact Email:
                            <input
                                type="email"
                                name="email"
                                defaultValue={email}
                                onChange={handleContactChange}
                            />
                            </label>
                            <br />
                            <label>
                            Landline Number:
                            <input
                                type="text"
                                name="landLineNumber"
                                defaultValue={landLineNumber}
                                onChange={handleContactChange}
                            />
                            </label>
                            <br />
                            <label>
                            Mobile Number:
                            <input
                                type="text"
                                name="mobileNumber"
                                defaultValue={mobileNumber}
                                onChange={handleContactChange}
                            />
                            </label>
                            <br />
                            <label>
                            Website:
                            <input
                                type="text"
                                name="website"
                                defaultValue={website}
                                onChange={handleContactChange}
                            />
                            </label>
                            <label>
                            Address:
                            <input
                                type="text"
                                name="address"
                                defaultValue={address}
                                onChange={handleContactChange}
                            />
                            </label>
                            <br />
                            <label>
                            About:
                            <textarea
                                name="about"
                                defaultValue={about}
                                onChange={handleChange}
                            />
                            </label>
                            <br />
                            <label>
                            Mission:
                            <input
                                type="text"
                                name="mission"
                                defaultValue={mission}
                                onChange={handleChange}
                            />
                            </label>
                            <br />
                            <label>
                            Vision:
                            <input
                                type="text"
                                name="vision"
                                defaultValue={vision}
                                onChange={handleChange}
                            />
                            </label>
                            <br />
                            <label>
                            Highlight Image:
                            <input
                                type="file"
                                name="highlightCollection"
                                onChange={handleHighlightCollectionChange}
                                accept="image/*"
                            />
                            </label>
                            {isError && <p className="error-message" style={{ color: 'red' }}>{isError}</p>}
                            <button type="submit" style={isLoading? {cursor: 'not-allowed', opacity: 0.5} : {}}>{isLoading ? 'Uploading... Please wait..' : 'Update Company'}</button>
                        </form>
                    </div>
                    <div className='background' onClick={handleToggleForm}>
                    </div>
                </div>
                
            )}
            {isSuccessPopupVisible && (
                <div className="success-popup">
                <p>Form submitted successfully!</p>
                <button onClick={closeSuccessPopup}>Close</button>
                </div>
            )}
        </div>
    );
}

export default CompanyEditForm;