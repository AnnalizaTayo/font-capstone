import React, { useEffect, useState } from 'react';

export default function CircleMission(props) {
    const [companyInfo, setCompanyInfo] = useState({});
    
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
                setCompanyInfo(data);
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
            setCompanyInfo(data);
        }

    },[]);

    return (
        <>
        <div className={props.active === 'inactive' ? 'about-circle-container-inactive' : 'about-circle-container'}>
            <div className='about-text-container'>
                <h1 className="about-circle-text">Mission</h1>
            </div>
            {props.active === 'active' ? 
                <div className="about-overview-container">
                    <div className='background-overlay'></div>
                    <div className="about-overview-text">
                        {companyInfo.mission}
                    </div>
                </div>
                : 
                ''
            }
        </div>
        </>
    )
}