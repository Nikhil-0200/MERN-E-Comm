import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './Redux/counter/counterSlice'
import NavBar from './components/NavBar'
import AllRoutes from './components/AllRoutes'

function App() {

  const count = useSelector((state)=> state.counter.value)
  const dispatch = useDispatch()
  
  return (
    <div>
      <NavBar/>
      <AllRoutes/>
    </div>
  )
}

export default App
