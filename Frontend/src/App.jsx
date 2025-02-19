import './App.css'
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importiamo gli elementi necessari
import LibriForm from './pages/libriForm'
import Navbar from './components/navbar';
import RicercaChiave from './pages/ricercaChiave';
axios.defaults.baseURL = "http://127.0.0.1:5000"

function App() {


  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path='/aggiungiLibri' element={<LibriForm />}/>
        <Route path='/ricercaLibri' element={<RicercaChiave />}/>
      </Routes> 
    </Router>
  )
}

export default App
