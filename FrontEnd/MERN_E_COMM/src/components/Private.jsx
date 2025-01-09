import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const Private = ({children}) =>{
    const user = useSelector((state)=> state.user.userInfo)
    const userChecked = useSelector((state) => state.auth.userChecked)

    if (!userChecked) {
        return <div>Loading...</div>;
      }

    if(!user){
        return <Navigate to="/login" />
    }
  
        return children
    
}

export default Private