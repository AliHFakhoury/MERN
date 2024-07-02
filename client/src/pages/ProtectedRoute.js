import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import axios from 'axios';

const ProtectedRoute = ({children}) => {
    const [ isLoading, setIsLoading ] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const tokenInStorage = localStorage.getItem('token')

        if(!tokenInStorage){
            console.log("No token")
            navigate('/login')
        } else {
            verifyToken(tokenInStorage)

        }

    }, [])

    const verifyToken = async (token) => {
        console.log("Verify Token ran")

        try {
            
            const request = await axios.post('http://localhost:5000/controller/user/verifyToken', {'token': token})
            console.log(request)
            if(request.status == 200){
                setIsLoading(false)
            }else{
                navigate('/login')
            }

        }catch (error) {
            console.log(error)
            navigate('/login')

        }
    }

    if(isLoading){
        return <div>Loading... Cool animation ongoing</div>;
    }else{
        return <Outlet/>

    }
}

export default ProtectedRoute;