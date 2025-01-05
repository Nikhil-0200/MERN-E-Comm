import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from './components/NavBar'
import AllRoutes from './components/AllRoutes'
import { useEffect } from 'react'
import { fetchItemByUserIdAsync } from './Redux/cart/cartSlice'
import { fetchLoggedInUserAsync } from './Redux/user/userSlice'

function App() {

  const user = useSelector((state)=> state.auth.loggedIn)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(user){
      dispatch(fetchItemByUserIdAsync(user.id)) 
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user])
  
  return (
    <div>
      <NavBar/>
      <AllRoutes/>
    </div>
  )
}

export default App
