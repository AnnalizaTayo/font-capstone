import { persistor } from '../store/store';

export const loginSuccess = (user, accessToken, refreshToken) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: { user, accessToken, refreshToken },
    };
};

export const logout = () => {
    return (dispatch) => {
        persistor.purge().then(() => {
            dispatch({ type: 'LOGOUT' });
            
        }).catch((error) => {
            console.error("Error purging persistor:", error);
        });
    };
};

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'LOGIN_SUCCESS':
        return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        };
    case 'LOGOUT':
        return initialState;
    default:
        return state;
    }
};

export default authReducer;
