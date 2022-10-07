import styled from "styled-components"

import { useState, useContext} from "react"

import Header from "../../components/Header/Header"
import TokenContext from "../../context/tokenContext"

export default function PainelControl() {

  const {token, setToken, setUserLogado, userLogado,permissions,setPermissions} = useContext(TokenContext)

  return (
    <>
      <Container>

        <AreaPalpites>
          <Header />
          <Titulo>
            <p>DashBoard Administrador</p>
          </Titulo>

        </AreaPalpites>

      </Container>
    </>
  )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: red;
    background-image:linear-gradient(55deg, #e0e094, #f5f5dc);
    
`
const AreaPalpites = styled.div`
    margin: 0 auto;
    max-width: 450px;
    height: 100vh;
    
    background-color:#ff963c;
`
const Titulo = styled.div`
    padding: 10px;
    p{
      font-size:24px;
      font-family: 'Roboto', sans-serif;
      font-weight: 600;
    }
    
`
