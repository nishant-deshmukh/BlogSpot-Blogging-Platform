import axios from 'axios';
import {createContext} from 'react';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext()


export const AuthContextProvider = ({children})=>{
    const [currentUser, setcurrentUser] = useState(JSON.parse(localStorage.getItem('user')|| null))
    const login = async(inputs)=>{
        const res = await axios.post("auth/login",inputs)
        setcurrentUser(res.data)
    }
    const logout = async(inputs)=>{
        const res = await axios.post("http://localhost:3000/auth/logout")
        setcurrentUser(null);
        localStorage.clear();
        window.location.href = "/"
    }



    useEffect(() => {
        localStorage.setItem('user',JSON.stringify(currentUser))
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser,login,logout}} >
            {children}
            </AuthContext.Provider>
    )
    
}