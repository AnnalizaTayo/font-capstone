import React, { useState, useEffect } from "react";
import "./topBox.scss";


const TopBox = () => {
  const [latestSubscribers, setLatestSubscribers] = useState([]);

  // Fetch latest subscribers from your API when the component mounts
  useEffect(() => {
    fetch(process.env.REACT_APP_API + '/subs/latest') // Replace with the appropriate API endpoint
      .then((response) => response.json())
      .then((data) => setLatestSubscribers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="topBox">
      <h1>Recent Subscribers</h1>
      <div className="list">
        {latestSubscribers.map((user) => (
          <div className="listItem" key={user._id}>
            <div className="user">
              {/* Replace 'user.img' with the appropriate field from your data */}
              <img src={user.img} alt="" />
              <div className="userTexts">
                <span className="username">{user.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
