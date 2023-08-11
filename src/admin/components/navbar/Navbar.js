import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import useAuth from '../../utils/useAuth';
import "./navbar.scss";

const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Navbar = () => {
  const { username } = useAuth();
  const [faviconUrl, setFaviconUrl] = useState('');

  useEffect(() => {
    setFaviconUrl(process.env.REACT_APP_API+'/company/favicon');
  }, []); // Only run the effect once, when the component mounts

  return (
    <div className="adminnavbar">
      <Link to="/" className="logo">
        <img src={faviconUrl} alt="logo" />
        <span><h1>House of J</h1></span>
      </Link>
      <div className="icons">
        <div className="user">
          <span><h3>Hi {username ? capitalizeFirstLetter(username) : 'User' } !</h3></span>
        </div>
        <Link to="/company?activateToggle=true">
          <img src="/image/settings.svg" alt="" className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
