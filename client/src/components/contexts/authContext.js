
import { createContext, useReducer, useEffect } from 'react'
import { authReducer } from '../reducers/authReducer'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: false,
        isAuthenticated: false,
        user: null
    });

    // Authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`)
            if (response.data.success) {
                dispatch({
                    type: "SET_AUTH", payload: {
                        isAuthenticated: true,
                        user: response.data.user
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null);
            dispatch({ stype: 'SET_AUTH', payload: { isAuthenticated: false, user: null } })
        }
    }

    useEffect(() => { loadUser() }, [])

    // Login function

    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            }
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, error: error.message }
        }
    }

    const registerUser = async userForm => {
        try {
            const res = await axios.post(`${apiUrl}/auth/register`, userForm)

            return res.data;
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, error: error.message }
        }
    }
    // Context data
    const authContextData = { loginUser, registerUser, authState }

    // Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;