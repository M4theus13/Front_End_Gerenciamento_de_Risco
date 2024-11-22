import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/login'
import Cadastrar from './pages/cadastrar/cadastrar'
import GetUsuarios from './pages/listar-usuarios/getUsuarios'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/cadastrar' element={<Cadastrar></Cadastrar>}></Route>
          <Route path='/listar-usuarios' element={<GetUsuarios></GetUsuarios>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
