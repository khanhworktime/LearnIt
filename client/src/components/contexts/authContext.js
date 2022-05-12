
import { createContext, useReducer } from 'react'
import { authReducer } from '../reducers/authReducer'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants'
import axios from 'axios'

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    });

    // Login function

    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success) localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)

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
    const authContextData = { loginUser, registerUser }

    // Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;