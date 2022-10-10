import { useState } from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"


import ProtectRouter from "./Authorization"

import SignIn from "./pages/SignIn/SignIn"
import SignUp from "./pages/Signup/SignUp"
import PainelControl from "./pages/TelaAdmin/PainelControl"
import TelaInicial from "./pages/TelaInicialUser/TelaInicial"
import TelaDay from "./pages/TelaMatchesByDay/TelaDay"
import TelaInserirResultado from "./pages/TelaInserirResultado/TelaInserirResultado"

import TokenContext from "./context/tokenContext"
import UrlContext from "./context/urlContext"

import GlobalStyle from "./styles/global"

function App() {

  console.log(process.env.REACT_APP_MODE)
  const url = process.env.REACT_APP_MODE==="DEV"?"http://localhost:5001":"https://palpitei.herokuapp.com"
  const [URL] = useState(url)

  const [token,setToken] = useState("")
  const [userLogado, setUserLogado] = useState("")
  const [permissions, setPermissions] = useState([])

  return (
  
  <UrlContext.Provider value={URL}>
  <TokenContext.Provider value={{token,setToken,userLogado,setUserLogado,permissions,setPermissions}}>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/cadastro" element={<SignUp/>}/>
        <Route path="/home" element={<TelaInicial/>}/>
        <Route path="/matchesByDay" element={<TelaDay/>}/>   

        


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

    <Route 
      path="/insertResult" 
      element={
        <ProtectRouter 
          path="/" 
          permissions={permissions} 
          permissionRequired={["view_admin_dashboard"]}>
          
          <TelaInserirResultado/>
        </ProtectRouter>}
    />


      </Routes>      

      <GlobalStyle/>
    </BrowserRouter>
  </TokenContext.Provider>
  </UrlContext.Provider>
  )
}

export default App;
