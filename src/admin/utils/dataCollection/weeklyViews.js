import { BsEye } from 'react-icons/bs';

export const fetchWeeklyView = async() => {
    return fetch(process.env.REACT_APP_API + '/views/weekly-page-views')
        .then(response => response.json())
        .then(data => {
            const dailyData = data.chartData; // Assuming this property holds your daily subscriber data
            const totalViews = {
                color: "teal",
                icon: <BsEye />,
                title: "Views",
                number: data.totalWeeklyPageViews !== null ? data.totalWeeklyPageViews.toString() : "Loading...",
                dataKey: "views",
                chartData: dailyData.map(dayData => ({
                    name: dayData.name, // Convert date to day name
                    views: dayData.pageViews, // Assuming 'subscribers' is a property in your dailyData
                })),
            };
            console.log(totalViews.chartData);
            return totalViews;
        })
        .catch(error => {
            console.error('Error fetching subscriber data:', error);
            throw error;
        });
};


