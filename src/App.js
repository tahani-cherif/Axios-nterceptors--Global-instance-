import './App.css';
import Login from './login';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Avion from './getavion';

function App() {
  
  return (
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/"   element={<Login/>} />
      <Route path="/avion"   element={<Avion/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
