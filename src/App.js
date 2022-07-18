import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
      </Routes>

      
    </Router>
  );
}

export default App;
