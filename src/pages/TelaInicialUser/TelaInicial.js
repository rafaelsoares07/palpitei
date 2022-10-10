import styled from "styled-components"

import { useState, useContext, useEffect} from "react"
import axios from "axios"
import Header from "../../components/Header/Header"
import TokenContext from "../../context/tokenContext"

import Palpite from "./Palpite"

import togleBTN from "../../images/icones/togle.png"
import togleClose from "../../images/icones/close.png"

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {Navigate,useNavigate } from "react-router-dom"


import UrlContext from "../../context/urlContext"

import closeLocked from "../../images/icones/fechadura.png"

import TogleMenu from "../../components/MenuTogle/TogleMenu"

export default function TelaInicial() {

  const style = {
  width: '100%',
  bgcolor: 'background.paper'
};


  const [togleBtn, setTogleBtn] = useState(false)
  console.log(togleBtn)

  const navigate = useNavigate()

  const {token, setToken, setUserLogado, userLogado,permissions,setPermissions} = useContext(TokenContext)

  const [matches, setMatches] = useState([])

  const URL = useContext(UrlContext)

  console.log(URL)

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
          <TogleMenu/>

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
    background-color: #aa443f;
`
