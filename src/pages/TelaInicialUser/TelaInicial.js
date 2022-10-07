import styled from "styled-components"

import { useState, useContext, useEffect} from "react"
import axios from "axios"
import Header from "../../components/Header/Header"
import TokenContext from "../../context/tokenContext"

import Palpite from "./Palpite"



export default function TelaInicial() {

  const {token, setToken, setUserLogado, userLogado,permissions,setPermissions} = useContext(TokenContext)

  const [matches, setMatches] = useState([])


  const URL = "http://localhost:5001"

  useEffect(()=>{

      const config ={
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      const promisse = axios.get(`${URL}/matches/groupBy=groups`,config)
      promisse.then(el=>setMatches(el.data))
  },[])

  
  

  return (
    <>
      <Container>

        <AreaPalpites>
          <Header />
          <Titulo>
            <p>Fase de Grupos</p>
          </Titulo>

          {
            matches.map((item,i)=>
            <Palpite 
            key={i} 
            groupName ={item.groupName} 
            roundOne = {item.roundOne}
            roundTwo = {item.roundTwo}
            roundTree = {item.roundTree}
            />)
          }

        </AreaPalpites>

      </Container>
    </>
  )
}

const Container = styled.div`
    width: 100vw;
    background-color: beige;
    min-height: 100vh;
`
const AreaPalpites = styled.div`
    margin: 0 auto;
    max-width: 450px;
    min-height: 100vh;
    background-image: radial-gradient(circle at 111.24% 14.64%, #ffff49 0, #e9d01d 50%, #897300 100%);
`
const Titulo = styled.div`
    padding: 10px;
    p{
      font-size:24px;
      font-family: 'Roboto', sans-serif;
      font-weight: 600;
    }
    
`