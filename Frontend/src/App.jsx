import './App.css'
import config from "../config.json"
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importiamo gli elementi necessari
import LibriForm from './pages/libriForm'
import Navbar from './components/navbar';
import RicercaChiave from './pages/ricercaChiave';
import LibriCat from './pages/libriCat';
import FormAutori from './pages/formAutori';
import Register from './pages/register';
import Login from './pages/login';
import Landing from './pages/landing';
axios.defaults.baseURL = config.API_URL
//axios.defaults.withCredentials = true; // Permette di gestire i cookie

function App() {


  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/aggiungiLibri' element={<LibriForm />}/>
        <Route path='/ricercaLibri' element={<RicercaChiave />}/>
        <Route path='/tuttiLibri' element={<LibriCat />}/>
        <Route path='/aggiungiAutori' element={<FormAutori />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
      </Routes> 
    </Router>
  )
}

export default App
