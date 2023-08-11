// Action Types
const SET_COMPANY_DATA = 'SET_COMPANY_DATA';
const RESET_COMPANY_DATA = 'RESET_COMPANY_DATA';

// Initial State
const initialState = {
  companyData: null,
};

export const resetCompanyData = (data) => ({
    type: RESET_COMPANY_DATA,
    payload: data,
});

// Reducer Function
const compDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANY_DATA:
      return {
        ...state,
        companyData: action.payload,
      };
    case RESET_COMPANY_DATA:
        return initialState;
    default:
      return state;
  }
};

// Action Creators
export const setCompanyData = (data) => ({
  type: SET_COMPANY_DATA,
  payload: data,
});

export default compDataReducer;