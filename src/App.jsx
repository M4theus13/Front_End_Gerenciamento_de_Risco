import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/login'
import Cadastrar from './pages/cadastrar/cadastrar'
import GetUsuarios from './pages/listar-usuarios/getUsuarios'
import PaginaInicial from './pages/pagina-inicial/paginaInicial'
import AdminCadastrar from './pages/admin/admin-cadastrar/adminCadastrar'
import Menu from './pages/menu/menu'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PaginaInicial></PaginaInicial>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/cadastrar' element={<Cadastrar></Cadastrar>}></Route>
          <Route path='/menu' element={<Menu></Menu>}></Route>
          <Route path='/listar-usuarios' element={<GetUsuarios></GetUsuarios>}></Route>
          <Route path='/administrador' element={<AdminCadastrar></AdminCadastrar>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
