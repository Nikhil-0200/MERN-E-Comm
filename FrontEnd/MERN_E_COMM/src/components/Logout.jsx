import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../Redux/auth/authSlice";
import { Navigate } from "react-router-dom";

const Logout = () =>{
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.auth.loggedIn);

    useEffect(()=>{
        dispatch(logoutAsync())
    })

    return(
        <>
        {!user && <Navigate to="/login"></Navigate> }
        </>
        
    )
}

export default Logout;