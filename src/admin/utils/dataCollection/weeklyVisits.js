import { FaMapMarkerAlt } from 'react-icons/fa';

export const fetchWeeklyVisit = async() => {
    return fetch(process.env.REACT_APP_API + '/views/weekly-visit-counts')
        .then(response => response.json())
        .then(data => {
            const dailyData = data.chartData; // Assuming this property holds your daily subscriber data
            const totalVisits = {
                color: "#8884d8",
                icon: <FaMapMarkerAlt />,
                title: "Visits",
                number: data.totalWeeklyVisitCounts !== null ? data.totalWeeklyVisitCounts.toString() : "Loading...",
                dataKey: "visits",
                chartData: dailyData.map(dayData => ({
                    name: dayData.name, // Convert date to day name
                    visits: dayData.visits, // Assuming 'subscribers' is a property in your dailyData
                })),
            };
            console.log(totalVisits.chartData);
            return totalVisits;
        })
        .catch(error => {
            console.error('Error fetching subscriber data:', error);
            throw error;
        });
};


