import { useState } from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"

import ProtectRouter from "./Authorization"

import SignIn from "./pages/SignIn/SignIn"
import SignUp from "./pages/Signup/SignUp"
import PainelControl from "./pages/TelaAdmin/PainelControl"
import TelaInicial from "./pages/TelaInicialUser/TelaInicial"

import TokenContext from "./context/tokenContext"


function App() {

  const [token,setToken] = useState("")
  const [userLogado, setUserLogado] = useState("")
  const [permissions, setPermissions] = useState([])

  return (
  <TokenContext.Provider value={{token,setToken,userLogado,setUserLogado,permissions,setPermissions}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/cadastro" element={<SignUp/>}/>
        <Route path="home" element={<TelaInicial/>}/>

        <Route 
        path = "/painel-control" 
        element = {
          <ProtectRouter 
            path="/" 
            permissions={permissions} 
            permissionRequired={["view_admin_dashboard"]}>
            <PainelControl/>
          </ProtectRouter>}
        />

      </Routes>
    </BrowserRouter>
  </TokenContext.Provider>
  )
}

export default App;
