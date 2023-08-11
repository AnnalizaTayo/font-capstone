import { combineReducers } from 'redux';
import authReducer from './authReducer';
import compDataReducer from './compDataReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  companyData: compDataReducer,
});

export default rootReducer;
