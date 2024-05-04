
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Registration from './Registration'
import Login from './Login'
import Home from './Home'
import { useEffect, useState } from 'react'
import { auth } from './firebase'



const App = () => {
  const [userName, setUserName] = useState("")

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        setUserName(user.displayName)
      }
      else{
        setUserName("")
      }
    })
  },[])
  return (
    <div >
  
   
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registration  /> }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/welcome' element={<Home name={userName} />}/>
       
        
        
       
      </Routes>
   
    </BrowserRouter>
    </div>
  )
}

export default App