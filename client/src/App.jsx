
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Registration from './Registration'
import Login from './Login'
import Home from './Home'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
       
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App