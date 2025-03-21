import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/login'
import Cadastrar from './pages/cadastrar/cadastrar'
import Administrador from './pages/administrador/administrador'
import PaginaInicial from './pages/pagina-inicial/paginaInicial'
import AdminCadastrar from './pages/admin/admin-cadastrar/adminCadastrar'
import Menu from './pages/menu/menu'
import Config from './pages/configuracao/config'
import Erro from './pages/erro/erro'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PaginaInicial></PaginaInicial>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/cadastrar' element={<Cadastrar></Cadastrar>}></Route>
          <Route path='/menu' element={<Menu></Menu>}></Route>
          <Route path='/menu/configuracao' element={<Config></Config>}></Route>
          <Route path='/admin/usuarios' element={<Administrador></Administrador>}></Route>
          <Route path='/admin/administrador' element={<AdminCadastrar></AdminCadastrar>}></Route>
          <Route path='/*' element={<Erro></Erro>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
