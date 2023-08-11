import React, {useEffect,useState} from 'react';
import useAuth from '../utils/useAuth';
import { useNavigate } from 'react-router-dom';
import BarChartBox from "../components/barChartBox/BarChartBox";
import BigChartBox from "../components/bigChartBox/BigChartBox";
import ChartBox from "../components/chartBox/ChartBox";
import TopBox from "../components/topBox/TopBox";
import "../../assets/styles/admin/dashboard.scss";
import { fetchSubscriberData } from '../utils/dataCollection/totalSubs';
import { fetchWeeklyView } from '../utils/dataCollection/weeklyViews';
import { fetchWeeklyVisit } from '../utils/dataCollection/weeklyVisits';


const combineChartDataByDay = (chartDataArray) => {
  const combinedData = {};

  chartDataArray.forEach((chartData) => {
    chartData.chartData.forEach((dataPoint) => {
      const { name, [chartData.dataKey]: value } = dataPoint;
      if (!combinedData[name]) {
        combinedData[name] = { name };
      }
      combinedData[name][chartData.dataKey] = value;
    });
  });

  return Object.values(combinedData);
};


const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [totalSubs, setTotalSubs] = useState(null);
  const [totalVisits, setTotalVisits] = useState(null);
  const [totalViews, setweeklyViews] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/admin-dashboard/login');
    } 
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchSubscriberData()
        .then(data => {setTotalSubs(data)})
        .catch(error => console.error('Error initializing component:', error));
        
    fetchWeeklyVisit()
        .then(data => setTotalVisits(data))
        .catch(error => console.error('Error initializing component:', error));
        
    fetchWeeklyView()
        .then(data => setweeklyViews(data))
        .catch(error => console.error('Error initializing component:', error));

    Promise.all([
      fetchSubscriberData(),
      fetchWeeklyVisit(),
      fetchWeeklyView(),
    ])
      .then(([subsData, visitsData, viewsData]) => {
        setTotalSubs(subsData);
        setTotalVisits(visitsData);
        setweeklyViews(viewsData);

        // Combine the chart data
        const combinedChartData = combineChartDataByDay([viewsData, visitsData, subsData]);
        setAnalyticsData(combinedChartData);
      })
      .catch((error) => console.error('Error initializing component:', error));
  }, []);

  if (analyticsData) {
    console.log(analyticsData);
  }
  

  return (
    <div className='dashboard'>
      <div className="info">
        <h1>Dashboard</h1>
        <br/>
      </div>
      <div className="dash">
        <div className="box box1">
          <ChartBox {...totalSubs} />
        </div>
        <div className="box box2">
          <ChartBox {...totalViews} />
        </div>
        <div className="box box3">
          <TopBox />
        </div>
        <div className="box box4">
          <ChartBox {...totalVisits} />
        </div>
        <div className="box box6">
          <BigChartBox data={analyticsData}/>
        </div>
        <div className="box box7">
          <BarChartBox {...totalViews} />
        </div>
      </div>
    </div>
    
  );
};

export default Dashboard;
