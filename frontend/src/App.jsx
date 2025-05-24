
import './App.css';
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/Home.jsx';
import NavBar from './components/NavBar.jsx';
import BookView from './pages/BookView.jsx';
import UserProfile from './pages/UserProfile.jsx';



function App() {
  return (<>
    <Router>
      <NavBar/>

      <Routes>
        <Route path="users/:id" element={<UserProfile/>}/>
        <Route path="books/:id" element={<BookView/>}/>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<h1>404 page not found!</h1>} /> {/* fallback to login */}
      </Routes>
    </Router>
  </>



  )

}

export default App
