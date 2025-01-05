import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const Private = ({children}) =>{
    const user = useSelector((state)=> state.user.userInfo)
    
    if(!user){
        return <Navigate to="/login" />
    }
    else{
        return children
    }
}

export default Private