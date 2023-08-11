import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/admin/login.scss';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/reducers/authReducer';
import { setCompanyData } from '../../redux/reducers/compDataReducer';
import useAuth from '../utils/useAuth';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isError, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/admin-dashboard');
    } 
    
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const fetchCompanyData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API+'/company/info'); // Change the URL to your API endpoint
      const companyData = await response.json();

      // Dispatch action to store the company data in Redux
      dispatch(setCompanyData(companyData));
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(process.env.REACT_APP_API+'/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, rememberMe  })
        });
        const data = await response.json();
        console.log(data);
        
        if (response.ok) {
            // Successful login, store user and tokens in sessionStorage
            dispatch(loginSuccess(data.user, data.accessToken, data.refreshToken));

            // Fetch and store company data after successful login
            fetchCompanyData();

            navigate('/admin-dashboard');
        } else {
            // Handle login error.
            console.log(data.message);
            setError(data.message);
        }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <main className="auth container">
      <div className="content">
        <div className="authSquareTilt"></div>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            {isError && <p className="error-message" style={{ color: 'red' }}>{isError}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <span className="eye-icon" onClick={togglePasswordVisibility} >
                  {passwordVisible ? <RiEyeLine /> : <RiEyeOffLine />}
                </span>
              </div>
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                /> Remember Me
              </label>
              <br/>
              <br/>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
  
};

export default Login;
