import './App.css'
import config from "../config.json"
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importiamo gli elementi necessari
import LibriForm from './pages/libriForm'
import Navbar from './components/navbar';
import RicercaChiave from './pages/ricercaChiave';
import LibriCat from './pages/libriCat';
import FormAutori from './pages/formAutori';
axios.defaults.baseURL = config.API_URL

function App() {


  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path='/aggiungiLibri' element={<LibriForm />}/>
        <Route path='/ricercaLibri' element={<RicercaChiave />}/>
        <Route path='/tuttiLibri' element={<LibriCat />}/>
        <Route path='/aggiungiAutori' element={<FormAutori />}/>
      </Routes> 
    </Router>
  )
}

export default App
