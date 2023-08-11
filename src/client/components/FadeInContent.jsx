import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function FadeInContent({ children }) {
    const location = useLocation();

    useEffect(() => {
        const storedData = sessionStorage.getItem('myJsonData');
    
        if (!storedData) {
            fetch(`${process.env.REACT_APP_API}/company/info-noimages`)
                .then(response => {
                    if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    sessionStorage.setItem('companyInfo', JSON.stringify(data));
                    //console.log(data);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        } 

        // Add a short delay to ensure the fade-in effect
        const timer = setTimeout(() => {
            const content = document.querySelector('.fade-in-transition');
            if (content) {
                content.style.opacity = '1';
                fetch(`${process.env.REACT_APP_API}/views`, { credentials: 'include' }) 
                    .then(response => response.text())
                    .then(data => {
                        console.log(data); // Display the page view count in the console
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [location]);

    return <>{children}</>;
}