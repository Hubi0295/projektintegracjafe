
import './App.css'
import Sidebar from "./components/Sidebar.jsx";
import MainContent from "./components/MainContent.jsx";
import Results from "./components/Results.jsx";
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
function App() {


  return (
      <Router>
      <>
          <div className="container">
              <Sidebar/>
              <Routes>
                  <Route path="/results" element={<Results/>}/>
                  <Route path="/" element={<MainContent/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Register/>}/>
              </Routes>
          </div>
      </>
      </Router>
  )
}

export default App
