import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importiamo gli elementi necessari

import LibriForm from './pages/libriForm'

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/aggiungiLibri' element={<LibriForm />}/>
      </Routes> 
    </Router>
  )
}

export default App
